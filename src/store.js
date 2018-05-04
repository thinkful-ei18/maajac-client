import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadAuthToken } from './local-storage';
import markerReducer from './reducers/markerReducer';
import reportReducer from './reducers/reportReducer';
import userAuthReducer from './reducers/userAuthReducer';
import { setAuthToken, refreshAuthToken } from './actions/userActions';

const store = createStore(
  combineReducers({
    form: formReducer,
    markers: markerReducer,
    report: reportReducer,
    auth: userAuthReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
