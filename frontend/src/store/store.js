import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import innsReducer from './innsSlice';
import reviewsReducer from './reviewsSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    inns: innsReducer,
    reviews: reviewsReducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});

export default store;
