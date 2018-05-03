import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from "redux-form"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import markerReducer from './reducers/markerReducer';
import reportReducer from './reducers/reportReducer';

const store = createStore(
  combineReducers({
    form: formReducer,
    markers: markerReducer,
    report: reportReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;