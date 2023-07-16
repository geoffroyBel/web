import { upload } from "../../api/aws";
import api from "../../api/heroku";
import {
	CREATE_PRESTATION,
	ERROR,
	ERROR_CREATE_PRESTATION,
	FETCH_PRESTATIONS,
	FETCH_PRESTATION_BY_ID,
} from "../types";

export const createPrestation =
	(values, completion = () => console.log("hhhhhhhh")) =>
	async (dispatch) => {
		const config = {
			withCredentials: true,
		};

		const body = {
			name: values.name || "Not Provided Yet",
			description: values.description,
			type: `/api/types/${values.type}`,
			categories: [`/api/categories/${values.sport}`],
		};
		const { image = null, user = null } = values;

		try {
			const { data } = await api.post(`/prestations`, body, config);
			if (image) {
				const { data: presign } = await api.post("/image/presignUrl", {
					preSignUrl: "hhhhhh",
				});
				await upload(image[0], presign.uri);
				await api.post("/images", {
					user: `/api/users/${user.id}`,
					url: `https://${presign.host}${presign.path}`,
					prestation: `/api/prestations/${data.id}`,
				});
			}
			console.log("----------CREATE");
			console.log(data);
			dispatch({
				type: CREATE_PRESTATION,
				payload: data,
			});

			completion();
			//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
		} catch (error) {
			console.log(error);
			dispatch({ type: ERROR_CREATE_PRESTATION, payload: error.response });
		}
	};
export const fetchPrestations = (page, category) => async (dispatch) => {
	let url = `/prestations?page=${page}`;
	let result = { page };
	if (category) {
		url = `${url}&categories.id=${category.id}`;
	}

	try {
		const { data } = await api.get(url, {
			withCredentials: false,
		});
		result.data = data["hydra:member"];
		// console.log(url);
		console.log(data["hydra:member"]);
		dispatch({
			type: FETCH_PRESTATIONS,
			payload: result,
		});
		//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
	} catch (error) {
		console.log(error);
		dispatch({ type: ERROR, payload: error.response });
	}
};
export const fetchPrestationsById = (id) => async (dispatch) => {
	try {
		const { data } = await api.get(`/prestations/${id}`, {
			withCredentials: false,
		});
		console.log("fetch BY ID data");
		console.log(data);
		dispatch({
			type: FETCH_PRESTATION_BY_ID,
			payload: data,
		});
	} catch (error) {
		console.log(error);
		dispatch({ type: ERROR, payload: error.response });
	}
};

export const sendErrors = (states) => async (dispatch) => {
	dispatch({ type: ERROR_CREATE_PRESTATION, payload: states });
};
