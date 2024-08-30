import { createSlice } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

const sessionSlice = createSlice({
  name: 'session',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = sessionSlice.actions;

export const login = user => async dispatch => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data.user));
  }

  return res;
};

export const logout = () => async dispatch => {
  const res = await csrfFetch('/api/session', { method: 'DELETE' });
  if (res.ok) dispatch(removeUser());
  return res;
};

export const signup = user => async dispatch => {
  const { username, firstName, lastName, email, password } = user;
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, firstName, lastName, email, password }),
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

export default sessionSlice.reducer;
