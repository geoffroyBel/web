import {
	CREATE_COMPANY,
	IS_LOADING,
	ERROR_CREATE_COMPANY,
	CLEAR_ERROR,
	FETCH_COMPANY,
	UPDATE_COMPANY,
} from "../types";
import Company from "../../models/Company";

const pagesNumber = ["company", "person", "external_account"];

const initialStates = {
	loading: false,
	step: 0,
	company: null,
	error: null,
	url: null,
};
export default (state = initialStates, action) => {
	switch (action.type) {
		case FETCH_COMPANY:
			return {
				...state,
				company: action.payload.company
					? { ...action.payload.company /*, tarifs: action.payload.tarifs */ }
					: null,
			};
		case CREATE_COMPANY:
			const company = new Company(
				action.payload.id,
				action.payload.name,
				action.payload.accountID,
				action.payload.accountLink,
				action.payload.status
			);
			console.log(company);
			return {
				...state,
				step: 1,
				loading: false,
				company,
			};
		case IS_LOADING:
			return { ...state, loading: action.payload };
		case ERROR_CREATE_COMPANY:
		case CLEAR_ERROR:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
