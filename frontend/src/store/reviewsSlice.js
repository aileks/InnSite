import { createSlice, createSelector } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';
import { updateAvgRating } from './innsSlice';

const reviewsSlice = createSlice({
  name: 'reviews',

  initialState: {},

  reducers: {
    loadAll: (_, action) => {
      const newState = {};
      action.payload.forEach(review => {
        newState[review.id] = review;
      });
      return { ...newState };
    },

    add: (state, action) => {
      state[action.payload.id] = action.payload;
    },

    destroy: (state, action) => {
      const { [action.payload]: _, ...rest } = state; // eslint-disable-line no-unused-vars
      return rest;
    },
  },
});

export const { loadAll, add, destroy } = reviewsSlice.actions;

export const getAvgReview = state => state.inns.avgRating;

export const selectReviews = state => state.reviews;
export const selectReviewsArray = createSelector(selectReviews, reviews => {
  return Object.values(reviews);
});

export const getAllReviews = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Reviews));
    return data.Reviews;
  }

  return res;
};

export const addReview = (innId, review) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${innId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();
    const sessionRes = await csrfFetch('/api/session');

    if (sessionRes.ok) {
      const userData = await sessionRes.json();
      data.User = userData.user;
    }

    dispatch(add(data));

    const innRes = await csrfFetch(`/api/spots/${innId}`);

    if (innRes.ok) {
      const updatedInn = await innRes.json();

      dispatch(
        updateAvgRating({
          innId,
          avgRating: updatedInn.avgStarRating,
          numReviews: updatedInn.numReviews,
        }),
      );
    }

    return data;
  }

  return res;
};

export const deleteReview = (reviewId, innId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });

  if (res.ok) {
    const message = await res.json();
    dispatch(destroy(reviewId));

    const innRes = await csrfFetch(`/api/spots/${innId}`);
    if (innRes.ok) {
      const updatedInn = await innRes.json();

      dispatch(
        updateAvgRating({
          innId,
          avgRating: updatedInn.avgStarRating,
          numReviews: updatedInn.numReviews,
        }),
      );
    }

    return message;
  }

  return res;
};

export default reviewsSlice.reducer;
