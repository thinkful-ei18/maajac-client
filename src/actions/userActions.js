import jwtDecode from "jwt-decode"
import {API_BASE_URL} from '../config';
import {SubmissionError} from 'redux-form';
import normalizeResponseErrors from '../utils/noramlize-errors';

/* REGISTER ACTIONS */

export const REGISTER_REQUEST = "REGISTER_REQUEST"
export const registerRequest = () => ({
	type: REGISTER_REQUEST
})

export const REGISTER_ERROR = "REGISTER_ERROR"
export const registerError = () => ({
	type: REGISTER_ERROR
})

export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const registerSuccess = () => ({
	type: REGISTER_SUCCESS
})

export const register = user => dispatch => {
	return fetch(`${API_BASE_URL}/api/users`, {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			const newUser = {username: user.username, password: user.password};
			console.log(newUser);
			// now log in the user!
		})
		.catch(err => {
			const { reason, message, location } = err
			if (reason === "ValidationError") {
				// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				)
			}
		})
}

/* LOGIN ACTIONS */

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const loginRequest = () => ({
	type: LOGIN_REQUEST
})

export const LOGIN_ERROR = "LOGIN_ERROR"
export const loginError = () => ({
	type: LOGIN_ERROR
})

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const loginSuccess = () => ({
	type: LOGIN_SUCCESS
})

/* AUTH TOKEN ACTIONS NECESSARY FOR USERS TO LOGIN */

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN"
export const setAuthToken = authToken => ({
	type: SET_AUTH_TOKEN,
	authToken
})

export const CLEAR_AUTH = "CLEAR_AUTH"
export const clearAuth = () => ({
	type: CLEAR_AUTH
})

export const AUTH_REQUEST = "AUTH_REQUEST"
export const authRequest = () => ({
	type: AUTH_REQUEST
})

export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const authSuccess = currentUser => ({
	type: AUTH_SUCCESS,
	currentUser
})

export const AUTH_ERROR = "AUTH_ERROR"
export const authError = error => ({
	type: AUTH_ERROR,
	error
})

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken)
	dispatch(setAuthToken(authToken))
	dispatch(authSuccess(decodedToken.user))
	saveAuthToken(authToken)
}

export const login = data => dispatch => {
	dispatch(authRequest())
	return (
		fetch(`${API_BASE_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			// Reject any requests which don't return a 200 status, creating
			// errors which follow a consistent format
			.then(res => normalizeResponseErrors(res))
			.then(res => res.json())
			.then(({ authToken }) => storeAuthInfo(authToken, dispatch))
			.catch(err => {
				const { code } = err
				const message = code === 401 ? "Incorrect username or password" : "Unable to login, please try again"
				dispatch(authError(err))
				// Could not authenticate, so return a SubmissionError for Redux
				// Form
				return Promise.reject(
					new SubmissionError({
						_error: message
					})
				)
			})
	)
}