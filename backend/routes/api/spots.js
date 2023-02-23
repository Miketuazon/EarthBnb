const express = require('express'); //This file will hold the resources for the route paths beginning with /api/users.
const router = express.Router();
const {Spot, SpotImage, Review, sequelize, Sequelize } = require('../../db/models');

// Get all spots
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



module.exports = router;
