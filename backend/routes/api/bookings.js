const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const { Spot, SpotImage, Review, ReviewImage, Booking, sequelize, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrorsForSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

// validateEditReview
const validateEditReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        // .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrorsForSpots,
];
//  1. Bookings | Get all of the Current User's Bookings
// URL: /api/bookings/current | reqAuth!
router.get('/current',
    requireAuth,
    async (req, res) => {
        const currentUserId = req.user.id
        // Get all bookings
        const allBookings = await Booking.findAll({
            where: {
                userId: currentUserId
            },
            include: [
                {
                    model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                    include: { model: SpotImage }
                },
            ],
            exclude: [
                { model: Booking, attributes: [] }
            ]
        });
        // console.log(allBookings)
        // have arr to hold
        const bookingsObjectsArray = [];
        // iterate thru allBookings
        if (allBookings.length) allBookings.forEach(book => bookingsObjectsArray.push(book.toJSON()))
        else bookingsObjectsArray.push(allBookings);

        for (let book of bookingsObjectsArray) {
            if (book.Spot.SpotImages.length) {
                const isPreviewTrue = book.Spot.SpotImages.filter(image => image.preview === true);
                if (isPreviewTrue.length) book.Spot.previewImage = isPreviewTrue[0].url
                else book.Spot.previewImage = "No Preview Image Available";
            } else book.Spot.previewImage = "No Preview Image Available";
            delete book.Spot.SpotImages;
        }
        // return now
        res.status(200).json({
            Bookings: bookingsObjectsArray
        })
    })

// 4. Booking | Delete a Booking | URL: /api/bookings/:bookingId
// reqAuth AND req proper authorization
router.delete("/:bookingId",
  requireAuth,
  async (req, res) => {
    const userId = req.user.id;
    const booking = await Booking.findByPk(req.params.bookingId)

    // if there is no Booking existing like me
    if (!booking) {
      return res.status(404).json({
        "message": "Booking couldn't be found",
        "statusCode": 404
      })
    }

    // require proper authorization
    if (userId !== booking.userId) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: "403"
      });
    }

    if (booking.startDate <= new Date()) {
        return res.status(403).json(
            {
                message: "Bookings that have been started can't be deleted",
                statusCode: 403
            })
    }
    await booking.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200
    })
  })
module.exports = router;
