import { OPEN_SIGN_UP, OPEN_LOGIN, OPEN_DIALOG, CLOSE_DIALOG} from "../actions/control";

const initialState = {
	currentTab: null,
	dialog: false
};

export default function controlReducer(state = initialState, action) {
	if (action.type === OPEN_SIGN_UP) {
		return { ...state, currentTab: "signup" };
	}
	if (action.type === OPEN_LOGIN) {
		return { ...state, currentTab: "login" };
	}

	if (action.type === OPEN_DIALOG) {
		return { ...state, dialog: true  };
	}

	if (action.type === CLOSE_DIALOG) {
		return { ...state, dialog: false  };
	}

	return state;
}
