// Phase1: Session actions and reducer

import { csrfFetch } from './csrf';

// P1b. Create two POJO action creators. 1 to set user in session slice of state
// 1 to remove the session user
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
// action creator
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// Create and export login thunk action
export const login = (user) => async (dispatch) => {
  const { credential, password, firstName, lastName } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
      firstName,
      lastName,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

// P1. Restore session user thunk
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// P1a. Create sessionReducer to hold current session user's information.
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
