/* ====================================
DEFAULT USER LOCATION INFO 
==================================== */

export const DEFAULT_LOCATION = 'DEFAULT_LOCATION';
export const defaultLocation = location => ({
  type: DEFAULT_LOCATION,
  location
});

export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const searchLocation = location => ({
  type: SEARCH_LOCATION,
  location
});

export const setDefaultLocation = locationObj => dispatch => {
  dispatch(defaultLocation(locationObj));
};

export const setSearchLocation = locationObj => dispatch => {
  dispatch(searchLocation(locationObj));
};
