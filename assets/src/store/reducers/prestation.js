import { Prestation } from "../../models/Prestation";
import {
	FETCH_PRESTATIONS,
	POST_PRESTATION,
	CREATE_PRESTATION,
	PRESTATION_EVENT_LISTENER,
} from "../types";

const initialstates = {
	availablePrestations: [],
	userPrestations: [],
	initialValues: {},
	error: null,
	loading: false,
	currentPrestation: null,
	pageLoaded: {},
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
			const { data: rows, page } = action.payload;
			let availablePrestations = [];
			if (!state.pageLoaded[page]) {
				availablePrestations = [
					...state.availablePrestations,
					...rows.map((data) => new Prestation(data)),
				];
			}
			return {
				...state,
				pageLoaded: { ...state.pageLoaded, [page]: true },
				availablePrestations,
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
