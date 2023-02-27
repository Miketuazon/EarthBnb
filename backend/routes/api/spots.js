const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const {Spot, SpotImage, Review, sequelize, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrorsForSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

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
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .isNumeric({checkFalsy: true}, {min: 1})
      .withMessage('Price per day is required'),
      handleValidationErrorsForSpots
  ];
//  1. Get all spots
router.get('/', async (req, res) => {
    // look for all spots
    const spots = await Spot.findAll({
        include: [
            {model: SpotImage}
        ]
    })
    // create spotObjects array to hold spots
    const spotObjects = [];
    // iterate through spots and push them to array
    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        spotObjects.push(spot.toJSON())
    }
    // iterate through spotObjects array
    for (let i = 0; i < spotObjects.length; i++) {
        const spot = spotObjects[i];
        // if there is a SpotImage
        if (spot.SpotImages.length > 0) {
            // loop thru SpotImages to find which image is preview
            for (let j = 0; j < spot.SpotImages.length; j++) {
                const image = spot.SpotImages[j];
                if (image.preview === true) {
                    spot.previewImage = image.url;
                }
            }
        } else {
            spot.SpotImages = "No image for this spot"
        }
        delete spot.SpotImages

        // find avgRating
        let reviewData = await Review.findOne({
            where: {
                // spotId matches spot.id
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ],

        })
        let reviewAvg = reviewData.toJSON().avgRating;
        if (reviewAvg) {
            spot.avgRating = reviewAvg;
        } else {
            spot.avgRating = 'No review yet'
        }
    }
    res.json({Spots: spotObjects});
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
            {model: Review, attributes: []},
            {model: SpotImage, attributes: []/*, where: {
                preview: true,
            }*/},
        ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                [sequelize.col('SpotImages.url'), 'previewImage']
            ],
        },
        group: ["Spot.id",'SpotImages.url']
    })
    let payload = {Spots: spots};
    res.json(payload);
})

//  3. Get details of a Spot from an id | URL: /api/spots/:spotId
router.get('/:spotId', async (req,res) => {
    const {spotId} = req.params;

     // Error response: if spot is not found
     const findSpot = await Spot.findOne({
        where: {id: spotId},
    })
    if (!findSpot) return res.status(404).json({
        message: "Spot couldn't be found"
    })

    const spot = await Spot.findOne({
        where: {
            id: spotId,
        },
        include: [
            {model: Review, attributes: []},
            {model: SpotImage, attributes: ['id', 'url', 'preview']},
            {model: User, attributes: ['id','firstName','lastName',], as: 'Owner'}
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
        const {user} = req;
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
        const {spotId} = req.params;
        // console.log("this is the spotId", spotId) // 4 in this case

        const {user} = req;
        // console.log(user.toJSON()) // user info

        const currentUserId = (user.toJSON().id)
        // console.log("this is the currentUserId", currentUserId) // 1 in this case

     // Error response: if spot is not found
     const findSpot = await Spot.findOne({
        where: {id: spotId},
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

    const {url, preview} = req.body;
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
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
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
    const {user} = req;
    // console.log("user id here", user.id)

    //get spot and find by pKey
        const deleteTheSpot = await Spot.findByPk(req.params.spotId)
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

module.exports = router;
