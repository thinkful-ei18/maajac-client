import {
  DEFAULT_LOCATION,
  SEARCH_LOCATION
} from '../actions/defaultLocationActions';

const initialState = {
  location: {
    lat: -34.397,
    lng: 150.644
  }
};

export const defaultLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_LOCATION:
      return {
        ...state,
        location: action.location.userlocation
      };
    case SEARCH_LOCATION:
      return {
        ...state,
        location: action.location
      };
    default: {
      return state;
    }
  }
};

export default defaultLocationReducer;
