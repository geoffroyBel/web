import api from "../../api/heroku";
import {
	CREATE_PAYMENT_CHECKOUT,
	ERROR,
	FETCH_CART,
	FETCH_USER,
	SIGN_IN,
} from "../types";

export const SIGN_UP = "SIGN_UP";
export const ERROR_AUTH = "ERROR_AUTH";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const IS_LOADING = "IS_LOADING";
export const AUTH = "AUTH";
const CONFIG = {
	withCredentials: true,
};

export const createAbonnement =
	(prestationId = 14, tarifId = 32, quantity) =>
	async (dispatch) => {
		try {
			const { data } = await api.post(
				`/abonnements`,
				{
					prestation: `/api/prestations/${prestationId}`,
					tarif: `/api/tarifs/${tarifId}`,
					quantity: 1,
				},
				{ withCredentials: true }
			);
			dispatch({ type: CREATE_PAYMENT_CHECKOUT, payload: data });

			// dispatch({
			// 	type: FETCH_PRESTATIONS,
			// 	payload: { data: data["hydra:member"], page },
			// });
			//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
		} catch (error) {
			console.log(error);
			dispatch({ type: ERROR, payload: error.response });
		}
	};
export const clearError = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERROR });
};
