const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const {Spot, SpotImage, Review, ReviewImage, sequelize, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrorsForSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const e = require('express');
const review = require('../../db/models/review');

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
    const currentUserId = user.toJSON().id;
    const allReviews = await Review.findAll({
      where: {
        userId: currentUserId
      },
      include: [
        {model: User, attributes: ['id', 'firstName', 'lastName']},
        {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'], include: [{model: SpotImage}]},
        {model: ReviewImage, attributes: ['id','url']},
      ],
    });

    const reviewsObjectArray = [];
    allReviews.length ?
    allReviews.forEach(reviewInAllReviews => reviewsObjectArray.push(reviewInAllReviews.toJSON())):
    reviewsObjectArray.push(allReviews);

    for(let review of reviewsObjectArray) {
      if (Object.keys(review).length === 0) break;
      // console.log(review.Spot.SpotImages)
      if (review.Spot.SpotImages.length !== 0) {
        const isPreviewTrue = review.Spot.SpotImages.filter(image => image.preview === true);
        if (isPreviewTrue.length !== 0) {
          review.Spot.previewImage = isPreviewTrue[0].url
        } else review.Spot.previewImage = "No Preview Image Available";
        }
        else {
          review.Spot.previewImage = "No Preview Image Available";
        }
        delete review.Spot.SpotImages;
      }
    let payload = {Reviews: reviewsObjectArray};
    res.status(200).json(payload)
})

// Reviews 4 | Add an Image to a Review based on the Review's id
// Require auth AND Require proper author | URL: reviews/:reviewId/images
router.post('/:reviewId/images',
  requireAuth,
  async (req, res) => {
    const userId = Number(req.user.id)
    console.log(userId)
    // used parseInt because it might have been coming up as a decimal?
    const reviewId = parseInt(req.params.reviewId, 10)
    console.log(reviewId)
    const { url } = req.body
    const review = await Review.findByPk(reviewId)
    const thereIsAReview = await Review.findByPk(reviewId, {
      include: [{model: ReviewImage}]
    });

    // If there is NOT a review
    if (!thereIsAReview) {
      res.status(404).json({
        message: "Review couldn't be found",
        "statusCode": 404
      })
    }

    // Require proper author check
    if (userId !== review.userId) {
      res.status(404).json({
        message: "Forbidden",
        statusCode: 403
      })
    }

    // Passed both tests, now can create
    const addImageToReview = await ReviewImage.create({
      reviewId,
      url
    })

    // If newly created reaches 10 (limit)
    const allImagesOfReview = await ReviewImage.findAll({
      where: {reviewId}
    });
    // console.log(allImagesOfReview)
    if (allImagesOfReview.length >= 10) {
      res.status(403).json({
        "message": "Maximum number of images for this resource was reached",
        "statusCode": 403
      })
      return;
    }
    res.json({
      id: addImageToReview.id,
      url: addImageToReview.url
    })
})

module.exports = router;
