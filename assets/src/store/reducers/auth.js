import User from "../../models/User";
import { SIGN_IN, FETCH_USER, SIGN_UP, SIGN_OUT } from "../types";

const initialStates = {
	error: null,
	token: null,
	id: null,
	user: null,
	loading: false,
	isAuthenticated: false,
};

export default (state = initialStates, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				...action.payload,
				error: null,
				loading: false,
			};
		case SIGN_OUT:
			return {
				...state,
				error: null,
				token: null,
				user: null,
			};
		case FETCH_USER:
		case SIGN_UP:
			return {
				...state,
				error: null,
				loading: false,
				user: new User(action.payload),
			};
		// case SIGN_UP:
		// 	return {
		// 		...state,
		// 		user: action.payload,
		// 		error: null,
		// 		loading: false,
		// 	};
		// case ERROR_AUTH:
		// 	return {
		// 		...state,
		// 		error: action.payload,
		// 	};
		// case CLEAR_ERROR:
		// 	return {
		// 		...state,
		// 		error: null,
		// 	};
		// case IS_LOADING:
		// 	return {
		// 		...state,
		// 		loading: action.payload,
		// 	};
		default:
			return state;
	}
};
