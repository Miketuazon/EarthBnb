const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const {Spot, SpotImage, Review, sequelize, User, Sequelize } = require('../../db/models');

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

//  3. Get details of a Spot from an id | URL: /api/spots/:spotId
router.get('/:spotId', async (req,res) => {
    const {spotId} = req.params;

    // Error response: if spot is not found
    const findSpot = await Spot.findOne({
        where: {Id: spotId},
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
    })
    res.json(spot);
})

//  2. Get all Spots owned by the Current User
router.get('/current', async (req, res) => {
    const { user } = req;
    const currentUserId = user.toJSON().id
    const spots = await Spot.findAll({
        where: {
            id: currentUserId
        },
        include: [
            {model: Review, attributes: []},
            {model: SpotImage, attributes: [], where: {
                preview: true,
            }},
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



module.exports = router;
