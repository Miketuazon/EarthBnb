// Spots actions and reducer
import { csrfFetch } from './csrf';

// Declare POJO action creator
const LOAD_SPOTS = "spots/loadSpots";
const ADD_SPOTS = "spots/addSpots";
const EDIT_SPOTS = "spots/editSpots";
const DELETE_SPOTS = "spots/deleteSpots";
const LOAD_ONE_SPOT = 'spots/oneSpot'

// Store - action creators | Spots
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
})

export const loadOneSpot = (spots) => ({
  type: LOAD_ONE_SPOT,
  spots
})

export const createSpots = (spots) => ({
  type: ADD_SPOTS,
  spots
})

export const updateSpots = (spots) => ({
  type: EDIT_SPOTS,
  spots
})

export const removeSpots = (id) => ({
  type: DELETE_SPOTS,
  id
})

// Store - Thunk | Spots
// Thunk1: Get all spots
export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const data = await res.json();

    dispatch(loadSpots(data));
    return data;
  }
}

// initial State
const initialState = {
  allSpots: {},
  singleSpot: {}
}

// Store - Reducer | Spots
export const getSpots = (state) => {
  return state.spots.allSpots
}
const spotsReducer = (state = initialState, action) => {
  // debugger
  switch (action.type) {
    case LOAD_SPOTS:
      // debugger
      const newState = { ...state };
      // debugger
      action.spots.Spots.forEach(spot => {
        newState.allSpots[spot.id] = spot
      });
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
