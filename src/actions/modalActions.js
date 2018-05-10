import axios from 'axios';
import { API_BASE_URL } from '../config';

export const OPEN_SIGN_UP = "OPEN_SIGN_UP"
export const openSignUp = () => ({
	type: OPEN_SIGN_UP
})

export const OPEN_LOGIN = "OPEN_LOGIN"
export const openLogin = () => ({
	type: OPEN_LOGIN
})

export const OPEN_DIALOG = "OPEN_DIALOG"
export const openDialog = () => ({
	type: OPEN_DIALOG
})

export const CLOSE_DIALOG = "CLOSE_DIALOG"
export const closeDialog = () => ({
	type: CLOSE_DIALOG
})

// Profile picture modal

export const PROFILE_OPEN_DIALOG = "PROFILE_OPEN_DIALOG"
export const profileOpenDialog = () => ({
	type: PROFILE_OPEN_DIALOG
})

export const PROFILE_CLOSE_DIALOG = "PROFILE_CLOSE_DIALOG"
export const profileCloseDialog = () => ({
	type: PROFILE_CLOSE_DIALOG
})

export const PROFILE_SUCCESS = "PROFILE_SUCCESS"
export const profileSuccess = (imageURL) => ({
	type: PROFILE_SUCCESS,
	imageURL
})

export const POST_PROFILE_TO_USER_SUCCESS = "POST_PROFILE_TO_USER_SUCCESS"
export const postProfileToUserSuccess = (authToken) => ({
	type: POST_PROFILE_TO_USER_SUCCESS,
	authToken
})

export const postProfileToUser = (ppImage) => (dispatch, getState) => {
	console.log('here')
	return fetch(`${API_BASE_URL}/users`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			profilePicture: ppImage
		}
			.then(res => {
				console.log(res, 'post to user')
				dispatch(postProfileToUserSuccess(res))
				res.json()
			})
			.then(data => console.log(data))
	})
}

export const postProfileImage = (image) => (dispatch, getState) => {
	var formData = new FormData();
	formData.append("upload_preset", 'btqsteza-unsigned');
	formData.append("file", image);

	axios({
		url: 'https://api.cloudinary.com/v1_1/dpg5znpau/upload',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: formData
	}).then((res) => {
		// TODO: PUT profile picture in user
		// dispatch(profileSuccess(res.data.secure_url))
		console.log('here')
		postProfileToUser(res.data.secure_url)
		console.log(res.data.secure_url)
	}).catch(err => console.log(err))
}