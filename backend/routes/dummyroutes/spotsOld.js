// const express = require('express'); //This file will hold the resources for the route paths beginning with /api/users.
// const router = express.Router();
// const {Spot, SpotImage, Review, sequelize } = require('../../db/models');
/*
// Get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
    })
    console.log(spots)
    const spotObjects = [];
    // iterating through Spot table to convert to POJOs
    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        spotObjects.push(spot.toJSON());
    }
    // iterating through spotObjects array
    for (let i = 0; i < spotObjects.length; i++) {
        const spot = spotObjects[i];
        if (spot.SpotImages.length > 0) {
            // console.log(spot.SpotImages) check to see if there is a SpotImage
            for (let j = 0; j < spot.SpotImages.length; j++) {
                const previewImage = spot.SpotImages[i];
                //if there is a url and it has preview as true
                console.log(previewImage.url)
                console.log(previewImage.preview)
                console.log(spot.previewImage)
                if (previewImage.url.length > 0 && previewImage.preview === true) {
                    // create new Key-Val pair of previewImage with url of image
                    spot.previewImage = previewImage.url;
                }
            }
            if (!spot.SpotImages) {
                spot.SpotImages = "No url for the previewImage"
            }
        } else {
            spot.SpotImages = "No url for the previewImage"
        }
        delete spot.SpotImages

        //find avgRating | Lazy loading
        let reviewData = await Review.findOne({
            where: {
                stars: spot.id,
            },
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            }
        })
        // console.log(reviewData.toJSON())
        let reviewAvg = reviewData.toJSON().avgRating
        if (reviewAvg) {
            spot.avgRating = reviewData.toJSON().avgRating
        } else {
            spot.avgRating = "No review yet :("
        }
    }

    // console.log(spotObjects)
    res.json(spotObjects);
})
// router.get('', async (req, res) => {
//     let spots = await Spot.findAll()
//     for (let i = 0; i < spots.length; i++) {
//         rating = await Review.findAll({
//             where: {
//                 spotId: spots[i].id
//             },
//             attributes: [
//                 [sequelize.fn('AVG', sequelize.col('stars'))]
//             ]
//         })
//         spots[i].avgRating = rating;
//     }
//     let payload = {spots: spots}
//     res.json(payload);
// })
 // console.log("this is spots", spots)

    // iterating through Spot table to convert to POJOs
    /*for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        spotObjects.push(spot.toJSON());

        let reviewData = await Review.findOne({
            where: {
                spotId: spot.id,
            },
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            }
        })
        console.log("review Data here", reviewData.toJSON());
    }
    console.log(spotObjects)
    */





    // console.log(spotObjects)
    //find avgRating | Lazy loading
    // console.log('review Data below')
    // console.log(reviewData.toJSON())
    // let reviewAvg = reviewData.toJSON().avgRating
    // if (reviewAvg) {
    //     Spot.avgRating = reviewData.toJSON().avgRating
    // } else {
    //     Spot.avgRating = "No review yet :("
    // }

// module.exports = router;

/* OLD ROUTE HANDLER for get all spots.
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
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
        group: ['Spot.id']
    })
    res.json(spots);
})
*/

/* Old get spots following vid 8:18
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ]
    })
    console.log(spots)
    const spotObjects = [];
    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        spotObjects.push(spot.toJSON())
    }

    for (let i = 0; i < spotObjects.length; i++) {
        const spot = spotObjects[i];
        if (spot.SpotImage.length > 0) {

        } else {
            spot.SpotImage = ""
        }
    }
    res.json(spots);
})

*/
