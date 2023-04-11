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

const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
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
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "review": review.review,
            "stars": review.stars
        })
    })

    if (res.ok) {
        const data = await res.json()
        // console.log('review thunk', review)
        review.User = user
        await dispatch(createReview(data))
        return data
    }
}

// Thunk3. Delete a review
export const eraseReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReview(data));
        return data
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
            const newState = {...state, spot: {...state.spot}};
            action.reviews.Reviews.forEach(review => newState.spot[review.id] = review)
            return newState
        }
        case CREATE_REVIEW: {
            const newState = {...state, spot: {...state.spot}}

            newState.user.userReviews = {}
            newState.user.userReviews[action.review.id] = action.review

            newState.spot[action.review.id] = action.review
            return newState
        }
        case DELETE_REVIEW:
            const newState = { ...state };
            delete newState.reviews[action.review.id];
            delete newState.reviews[action.review]
            delete newState.userReviews[action.review]
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer
