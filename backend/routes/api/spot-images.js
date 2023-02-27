const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const { Spot, SpotImage, Review, ReviewImage, Booking, sequelize, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrorsForSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

// delete a spot image | URL: /api/spot-images/:imageId
// ReqAuthen AND ReqPropAuthor
router.delete('/:imageId',
    requireAuth,
    async (req, res, next) => {
        const { user } = req;

        let spotImage = await SpotImage.findByPk(req.params.imageId, {
            include: [
                { model: Spot }
            ]
        });

        // Couldn't find a Spot Image with the specified id
        if (!spotImage) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        };

        let willDestroyImage = spotImage.toJSON();

        // Spot must belong to the current user | Authorization
        if (willDestroyImage.Spot.ownerId !== user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: "403"
            });
        }

        await spotImage.destroy();

        res.status(200);
        res.json({
            message: "Successfully deleted",
            statusCode: res.statusCode
        })
    });


module.exports = router;
