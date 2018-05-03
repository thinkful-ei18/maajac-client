import { SET_USER_LOCATION_SUCCESS } from '../actions/reportActions';

const initialState = {
  userLocation: {},
  loading: false,
  error: null,
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_USER_LOCATION_SUCCESS:
      return {
        ...state,
        userLocation: {...action.location},
        loading: false,
        error: false
      }
    default: { return state }
  }
}

export default reportReducer;