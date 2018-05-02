import {API_BASE_URL} from '../config';
import {SubmissionError} from 'redux-form';
import normalizeResponseErrors from '../utils/noramlize-errors';

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
