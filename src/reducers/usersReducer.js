import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR} from '../actions/userActions';

const initialState = {
  authToken: null,
  username: null,
  firstname: null,
  loading: false,
	error: null
}

export default function userReducer(state=initialState, action) {

switch (action.type) {
  case REGISTER_REQUEST:
    return Object.assign({}, state, {loading: true});

  case REGISTER_ERROR:
    return Object.assign({}, state, {loading: false, error: action.error});

  case REGISTER_SUCCESS:
    return Object.assign({}, state, {loading: false})

  default:
    return state;
}

}