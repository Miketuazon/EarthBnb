import { csrfFetch } from "./csrf";

// Declare POJO action creator
const GET_SPOT_REVIEWS = 'reviews/getSpotReview'

// Store - action creators | Reviews
const getReviewsOfSpots = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    reviews
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
            const newState = {...state, spot: {}}
            for (let review of action.reviews.Reviews) {
                if (newState.spot[review.spotId]) {
                    const prevReviews = Object.values(newState.spot[review.spotId])
                    newState.spot[review.spotId] = [...prevReviews, review]
                } else {
                    // now when update this, make sure to SPREAD out what was previously there
                    newState.spot[review.spotId] = [review]
                }
            }
            return newState
        }
        default:
            return state;
    }
}

export default reviewsReducer
