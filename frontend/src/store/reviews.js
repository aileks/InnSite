import { csrfFetch } from './csrf';
import { createSelector } from 'reselect';
import { updateAvgRating } from './inns';

const LOAD_ALL = 'reviews/loadAll';
const ADD_REVIEW = 'reviews/add';
const DELETE = 'reviews/destroy';

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

export const destroy = id => {
  return {
    type: DELETE,
    id,
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

export const addReview = (innId, review) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${innId}/reviews`, {
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

    // Fetch the updated inn data to get the new average rating
    const innRes = await csrfFetch(`/api/spots/${innId}`);
    if (innRes.ok) {
      const updatedInn = await innRes.json();
      dispatch(updateAvgRating(innId, updatedInn.avgStarRating, updatedInn.numReviews));
    }

    return data;
  }

  return res;
};

export const deleteReview = (reviewId, innId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(destroy(reviewId));

    const innRes = await csrfFetch(`/api/spots/${innId}`);
    if (innRes.ok) {
      const updatedInn = await innRes.json();
      dispatch(updateAvgRating(innId, updatedInn.avgStarRating, updatedInn.numReviews));
    }

    return message;
  }

  return res;
};

export const getAvgReview = state => state.inns.avgRating;

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
    case DELETE: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
}
