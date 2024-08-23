import { csrfFetch } from './csrf';

const LOAD_INNS = 'inns/loadInns';

export const loadInns = inns => {
  return {
    type: LOAD_INNS,
    inns,
  };
};

export const getAllInns = () => async dispatch => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const data = await res.json();
    dispatch(loadInns(data.Spots));
  }

  return res;
};

const intitialState = {};

const innsReducer = (state = intitialState, action) => {
  switch (action.type) {
    case LOAD_INNS: {
      const newState = {};

      action.inns.forEach(inn => {
        newState[inn.id] = inn;
      });

      return {
        ...state,
        ...newState,
      };
    }
    default:
      return state;
  }
};

export default innsReducer;
