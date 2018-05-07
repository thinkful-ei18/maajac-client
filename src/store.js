import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import markerReducer from './reducers/markerReducer';
import reportReducer from './reducers/reportReducer';
import userAuthReducer from './reducers/userAuthReducer';
import modalReducer from './reducers/modalReducer';
import {loadAuthToken} from './local-storage';
import {setAuthToken, authSuccess} from './actions/userActions';

const store = createStore(
  combineReducers({
    form: formReducer,
    markers: markerReducer,
    report: reportReducer,
    auth: userAuthReducer,
    modal: modalReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

const authToken = loadAuthToken();
const user = JSON.parse(localStorage.getItem('user'));

if (authToken) {
    store.dispatch(setAuthToken(authToken));
    store.dispatch(authSuccess(user));
}

export default store;
