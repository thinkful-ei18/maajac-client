import axios from 'axios';

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
		console.log(res)
	}).catch(err => console.log(err))
}