import { Prestation } from "../../models/Prestation";
import { ADD_TO_FAVORITES, FETCH_FAVORITES } from "../types";

const initialstates = {
	prestations: [],
	error: null,
};

export default (state = initialstates, action) => {
	switch (action.type) {
		case FETCH_FAVORITES:
			return {
				...state,
				prestations: action.payload,
			};
		case ADD_TO_FAVORITES:
			return {
				...state,
				prestations: [...state.prestations, action.payload],
			};
		default:
			return state;
	}
};
