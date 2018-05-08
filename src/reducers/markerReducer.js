import {
	NEW_MARKER_ERROR,
	NEW_MARKER_SUCCESS,
	NEW_MARKER_REQUEST,
	GET_MARKER_REQUEST,
	GET_MARKER_SUCCESS,
	GET_MARKER_ERROR,
	FILTER_MARKER_ERROR,
	FILTER_MARKER_SUCCESS,
	FILTER_MARKER_REQUEST,
} from '../actions/markerActions';

const initialState = {
	allMarkers: [],
	loading: false,
	error: false,
};

export const markerReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_MARKER_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
			};
		case NEW_MARKER_ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case NEW_MARKER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case GET_MARKER_ERROR || FILTER_MARKER_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_MARKER_SUCCESS || FILTER_MARKER_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				allMarkers: action.markers,
			};
		case GET_MARKER_REQUEST || FILTER_MARKER_REQUEST:
			return {
				...state,
				loading: true,
				error: false,
			};
		default: {
			return state;
		}
	}
};

export default markerReducer;
