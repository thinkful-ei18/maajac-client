import { API_BASE_URL } from '../config';

export const GET_MARKER_SUCCESS = 'GET_MARKER_SUCCESS';
export const getMarkerSuccess = markers => ({
  type: GET_MARKER_SUCCESS,
  markers
});

export const GET_MARKER_ERROR = 'GET_MARKER_ERROR';
export const getMarkerError = error => ({
  type: GET_MARKER_ERROR,
  error
});

export const GET_MARKER_REQUEST = 'GET_MARKER_REQUEST';
export const getMarkerRequest = () => ({
  type: GET_MARKER_REQUEST
});

export const NEW_MARKER_SUCCESS = 'NEW_MARKER_SUCCESS';
export const newMarkerSuccess = marker => ({
  type: NEW_MARKER_SUCCESS,
  marker
});

export const NEW_MARKER_ERROR = 'NEW_MARKER_ERROR';
export const newMarkerError = error => ({
  type: NEW_MARKER_ERROR,
  error
});

export const FILTER_MARKER_REQUEST = 'FILTER_MARKER_REQUEST';
export const filterMarkerRequest = () => ({
  type: FILTER_MARKER_REQUEST
});

export const FILTER_MARKER_SUCCESS = 'FILTER_MARKER_SUCCESS';
export const filterMarkerSuccess = markers => ({
  type: FILTER_MARKER_SUCCESS,
  markers
});

export const FILTER_MARKER_ERROR = 'FILTER_MARKER_ERROR';
export const filterMarkerError = error => ({
  type: FILTER_MARKER_REQUEST,
  error
});

export const NEW_MARKER_REQUEST = 'NEW_MARKER_REQUEST';
export const newMarkerRequest = () => ({
  type: NEW_MARKER_REQUEST
});

export const newMarker = values => (dispatch, getState) => {
  const { incidentType, location, date, time, description } = values;
  const authToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : getState().auth.authToken;
  dispatch(newMarkerRequest());
  return fetch(`${API_BASE_URL}/new/marker`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      incidentType,
      location,
      date,
      description,
      time
    })
  })
    .then(res => res.json())
    .then(({ data }) => {
      dispatch(newMarkerSuccess(data));
      dispatch(getMarkers());
    })
    .catch(err => {
      dispatch(newMarkerError(err));
    });
};

export const getMarkers = () => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/markers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => dispatch(getMarkerSuccess(data)))
    .catch(err => {
      dispatch(getMarkerError(err));
    });
};

export const filterMarkers = filter => (dispatch, getState) => {
  dispatch(filterMarkerRequest());
  return fetch(`${API_BASE_URL}/markers/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter
    })
  })
    .then(res => res.json())
    .then(data => dispatch(getMarkerSuccess(data)))
    .catch(err => dispatch(filterMarkerError(err)));
};

export const getMarkersDashboard = () => (dispatch, getState) => {
  const authToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : getState().auth.authToken;
  dispatch(getMarkerRequest());
  return fetch(`${API_BASE_URL}/markers/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(data => dispatch(getMarkerSuccess(data)))
    .catch(err => {
      dispatch(getMarkerError(err));
    });
};

export const deleteMarkerDashboard = marker => (dispatch, getState) => {
  const authToken = localStorage.getItem('authToken')
    ? localStorage.getItem('authToken')
    : getState().auth.authToken;
  fetch(`${API_BASE_URL}/markers/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(marker)
  })
    .then(() => dispatch(getMarkersDashboard()))
    .catch(err => {
      dispatch(getMarkerError(err));
    });
};
