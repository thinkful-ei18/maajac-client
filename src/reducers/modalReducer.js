import { OPEN_SIGN_UP, OPEN_LOGIN, OPEN_DIALOG, CLOSE_DIALOG, PROFILE_OPEN_DIALOG, PROFILE_CLOSE_DIALOG } from "../actions/modalActions";

const initialState = {
	currentTab: null,
	dialog: false,
	ppModal: false
};

export default function modalReducer(state = initialState, action) {
	if (action.type === OPEN_SIGN_UP) {
		return { ...state, currentTab: "signup" };
	}
	if (action.type === OPEN_LOGIN) {
		return { ...state, currentTab: "login" };
	}

	if (action.type === OPEN_DIALOG) {
		return { ...state, dialog: true };
	}

	if (action.type === CLOSE_DIALOG) {
		return { ...state, dialog: false };
	}

	// profile picture modal

	if (action.type === PROFILE_OPEN_DIALOG) {
		return {
			...state,
			ppModal: true
		}
	}

	if (action.type === PROFILE_CLOSE_DIALOG) {
		return {
			...state,
			ppModal: false
		}
	}

	return state;
}
