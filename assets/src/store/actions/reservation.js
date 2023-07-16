import api from "../../api/heroku";
import {
	ADD_RESERVATION,
	CREATE_PAYMENT_CHECKOUT,
	ERROR,
	ERROR_RESERVATION,
	FETCH_CART,
	FETCH_PRESTATIONS,
	FETCH_USER,
	REMOVE_RESERVATION,
	FETCH_RESERVATION_BY_PAGE,
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

export const createReservation =
	(values, user, prestation) => async (dispatch) => {
		const body = {
			prestation: `/api/prestations/${prestation.id}`,
			user: `/api/users/${user.id}`,
			horaire: `/api/horaires/${values.horaireId}`,
			abonnement: `/api/abonnements/${values.abonnementId}`,
			startTime: values.startDate,
			endTime: values.endDate,
		};

		try {
			const { data } = await api.post(`/reservations`, body, {
				withCredentials: true,
			});
			console.log(data);
			dispatch({ type: ADD_RESERVATION, payload: data });

			// dispatch({
			// 	type: FETCH_PRESTATIONS,
			// 	payload: { data: data["hydra:member"], page },
			// });
			//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
		} catch (error) {
			console.log(error);
			dispatch({ type: ERROR_RESERVATION, payload: error.response });
		}
	};
export const removeReservation = (id, abt) => async (dispatch) => {
	console.log(abt);
	try {
		const { data } = await api.delete(`/reservations/${id}`, {
			withCredentials: true,
		});

		dispatch({ type: REMOVE_RESERVATION, payload: { id, abonnement: abt } });
	} catch (error) {
		console.log(error);
		dispatch({ type: ERROR_RESERVATION, payload: error.response });
	}
};

export const fetchReservationByPage = (page) => async (dispatch) => {
	try {
		const { data } = await api.get(
			`/reservations?pagination=true&itemsPerPage=6&page=${page}`,
			{
				withCredentials: true,
			}
		);
		console.log("-----ResERVATION BY PAGE---------");
		console.log(page);
		console.log(data);
		dispatch({ type: FETCH_RESERVATION_BY_PAGE, payload: { data, page } });
	} catch (error) {
		console.log(error);
		dispatch({ type: ERROR_RESERVATION, payload: error.response });
	}
};
export const clearError = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERROR });
};
