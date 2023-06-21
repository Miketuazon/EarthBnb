import { csrfFetch } from "./csrf";
// Bookings actions and reducer

// Declare POJO action creator
const LOAD_BOOKINGS_ONE_SPOT = "bookings/LoadBookingsOneSpot"


// Store - action creators | Spots

export const loadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS_ONE_SPOT,
        bookings
    }
}

// Store - Thunk | Spots
// Thunk1: Get all bookings of spot

export const loadBookingsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (res.ok) {
        const data = await res.json()

        await dispatch(loadBookings(data))
        return data
    }
}

const initialState = {
    user: {},
    spot: {}
}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKINGS_ONE_SPOT: {
            const newState = {
                ...state,
                spot: {...state.spot}
            }
            debugger
            action.bookings.Bookings.map(booking => {
                newState.spot[booking.id] = booking
            })
            return newState;
        }
        default:
            return state;
    }
}

export default bookingsReducer;
