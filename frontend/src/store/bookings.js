import { csrfFetch } from "./csrf";
import { updateSpot } from "./spots";
// Bookings actions and reducer

// Declare POJO action creator
const LOAD_BOOKINGS_ONE_SPOT = "bookings/LoadBookingsOneSpot"
const CREATE_BOOKING = "bookings/CreateBooking"
const LOAD_USER_BOOKINGS = "bookings/LoadUserBookings"
const UPDATE_BOOKING = "bookings/UpdateBooking"

// Store - action creators | Spots

export const loadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS_ONE_SPOT,
        bookings
    }
}

export const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export const loadUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    }
}

export const UpdateBooking = (booking) => {
    return {
        type: UPDATE_BOOKING,
        booking
    }
}

// Store - Thunk | Spots
// Thunk1: Get all bookings of spot

export const loadBookingsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    // console.log("res => ", res)
    if (res.ok) {
        const data = await res.json()

        await dispatch(loadBookings(data))
        return data
    }
}

// Thunk2: Create booking for a spot
export const createBookingThunk = (bookingDetails, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails)
    })

    // console.log("res => ", res)
    // console.log("res.json => ", await res.json())
    if (res.ok) {
        const createdBooking = await res.json()
    } else {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    }

}

// Thunk3: Load bookings made by user
export const loadUserBookingsThunk = (bookings) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)

    if (res.ok) {
        const data = await res.json()

        await dispatch(loadUserBookings(data))
        return data
    }
}

// Thunk4: Update booking of a spot
export const updateBookingThunk = (bookingDetails, bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails)
    })

    if (res.ok) {
        const updatedBooking = await res.json()
    } else {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
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
                spot: { ...state.spot }
            }
            action.bookings.Bookings.forEach(booking => {
                newState.spot[booking.id] = booking
            })
            return newState;
        }
        case CREATE_BOOKING: {
            const newState = { ...state }
            newState.spot[action.booking.id] = action.booking
            return newState
        }
        case LOAD_USER_BOOKINGS: {
            const newState = { ...state, user: { ...state.user }, spot: { ...state.spot } }
            console.log("newState => ", newState)
            action.bookings.Bookings.forEach(booking => {

                newState.user[booking.id] = booking
            })
            console.log("newState after=> ", newState)
            return newState;
        }
        case UPDATE_BOOKING: {
            const newState = { ...state }
            newState.user[action.booking.id] = { ...action.spot }
            return newState;
        }
        default:
            return state;
    }
}

export default bookingsReducer;
