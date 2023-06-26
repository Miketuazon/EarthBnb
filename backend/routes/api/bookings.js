const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const { Op } = require('sequelize')
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
        const { user } = req;

        // Get all bookings
        const allUserBookings = await Booking.findAll({
            where: {userId: user.id},
            include: {
                model: Spot,
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"],
                include: [{model: SpotImage}]
            }
        })
        // have arr to hold
        const bookingsObjectsArray  = [];
         // iterate thru allBookings
        for (let i = 0; i < allUserBookings.length; i++) {
            const booking = allUserBookings[i];

            bookingsObjectsArray.push(booking.toJSON());
        }
        for (let i = 0; i < bookingsObjectsArray.length; i++) {
            const booking = bookingsObjectsArray[i];
            const previewImage = await SpotImage.findOne({
                where: {
                    spotId: booking.Spot.id,
                    preview: {
                        [Op.is]: true
                    }
                }
            })

            !previewImage
                ? booking.Spot.previewImage = "No Preview Image Yet"
                : booking.Spot.previewImage = previewImage.url;
        }
         // return empty arr if length is nothing
        if (!bookingsObjectsArray.length) {
            return res.status(200).json({
                Bookings: []
            })
        }
         // return now
        res.status(200).json({
            Bookings: bookingsObjectsArray
        });
    }
)

// 4. Edit a booking | URL /api/bookings/:bookingId
//  reqAuth AND reqPropAuthorization
router.put('/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const { user } = req;
        let { startDate, endDate } = req.body;

        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const currentDate = new Date();

        const validationErrors = {};
        const conflictErrors = {};


        const booking = await Booking.findByPk(req.params.bookingId);
        // Error response: Couldn't find a Booking with the specified id
        if (!booking) {
            return res.status(404).json({
                message: "Booking couldn't be found",
                statusCode: 404
            })
        };

        // Require proper authorization: Booking must belong to the current user
        if (booking.userId !== user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            })
        };

        // Error response: Body validation errors
        if (startDate < currentDate) {
            validationErrors.startDate = "startDate cannot be before current date"
        }
        if (endDate <= startDate) {
            validationErrors.endDate = "endDate cannot be on or before startDate"
        }
        if (Object.keys(validationErrors).length) {
            return res.status(400).json({
                message: "Validation error",
                statusCode: 400,
                errors: validationErrors,
            })
        }

        // Error response: Can't edit a booking that's past the end date
        if (booking.endDate < currentDate) {
            const err = new Error("Past bookings can't be modified");
            err.status = 403;
            return next(err);
        }

        // Error response: Booking conflict
        const existingBookings = await Booking.findAll({
            where: { spotId: booking.spotId }
        })

        const flatExistingBookings = [];
        existingBookings.length ? existingBookings.forEach(booking => flatExistingBookings.push(booking.toJSON()))
            : flatExistingBookings.push(existingBookings);

        for (let book of flatExistingBookings) {
            if (!Object.keys(book).length) break;
            // exclude current booking that we are trying to edit
            if (book.id === parseInt(req.params.bookingId)) {
                // console.log('TRYING TO EDIT SAME BOOKING')
                continue;
            }

            if (startDate >= book.startDate && endDate <= book.endDate) {
                conflictErrors.startDate = "Start date conflicts with an existing booking";
                conflictErrors.endDate = "End date conflicts with an existing booking";
            }
            else if (startDate.getTime() === book.startDate.getTime()) {
                conflictErrors.startDate = "Start date conflicts with an existing booking";
            }
            else if (startDate < book.startDate && endDate > book.startDate) {
                conflictErrors.endDate = "End date conflicts with an existing booking";
            }
            else if (startDate > book.startDate && startDate < book.endDate) {
                conflictErrors.startDate = "Start date conflicts with an existing booking";
            }
        }

        if (Object.keys(conflictErrors).length) {
            const err = Error("Sorry, this spot is already booked for the specified dates");
            err.errors = conflictErrors;
            err.status = 403;
            return next(err);
        }

        booking.set({
            startDate, endDate
        })
        await booking.save();
        res.status(200);
        res.json(booking);
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
