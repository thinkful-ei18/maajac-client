import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR} from '../actions/userActions';

const initialState = {
  loading: false,
	error: null
}

export default function userReducer(state=initialState, action) {

  if (action.type === REGISTER_REQUEST) {
    return Object.assign({}, state, {loading: true});
  }

  if (action.type === REGISTER_ERROR) {
    return Object.assign({}, state, {loading: false, error: action.error});
  }

  if (action.type === REGISTER_SUCCESS) {
    return Object.assign({}, state, {loading: false})
  }

  return state;
}

