const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const {Spot, SpotImage, Review, ReviewImage, sequelize, User, Sequelize } = require('../../db/models');
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
//  1. Get all Reviews of the Current User | URL:/api/reviews/current | reqAuth
router.get('/current',
    requireAuth,
    async (req, res) => {
    const {user} = req;
    const currentUserId = user.toJSON().id
    const currentReviews = Review.findAll({
        where: {
            userId: currentUserId
        },
        include:  [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state',
            'country', 'lat', 'lng', 'name', 'price'],
            include: [{model: SpotImage}]},
            {model: ReviewImage, attributes: ['id', 'url'] },
        ],
    })
    // create reviewObjectsArray to hold spots
    const reviewObjectsArray = [];
    // iterate through reviews and push them to array
    // console.log(currentReviews.toJSON())
    if (currentReviews.length > 0) {
        currentReviews.forEach(review => reviewObjectsArray.push(review.toJSON()));
        reviewObjectsArray.push(currentReviews);
    }
    // console.log(currentReviews);
    // console.log(reviewObjectsArray);

    for (let review of reviewObjectsArray) {
        const spotPreviewImages = review.Spot.SpotImages;
        console.log(spotPreviewImages)
    }

    res.status(200).json({Reviews: currentReviews});
})

module.exports = router;
