import api from "../../api/heroku";
import {
	ERROR,
	ERROR_CREATE_CATEGORIES,
	FETCH_CATGORIES,
	FETCH_TYPES,
} from "../types";

export const fetchCategories = () => async (dispatch) => {
	try {
		const { data } = await api.get(`/categories`, {
			withCredentials: false,
		});
		dispatch({
			type: FETCH_CATGORIES,
			payload: data["hydra:member"],
		});
		//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
	} catch (error) {
		dispatch({ type: ERROR, payload: error.response });
	}
};
export const fetchTypes = () => async (dispatch) => {
	try {
		const { data } = await api.get(`/types`, {
			withCredentials: false,
		});
		dispatch({
			type: FETCH_TYPES,
			payload: data["hydra:member"],
		});
		//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
	} catch (error) {
		dispatch({ type: ERROR, payload: error.response });
	}
};
export const sendErrors = (states) => async (dispatch) => {
	dispatch({ type: ERROR_CREATE_PRESTATION, payload: states });
};
