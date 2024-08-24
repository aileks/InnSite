import { csrfFetch } from './csrf';
import { createSelector } from 'reselect';

const LOAD_ALL = 'inns/loadAll';
const LOAD_ONE = 'inns/loadOne';

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

export const getAllInns = () => async dispatch => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const data = await res.json();
    dispatch(loadAll(data.Spots));
  }

  return res;
};

export const getInnById = id => async dispatch => {
  const res = await csrfFetch(`/api/spots/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadOne(data));
  }

  return res;
};

export const selectInns = state => state.inns;
export const selectInnById = innId => state => state.inns[innId];
export const selectInnsArray = createSelector(selectInns, inns => {
  return Object.values(inns);
});

const intitialState = {};

export default function innsReducer(state = intitialState, action) {
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
    default:
      return state;
  }
}
