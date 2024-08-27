import { csrfFetch } from './csrf';
import { createSelector } from 'reselect';

const LOAD_ALL = 'reviews/loadAll';

export const loadAll = reviews => {
  return {
    type: LOAD_ALL,
    reviews,
  };
};

export const getAllReviews = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Reviews));

    return data;
  }

  return res;
};

export const selectReviews = state => state.reviews;
export const selectReviewsArray = createSelector(selectReviews, reviews => {
  return Object.values(reviews);
});

const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL: {
      const newState = {};

      action.reviews.forEach(review => {
        newState[review.id] = review;
      });

      return {
        ...newState,
      };
    }
    default:
      return state;
  }
}
