import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../actions/userActions';
import { POST_PROFILE_TO_USER_SUCCESS } from '../actions/modalActions';

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  error: null,
};

export const userAuthReducer = (state = initialState, action) => {
  if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken,
    });
  } else if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, {
      authToken: null,
      currentUser: null,
    });
  } else if (action.type === AUTH_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null,
    });
  } else if (action.type === AUTH_SUCCESS) {
    console.log('action', action)
    return Object.assign({}, state, {
      loading: false,
      currentUser: action.currentUser,
    });
  } else if (action.type === AUTH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
    });
  } else if (action.type === REGISTER_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
    });
  } else if (action.type === REGISTER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: false,
    });
  } else if (action.type === REGISTER_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: false
    });
    // } else if (action.type === PROFILE_SUCCESS) {
    //   console.log(action, 'pp action')
    //   return Object.assign({}, state, {
    //     profilePicture: action.imageURL
    //   })
  } else if (action.type === POST_PROFILE_TO_USER_SUCCESS) {
    console.log(action, 'pp action')
    return Object.assign({}, state, {
      currentUser: Object.assign({}, state.currentUser, {
        profilePicture: action.image
      })
    })
  }
  return state;
}

export default userAuthReducer