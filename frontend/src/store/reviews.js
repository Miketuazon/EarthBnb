import { csrfFetch } from "./csrf";

// Declare POJO action creator
const GET_SPOT_REVIEWS = 'reviews/getSpotReview'
const CREATE_REVIEW = 'reviews/createReview'
const DELETE_REVIEW = 'reviews/deleteReview'

// Store - action creators | Reviews
const getReviewsOfSpots = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    reviews
})

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

// Store - Thunk | Reviews
//Thunk1. Get all reviews OF spot
export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getReviewsOfSpots(data))
    }
}

// Thunk2. Create new review OF spot
export const createNewReview = (review, user, spotId) => async (dispatch) => {
    // console.log("created review => ", review)
    // console.log("created review spotId => ", spotId)
    // console.log("created review user =>", user)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const createdReview = await res.json()
        createdReview.User = user;
        // console.log("created review response", createdReview)
        await dispatch(createReview(createdReview))
        return createdReview;
    }
}

// Thunk3. Delete a review
export const eraseReview = (reviewId) => async dispatch => {
    // console.log("reviewId", reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const data = await response.json();
        // console.log("data => ", data)
        dispatch(deleteReview(reviewId));
        return response
    }
}

// Initial state
const initialState = {
    spot: {},
    user: {},
    // bookings later
}

// Reviews reducer

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const newState = { ...state, spot: { ...state.spot } };
            // console.log("action GET_SPOT_REVIEWS =>", action)
            action.reviews.Reviews.map(review => newState.spot[review.id] = review)
            return newState
        }
        case CREATE_REVIEW: {
            const newState = {
                ...state,
                spot: { ...state.spot },
                user: { ...state.user },
            }
            // console.log("action CREATE REVIEW =>", action)
            // console.log("state CREATE REVIEW => ", newState)
            // newState.user.userReviews = {}
            // newState.user.userReviews[action.review.id] = action.review
            // newState.user.userReviews = {}
            // newState.user.userReviews[action.review.id] = action.review
            newState.spot[action.review.id] = action.review
            // console.log("state after CREATE REVIEW => ", newState)

            return newState
        }
        case DELETE_REVIEW:
            const newState = {
                ...state,
                spot: { ...state.spot },
                user: { ...state.user },
            };
            // console.log("newState del review => ", newState)
            // console.log("action del REVIEW =>", action)
            // if (newState.reviews[action.reviewId]) delete newState.reviews[action.reviewId];
            delete newState.spot[action.reviewId]
            // delete newState.userReviews[action.review]
            // console.log("newState del after review => ", newState)
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer
