const express = require('express'); //This file will hold the resources for the route paths beginning with /api/users.
const router = express.Router();
const {Spot} = require('../../db/models');

// Get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        // include: [
        //     {
        //         model: Spot,
        //     },

        // ]
    })
    console.log(spots)
    const spotObjects = [];
    // fpr
    res.json(spots);
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

module.exports = router;
