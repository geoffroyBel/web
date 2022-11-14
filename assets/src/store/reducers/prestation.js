//import Prestation from "../../models/prestation";
import {
	FETCH_PRESTATIONS,
	POST_PRESTATION,
	CREATE_PRESTATION,
	PRESTATION_EVENT_LISTENER,
} from "../types";

const initialstates = {
	availablePrestations: {},
	userPrestations: [],
	initialValues: {},
	error: null,
	loading: false,
	currentPrestation: null,
};

export default (state = initialstates, action) => {
	switch (action.type) {
		case PRESTATION_EVENT_LISTENER:
			return {
				...state,
				availablePrestations: {
					...state.availablePrestations,
					[action.payload.id]: action.payload,
				},
			};
		case FETCH_PRESTATIONS:
			return {
				...state,
				availablePrestations: action.payload,
			};
		case CREATE_PRESTATION:
			return {
				...state,
				currentPrestation: action.payload,
			};

		case POST_PRESTATION:
			return {
				...state,
				prestation: action.payload,
			};
		default:
			return state;
	}
};
