// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
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
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

// let enhancer;
// if (import.meta.env.MODE === 'production') {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = (await import('redux-logger')).default;
//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

export default store;
