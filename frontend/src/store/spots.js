// Spots actions and reducer
import { csrfFetch } from './csrf';

// Declare POJO action creator
const LOAD_SPOTS = "spots/loadSpots";
const CREATE_SPOT = 'spots/createSpot'
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOTS = "spots/deleteSpots";
const LOAD_ONE_SPOT = 'spots/oneSpot'
const LOAD_USER_SPOTS = 'spots/userSpots'

// Store - action creators | Spots
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
})

export const loadOneSpot = (spot) => ({
  type: LOAD_ONE_SPOT,
  spot
})

export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
})

export const loadUserSpots = (spots) => ({
  type: LOAD_USER_SPOTS,
  spots
})

export const editSpot = (spots) => ({
  type: EDIT_SPOT,
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

    await dispatch(loadSpots(data));
    // console.log("await dispatched allSpots => ", data)
    return data;
  }
}

// Thunk2: Get one spot
export const getOneSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  // console.log("res of getOneSpot", res);
  // debugger
  if (res.ok) {
    const data = await res.json();

    await dispatch(loadOneSpot(data));
    // console.log("await dispatched oneSpot", data)
    return data;
  }
}

// Thunk3: Create new spot (in progress)
export const createNewSpot = (detailsOfNewSpot, spotImages) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(detailsOfNewSpot)
  })
  if (res.ok) {
    const createdSpot = await res.json();
    debugger
    await dispatch(createSpot(createdSpot));
    for (let image of spotImages) {
      console.log("should be image", image)
      await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
      });
    }
    return createdSpot
  }
}

// Thunk4: Get user spots
export const getUserSpots = () => async dispatch => {
  const res = await csrfFetch("/api/spots/current");

  const data = await res.json();
  await dispatch(loadUserSpots(data))
  return data
}

// initial State
const initialState = {
  allSpots: {},
  singleSpot: {
    SpotImages: [],
    Owner: {}
  }
}

// Store - Reducer | Spots
const spotsReducer = (state = initialState, action) => {
  // debugger
  console.log("inside spotsReducer")
  switch (action.type) {
    case LOAD_SPOTS: {
      // debugger
      const newState = {
        ...state,
        allSpots: {...state.allSpots},
        singleSpot: {...state.singleSpot}
      };
      // debugger
      action.spots.Spots.forEach(spot => {
        newState.allSpots[spot.id] = spot
      });
      return newState;
    }
    case LOAD_ONE_SPOT: {
      const newState = {...state};
      newState.singleSpot = {...action.spot}
      return newState;
    }
    case CREATE_SPOT: {
      const newState = {...state,
        allSpots: {...state.allSpots},
        singleSpot: {...state.singleSpot}
      };
      debugger
      newState.allSpots[action.spot.id] = action.spot
      return newState;
    }
    case LOAD_USER_SPOTS: {
      const newState = {
        ...state,
        allSpots: {...state.allSpots},
      }
      return newState
    }
    default:
      return state;
  }
};

export default spotsReducer;
