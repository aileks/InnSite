import { csrfFetch } from './csrf';

const LOAD_INNS = 'inns/loadInns';
const SINGLE_INN = 'inns/singleInn';

export const loadInns = inns => {
  return {
    type: LOAD_INNS,
    inns,
  };
};

export const singleInn = inn => {
  return {
    type: SINGLE_INN,
    inn,
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

export const getInnById = innId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${innId}`);

  if (res.ok) {
    const inn = await res.json();
    dispatch(singleInn(inn))
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
