import api from "../../api/heroku";
import { ERROR, FETCH_PRESTATIONS } from "../types";

export const fetchPrestations = (page) => async (dispatch) => {
	try {
		const { data } = await api.get(`/prestations?page=${page}`, {
			withCredentials: false,
		});
		dispatch({
			type: FETCH_PRESTATIONS,
			payload: { data: data["hydra:member"], page },
		});
		//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
	} catch (error) {
		console.log(error);
		dispatch({ type: ERROR, payload: error.response });
	}
};
