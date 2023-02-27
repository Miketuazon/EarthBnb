const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const { Spot, SpotImage, Review, ReviewImage, Booking, sequelize, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrorsForSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

// delete a review image | URL: /api/review-images/:imageId
// ReqAuthen AND ReqPropAuthor
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;

    let mustDestroyReviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: [
            { model: Review }
        ]
    });

    // Error response: Couldn't find a Review Image with the specified id
    if (!mustDestroyReviewImage) {
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
        // const err = new Error("Review Image couldn't be found");
        // err.status = 404;
        // return next(err);
    };

    let willBeDestroyed = mustDestroyReviewImage.toJSON();

    // Review must belong to the current user
    if (willBeDestroyed.Review.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    await mustDestroyReviewImage.destroy();

    res.status(200).json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
});


module.exports = router;
