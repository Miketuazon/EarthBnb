const express = require('express'); //This file will hold the resources for the route paths beginning with /api/spots.
const router = express.Router();
const {Spot, SpotImage, Review, ReviewImage, sequelize, User, Sequelize } = require('../../db/models');
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
      .isInt({min: 1, max: 5})
      .withMessage('Stars must be an integer from 1 to 5'),
      handleValidationErrorsForSpots,
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
    if (allReviews.length) {
      allReviews.forEach(reviewInAllReviews => reviewsObjectArray.push(reviewInAllReviews.toJSON()))
    } else if (!allReviews.length) reviewsObjectArray.push(allReviews);

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
    // parseInt since reviewId came as a decimal?
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
      return res.status(403).json({
        message: "Forbidden",
        statusCode: "403"
    });
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

// Reviews 5 | Edit a Review | URL: /reviews/:reviewId
// requireAuth AND requireProper
router.put('/:reviewId',
  requireAuth,
  validateEditReview,
  async (req, res) => {
    const userId = req.user.id;
    const reviewId = parseInt(req.params.reviewId);
    const {review, stars} = req.body;

    const editTheReview = await Review.findByPk(req.params.reviewId)

    // if review is non-existent like me
    if(!editTheReview) {
      res.status(404).json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
    }

    // require proper authorization for user to access
    if (userId !== editTheReview.userId) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: "403"
      });
    }

    // Passed all checks, now can edit
    const allowedToEditReview = await editTheReview.update({
      review,
      stars
    })
    res.status(200).json(allowedToEditReview);
})

// Reviews 6 | Delete a Review | URL: /api/reviews/:reviewId
// requireAuth AND requireProper
router.delete("/:reviewId",
  requireAuth,
  async (req, res) => {
    const userId = req.user.id;
    const review = await Review.findByPk(req.params.reviewId)

    // if there is no review existing like me
    if (!review) {
      return res.status(404).json({
          "message": "Review couldn't be found",
          "statusCode": 404
      })
    }

    // require proper authorization
    if (userId !== review.userId) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: "403"
      });
    }
  await review.destroy();
  res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200
  })
})
module.exports = router;
