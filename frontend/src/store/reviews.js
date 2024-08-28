import { csrfFetch } from './csrf';
import { createSelector } from 'reselect';

const LOAD_ALL = 'reviews/loadAll';
const ADD_REVIEW = 'reviews/add';

export const loadAll = reviews => {
  return {
    type: LOAD_ALL,
    reviews,
  };
};

export const add = review => {
  return {
    type: ADD_REVIEW,
    review,
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

export const addReview = (id, review) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();

    const sessionRes = await csrfFetch(`/api/session`);

    if (sessionRes.ok) {
      const userData = await sessionRes.json();
      const user = userData.user;
      data.User = user;
    }

    dispatch(add(data));
    return data;
  }

  return res;
};

export const selectReviews = state => state.reviews;
export const selectReviewsArray = createSelector(selectReviews, reviews => {
  return Object.values(reviews);
});

export default function reviewsReducer(state = {}, action) {
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
    case ADD_REVIEW:
      return {
        ...state,
        [action.review.id]: {
          ...action.review,
        },
      };
    default:
      return state;
  }
}
