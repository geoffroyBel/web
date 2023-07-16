import api from "../../api/heroku";
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
		const url = prestations.reduce(
			(acc, el) => `${acc}?prestation[]=${el.id}`,
			"/prestations?pagination=false"
		);
		const { data } = await api.get(url, {
			withCredentials: true,
		});
		console.log("ALLLOOOOOO________");
		console.log(data);
		console.log(url);
		console.log(prestations);
		dispatch({ type: FETCH_FAVORITES, payload: data["hydra:member"] });
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
