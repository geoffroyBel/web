import { ADD_TO_FAVORITES, ERROR, FETCH_FAVORITES } from "../types";

export const addFavorite = (prestation) => async (dispatch) => {
	try {
		let prestations = [];
		let prestationsString = window.localStorage.getItem("prestations") || "[]";

		prestations = JSON.parse(prestationsString);

		window.localStorage.setItem(
			"prestations",
			JSON.stringify([...prestations, prestation])
		);
		dispatch({ type: ADD_TO_FAVORITES });
	} catch (error) {
		console.log(error);
		dispatch({ type: ERROR, payload: error.message });
	}
};

export const getFavorites = (prestations) => async (dispatch) => {
	try {
		const prestations = JSON.parse(window.localStorage.getItem("prestations"));
		dispatch({ type: FETCH_FAVORITES, payload: prestations });
	} catch (error) {
		dispatch({ type: ERROR, payload: error.message });
	}
};

export const removeFavorites =
	(ids = []) =>
	async (dispatch) => {
		try {
			let prestations = JSON.parse(window.localStorage.getItem("prestations"));
			window.localStorage.setItem("prestations", JSON.stringify([]));
			dispatch({ type: FETCH_FAVORITES, payload: [] });
		} catch (error) {
			dispatch({ type: ERROR, payload: error.message });
		}
	};
