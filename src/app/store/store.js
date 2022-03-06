import { combineReducers, configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weather';

const rootReducer = combineReducers({
  weather: weatherReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
