/* ====================================
LOCATION INFO FOR INCIDENT SUBMISSION 
==================================== */

export const SET_USER_LOCATION_SUCCESS = 'SET_USER_LOCATION_SUCCESS';
export const setUserLocationSuccess = location => ({
  type: SET_USER_LOCATION_SUCCESS,
  location
});

export const SET_USER_LOCATION_ERROR = 'SET_USER_LOCATION_ERROR';
export const setUserLocationError = error => ({
  type: SET_USER_LOCATION_ERROR,
  error
});

export const SET_USER_LOCATION_REQUEST = 'SET_USER_LOCATION_REQUEST';
export const setUserLocationRequest = () => ({
  type: SET_USER_LOCATION_REQUEST,
});

export const setUserLocation = locationObj => (dispatch) => {
  console.log('location received:', locationObj)
  dispatch(setUserLocationSuccess(locationObj))
}