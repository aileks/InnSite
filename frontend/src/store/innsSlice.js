import { createSlice, createSelector } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

const innsSlice = createSlice({
  name: 'inns',

  initialState: {},

  reducers: {
    loadAll: (_, action) => {
      const newState = {};

      action.payload.forEach(inn => {
        newState[inn.id] = inn;
      });

      return newState;
    },

    loadOne: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          previewImage: action.payload.SpotImages.find(image => image.preview)?.url,
        },
      };
    },

    addImage: (state, action) => {
      const { innId, image } = action.payload;

      if (state[innId]) {
        state[innId] = {
          ...state[innId],
          images: [...(state[innId].images || []), image],
        };
      }
    },

    create: (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    },

    update: (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    },

    destroy: (state, action) => {
      const { [action.payload]: _, ...rest } = state; // eslint-disable-line no-unused-vars
      return rest;
    },

    updateAvgRating: (state, action) => {
      const { innId, avgRating, numReviews } = action.payload;
      if (state[innId]) {
        state[innId] = { ...state[innId], avgStarRating: avgRating, numReviews };
      }
    },
  },
});

export const { loadAll, loadOne, addImage, create, update, destroy, updateAvgRating } =
  innsSlice.actions;

export const selectInns = state => state.inns;
export const selectInnById = innId => createSelector([selectInns], inns => inns[innId]);
export const selectInnsArray = createSelector([selectInns], inns => Object.values(inns));

export const getAllInns = () => async dispatch => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Spots));
    return data.Spots;
  }

  return res;
};

export const getUserInns = () => async dispatch => {
  const res = await csrfFetch('/api/spots/current');

  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Spots));
    return data.Spots;
  }

  return res;
};

export const getInnById = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadOne(data));
    return data;
  }

  return res;
};

export const createInn = newInn => async dispatch => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newInn),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(create(data));
    return data;
  }

  return res;
};

export const addNewImage = (id, image) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: image.url ? image.url : image,
      preview: image.preview ? true : false,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addImage(data));
    return data;
  }

  return res;
};

export const updateInn = (id, inn) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inn),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(update(data));
    return data;
  }

  return res;
};

export const deleteInn = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });

  if (res.ok) {
    const message = res.json();
    dispatch(destroy(id));
    return message;
  }

  return res;
};

export default innsSlice.reducer;
