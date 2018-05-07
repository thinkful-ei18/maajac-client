import { API_BASE_URL } from '../config';
import { SubmissionError } from 'redux-form';
import { normalizeResponseErrors } from '../utils/noramlize-errors';
import { saveAuthToken, clearAuthToken } from '../local-storage';
import jwtDecode from 'jwt-decode'; // this is used on line 79 which is also commented out.

/* REGISTER ACTIONS */

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const registerError = error => ({
  type: REGISTER_ERROR,
  error,
});

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const register = user => dispatch => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => dispatch(login(user.username, user.password)))
    .catch(err => {
      const { reason, message } = err;

      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            _error: message,
          })
        );
      }
    });
};

/* LOGIN ACTIONS */

export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return (
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      // Reject any requests which don't return a 200 status, creating
      // errors which follow a consistent format
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(({ authToken }) => storeAuthToken(authToken, dispatch))
      .catch(err => {
        const { status } = err.error;
        const message =
          status === 422 ? err.message : 'Unable to login, please try again';

        return Promise.reject(
          new SubmissionError({
            _error: message,
          })
        );
      })
  );
};

/* AUTH TOKEN ACTIONS NECESSARY FOR USERS TO LOGIN */

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH,
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser,
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error,
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthToken = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken);
};

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().user.authToken;
  return fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      // Provide our existing token as credentials to get a new one
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ authToken }) => storeAuthToken(authToken, dispatch))
    .catch(err => {
      // We couldn't get a refresh token because our current credentials
      // are invalid or expired, or something else went wrong, so clear
      // them and sign us out
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken(authToken);
    });
};