import api from "../../api/heroku";
import { CREATE_TARIF, ERROR, ERROR_CREATE_TARIF } from "../types";
const _TYPES = ["forfait", "mensuel", "annuel"];
export const createTarif =
	(values, completion = () => console.log("hhhhhhhh")) =>
	async (dispatch) => {
		const body = {
			type: "forfait",
			price: Number(values.amount),
			prestation: `/api/prestations/${values.prestationId}`,
		};
		console.log("----------body");
		console.log(body);
		const config = {
			withCredentials: true,
		};

		if (Number(values.type) === 3) {
			body.type = Number(values.recurring) === 1 ? "mensuel" : "annuel";
		} else {
			body.credits = Number(values.credits);
		}
		// completion();
		// console.log(body);
		// return;
		try {
			const { data } = await api.post(`/tarifs`, body, config);

			dispatch({
				type: CREATE_TARIF,
				payload: data,
			});
			console.log("----------CREATE");
			console.log(data);
			completion();

			//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
		} catch (error) {
			console.log(error);
			dispatch({ type: ERROR_CREATE_TARIF, payload: error.response });
		}
	};
