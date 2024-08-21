import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = user => async dispatch => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data.user));
  }

  return res;
};

export const logout = () => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeUser());
  }

  return res;
};

export const signup = user => async dispatch => {
  const { username, firstName, lastName, email, password } = user;
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data.user));
  }

  return res;
};

export const restoreUser = () => async dispatch => {
  const res = await csrfFetch('/api/session');

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data.user));
  }

  return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
