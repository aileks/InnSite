import { csrfFetch } from './csrf';
import { createSelector } from 'reselect';

const LOAD_ALL = 'inns/loadAll';
const LOAD_ONE = 'inns/loadOne';
const CREATE = 'inns/create';
const ADD_IMAGE = 'images/addImage';

export const loadAll = inns => {
  return {
    type: LOAD_ALL,
    inns,
  };
};

export const loadOne = inn => {
  return {
    type: LOAD_ONE,
    inn,
  };
};

export const create = newInn => {
  return {
    type: CREATE,
    newInn,
  };
};

export const addImage = image => {
  return {
    type: ADD_IMAGE,
    image,
  };
};

export const getAllInns = () => async dispatch => {
  const res = await csrfFetch('/api/spots');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Spots));

    return data;
  }

  return res;
};

export const getUserInns = () => async dispatch => {
  const res = await csrfFetch('/api/spots/current');

  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Spots));

    return data;
  }

  return res;
}

export const getInnById = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadOne(data));
  }

  return res;
};

export const createInn = newInn => async dispatch => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export const addNewImage = (id, image) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export const selectInns = state => state.inns;
export const selectInnById = innId => state => state.inns[innId];
export const selectInnsArray = createSelector(selectInns, inns => {
  return Object.values(inns);
});

export default function innsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALL: {
      const newState = {};

      action.inns.forEach(inn => {
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
          previewImage: action.inn.SpotImages.find(image => image.preview).url,
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
        [action.image.spotId]: {
          ...action.image.spotId,
          previewImage: action.image.url,
        },
      };
    default:
      return state;
  }
}
