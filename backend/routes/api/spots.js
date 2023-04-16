const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const { Spot, SpotImage, Review, ReviewImage, Booking, sequelize, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrorsForSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { query } = require('express');
const { Op, DATE } = require('sequelize');

// validateSpotSignup
const validateSpotSignup = [
    check('address').exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    // check('lat')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Latitude is not valid'),
    // check('lng')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isNumeric({ checkFalsy: true }, { min: 1 })
        .withMessage('Price per day is required'),
    handleValidationErrorsForSpots
];

//BodyValidationBooks
const validateBodyBookings = [
    check('startDate')
        .exists({ checkFalsy: true }),
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((value, { req }) => {
            if (value <= req.body.startDate) {
                throw new Error('endDate cannot be on or before startDate');
            }
            return true
        }),
    handleValidationErrorsForSpots
]
//  1. Get all spots
router.get('/',
    async (req,res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if (!page) page = 1;
    if (!size) size = 20;

    if (parseInt(page) > 10) page = 10;
    if (parseInt(size) > 20) size = 20;

    if (parseInt(page) && parseInt(size)) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    const where = {};
    if (req.query.minLat && req.query.maxLat) {
        where.lat = { [Op.gte]: Number(minLat), [Op.lte]: Number(maxLat) }
    }
    else if (req.query.minLat) {
        where.lat = { [Op.gte]: Number(minLat) }
    }
    else if (req.query.maxLat) {
        where.lat = { [Op.lte]: Number(maxLat) }
    }

    if(req.query.minLng && req.query.maxLng) {
        where.lng = { [Op.gte]: Number(minLng), [Op.lte]: Number(maxLng) }
    }
    else if (req.query.minLng) {
        where.lng = { [Op.gte]: Number(minLng) }
    }
    else if (req.query.maxLng) {
        where.lng = { [Op.lte]: Number(maxLng) }
    }

    if (req.query.minPrice && req.query.maxPrice) {
        where.price = { [Op.gte]: Number(minPrice), [Op.lte]: Number(maxPrice) }
    }
    else if (req.query.minPrice) {
        where.price = { [Op.gte]: Number(minPrice) }
    }
    else if (req.query.maxPrice) {
        where.price = { [Op.lte]: Number(maxPrice) }
    }
    const spots = await Spot.findAll({
        where,
        include: [
            {
            model: SpotImage,
            attributes: ['url', 'preview']
            }
        ],
        limit: query.limit,
        offset: query.offset
    });


    const spotObjects = [];
    spots.length ?
    spots.forEach(spot => spotObjects.push(spot.toJSON()))
    : spotObjects.push(spots);


    for(let spot of spotObjects) {
        if (!Object.keys(spot).length) break;
        const review = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })
        if (review) {
            spot.avgRating = Number(review.toJSON().avgRating).toFixed(1);
        }
        else spot.avgRating = "No Reviews exist for this spot";

        if (spot.SpotImages.length) {
            const filterTrue = spot.SpotImages.filter(image => image.preview === true);
            filterTrue.length ? spot.previewImage = filterTrue[0].url : spot.previewImage = "No Preview Image Available";
        }
        else {
            spot.previewImage = "No Preview Image Available";
        }
        delete spot.SpotImages;
    };
   res.status(200);
    res.json({
        Spots: spotObjects,
        page: page,
        size: size });
})
//  2. Get all Spots owned by the Current User
router.get('/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const currentUserId = user.toJSON().id
        const spots = await Spot.findAll({
            where: {
                ownerId: currentUserId
            },
            include: [
                { model: Review, attributes: [] },
                {
                    model: SpotImage, attributes: []/*, where: {
                preview: true,
            }*/},
            ],
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                    [sequelize.col('SpotImages.url'), 'previewImage']
                ],
            },
            group: ["Spot.id", 'SpotImages.url']
        })
        let payload = { Spots: spots };
        res.json(payload);
    })

//  3. Get details of a Spot from an id | URL: /api/spots/:spotId
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;

    // Error response: if spot is not found
    const findSpot = await Spot.findOne({
        where: { id: spotId },
    })
    if (!findSpot) return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    })

    const spot = await Spot.findOne({
        where: {
            id: spotId,
        },
        include: [
            { model: Review, attributes: [] },
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User, attributes: ['id', 'firstName', 'lastName',], as: 'Owner' }
        ],
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('Reviews.stars')), 'numReviews'],
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
            ]
        },
        group: ['Spot.id', 'SpotImages.id', 'Owner.id']
    })
    res.json(spot);
})

// 6. Edit a Spot | URL: /api/spots/:spotId | reqAuth and reqPropAuthorization
router.put('/:spotId',
    requireAuth,
    validateSpotSignup,
    async (req, res) => {

        // Get Current User
        const { user } = req;
        // console.log("user id here", user.id)

        //get spot and find by pKey
        const editTheSpot = await Spot.findByPk(req.params.spotId)
        // console.log(editTheSpot)
        // Error response: if spot is not found
        if (!editTheSpot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        // Error response: requestProperAuthorization
        if (editTheSpot.ownerId !== user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            })
        }

        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        editTheSpot.set({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        })

        await editTheSpot.save();

        res.status(200).json(editTheSpot)
    })

// 5. Add an Image to a Spot based on the Spot's id | URL: /api/spots/:spotId/images

router.post('/:spotId/images',
    requireAuth,
    async (req, res) => {
        const { spotId } = req.params;
        // console.log("this is the spotId", spotId) // 4 in this case

        const { user } = req;
        // console.log(user.toJSON()) // user info

        const currentUserId = (user.toJSON().id)
        // console.log("this is the currentUserId", currentUserId) // 1 in this case

        // Error response: if spot is not found
        const findSpot = await Spot.findOne({
            where: { id: spotId },
        })
        if (!findSpot) return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })

        const spot = await Spot.findByPk(req.params.spotId)
        const spotOwnerId = (spot.toJSON().ownerId)
        // REQUIRE proper authorization. If spotOwnerId is not currentUserId
        if (spotOwnerId !== currentUserId) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: "403"
            });
        };

        const { url, preview } = req.body;
        const createdSpotImage = await SpotImage.create({
            spotId,
            url,
            preview,
        })
        let newSpotImage = createdSpotImage.toJSON()
        // delete not needed data in res
        delete newSpotImage.spotId
        delete newSpotImage.updatedAt
        delete newSpotImage.createdAt
        res.status(200).json(newSpotImage)
    })

// 4. Create a Spot | /api/spots

router.post('/',
    requireAuth,
    validateSpotSignup,
    async (req, res) => {
        const { user } = req;
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const newSpot = await Spot.create({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            ownerId: user.id,
        })

        res.status(201).json(newSpot);
    })

// 7. Delete a Spot | URL: /api/spots/:spotId
router.delete('/:spotId',
    requireAuth,
    async (req, res) => {
        // Get Current User
        const { user } = req;
        // console.log("user id here", user.id)

        //get spot and find by pKey
        const deleteTheSpot = await Spot.findOne({
            where: { id: req.params.spotId }
        })
        // console.log(editTheSpot)
        // Error response: if spot is not found
        if (!deleteTheSpot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        // Error response: requestProperAuthorization
        if (deleteTheSpot.ownerId !== user.id) {
            res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            })
        }

        await deleteTheSpot.destroy();
        res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    })


// Reviews 2: Get all Reviews by a Spot's id | URL: /api/spots/:spotId/reviews
router.get('/:spotId/reviews',
    async (req, res) => {
        // const userId = req.user.id;
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }

        const allReviewsBySpot = await Review.findAll({
            where: { spotId },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] },
                { model: ReviewImage, attributes: ['id', 'url'] },
            ]
        })
        res.status(200).json({ Reviews: allReviewsBySpot })
    })

// Reviews 3: Create a Review for a Spot based on the Spot's id |
// URL: /:spotId/reviews | requireAuth
router.post('/:spotId/reviews',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(req.params.spotId);
        // If there is no spot
        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
        }
        // if there is a review already
        const thereIsAReview = await Review.findOne({
            where: {
                spotId: spotId,
                userId: userId
            }
        })
        if (thereIsAReview) {
            res.status(403).json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        }
        // Passed both checks, can create now
        const { review, stars } = req.body
        const createReviewForSpotById = await Review.create({
            userId,
            spotId,
            review,
            stars
        })
        res.status(201).json(createReviewForSpotById);

    })

// 2. Bookings |  Get all Bookings for a Spot based on the Spot's id
// URL: /api/spots/:spotId/bookings | reqAuth

router.get('/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(req.params.spotId);

        // If spot is not there
        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
        }

        // check if we are owner
        if (req.user.id === spot.ownerId) {
            const bookings = await Booking.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    }
                ],
                where: {
                    spotId: req.params.spotId
                }
            })
            let payload = { Booking: bookings }
            return res.status(200).json(payload)
            // if we are not owner, only show specifics
        } else {
            const bookings = await Booking.findAll({
                where: {
                    spotId: spotId
                },
                attributes: ['spotId', 'startDate', 'endDate']
            })

            const payload = { Bookings: bookings }
            return res.status(200).json(payload)
        }
    })

// 3. Bookings | Create a Booking from a Spot based on the Spot's id
// auth and NOT BELONG !properAuth
router.post('/:spotId/bookings',
    requireAuth,
    validateBodyBookings,
    async (req, res, next) => {
        const { startDate, endDate } = req.body;
        const { user } = req;
        const start = Date.parse(startDate);
        const end = Date.parse(endDate);
        const date = new Date();
        const currentDate = Date.parse(date);
        const booking = await Booking.findByPk(req.params.bookingId);
        const spot = await Spot.findByPk(req.params.spotId, {
            include: [{ model: Booking }]
        });
        // Cannot find a Spot with the specified id
        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            });;
        }

        // Require PROPER AUTH
        if (spot.ownerId === user.dataValues.id) {
            return res.status(403).json({
                message: "Forbidden, you cannot book a spot you own",
                statusCode: "403"
            });
        }

        //Booking conflict
        const spotObject = spot.toJSON();

        for (let spot of spotObject.Bookings) {
            const bookingStartDate = Date.parse(spot.startDate);
            const bookingEndDate = Date.parse(spot.endDate);
            //  Can't edit a booking that's past the end date
            if (endDate < currentDate) {
                res.status(403).json({
                    message: "Past bookings can't be modified",
                    statusCode: 403
                })
            }
            if (((start < bookingEndDate && start > bookingStartDate) || start === bookingStartDate || start === bookingEndDate)
                ||
                ((end < bookingEndDate && end > bookingStartDate) || end === bookingEndDate || end === bookingStartDate)) {
                res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    statusCode: 403,
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                });
            }
        }
        const newBooking = await Booking.create({
            userId: user.dataValues.id,
            spotId: req.params.spotId,
            startDate,
            endDate
        })
        res.json(newBooking)
    })
module.exports = router;
