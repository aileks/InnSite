import { csrfFetch } from './csrf';

const ADD_INN_IMAGE = 'images/addInnImage';

export const add = image => {
  return {
    type: ADD_INN_IMAGE,
    image,
  };
};

export default function imagesReducer(state = {}, action) {
  switch (action.type) {
    case ADD_INN_IMAGE:
      console.log('\n\n--- LOGGING ACTION ---\n\n', action.image);
      return {
        ...state,
        [action.image.spotId]: {
          SpotImages: 
        }
      };
    default:
      return state;
  }
}
