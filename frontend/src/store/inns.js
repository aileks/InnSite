import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

const LOAD_ALL = "inns/loadAll";
const LOAD_ONE = "inns/loadOne";
const CREATE = "inns/create";
const ADD_IMAGE = "images/addImage";
const UPDATE = "inns/update";
const DELETE = "inns/destroy";
const UPDATE_AVG_RATING = "inns/updateAvgRating";

export const loadAll = (inns) => {
  return {
    type: LOAD_ALL,
    inns,
  };
};

export const loadOne = (inn) => {
  return {
    type: LOAD_ONE,
    inn,
  };
};

export const create = (newInn) => {
  return {
    type: CREATE,
    newInn,
  };
};

export const addImage = (image) => {
  return {
    type: ADD_IMAGE,
    image,
  };
};

export const update = (inn) => {
  return {
    type: UPDATE,
    inn,
  };
};

export const destroy = (id) => {
  return {
    type: DELETE,
    id,
  };
};

export const updateAvgRating = (innId, avgRating, numReviews) => {
  return {
    type: UPDATE_AVG_RATING,
    innId,
    avgRating,
    numReviews,
  };
};

export const getAllInns = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Spots));

    return data;
  }

  return res;
};

export const getUserInns = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Spots));

    return data;
  }

  return res;
};

export const getInnById = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadOne(data));
    return data;
  }

  return res;
};

export const createInn = (newInn) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInn),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(create(data));
    return data;
  }

  return res;
};

export const addNewImage = (id, image) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: image.url ? image.url : image,
      preview: image.preview ? true : false,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addImage(data));
  }

  return res;
};

export const updateInn = (id, inn) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inn),
  });

  if (res.ok) {
    const data = res.json();

    dispatch(update(data));

    return data;
  }

  return res;
};

export const deleteInn = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(destroy(id));

    return message;
  }

  return res;
};

export const selectInns = (state) => state.inns;
export const selectInnById = (innId) => (state) => state.inns[innId];
export const selectInnsArray = createSelector(selectInns, (inns) => {
  return Object.values(inns);
});

export default function innsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALL: {
      const newState = {};

      action.inns.forEach((inn) => {
        newState[inn.id] = inn;
      });

      return {
        ...state,
        ...newState,
      };
    }
    case LOAD_ONE:
      return {
        ...state,
        [action.inn.id]: {
          ...action.inn,
          previewImage: action.inn.SpotImages.find((image) => image.preview)
            .url,
        },
      };
    case CREATE:
      return {
        ...state,
        [action.newInn.id]: action.newInn,
      };
    case ADD_IMAGE:
      return {
        ...state,
      };
    case UPDATE:
      return {
        ...state,
        [action.inn.id]: action.inn,
      };
    case DELETE: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case UPDATE_AVG_RATING: {
      const newState = { ...state };

      if (newState[action.innId]) {
        newState[action.innId] = {
          ...newState[action.innId],
          avgStarRating: action.avgRating,
          numReviews: action.numReviews,
        };
      }
      return newState;
    }
    default:
      return state;
  }
}
