import { SET_USER_LOCATION_SUCCESS, SET_USER_LOCATION_ERROR, SET_USER_LOCATION_REQUEST } from '../actions/reportActions';

const initialState = {
  userLocation: null,
  loading: false,
  error: null,
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOCATION_SUCCESS:
      return {
        ...state,
        userLocation: { ...action.location },
        loading: false,
        error: false
      }
    case SET_USER_LOCATION_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case SET_USER_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      }
    default: { return state }
  }
}

export default reportReducer;