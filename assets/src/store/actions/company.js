import api from "../../api/heroku";
import { CREATE_COMPANY, ERROR_CREATE_COMPANY, IS_LOADING } from "../types";
const _INDIVIDUAL = {
	first_name: "bla",
	last_name: "blas",
	email: "ghfd@lo.com",
};
const _COMPANY = {
	name: "cours",
};
export const createCompany =
	(completion = () => {}) =>
	async (dispatch) => {
		const config = { withCredentials: true };
		const values = { name: "jamnon beure" };

		dispatch({ type: IS_LOADING, payload: true });
		try {
			const { data: company } = await api.post("/companies", values, config);
			dispatch({
				type: CREATE_COMPANY,
				payload: { ...company },
			});
			completion();
		} catch (e) {
			dispatch({ type: IS_LOADING, payload: false });
			dispatch({
				type: ERROR_CREATE_COMPANY,
				payload: errorFunc(e),
			});
		}
	};

export const errorFunc = (e) => {
	if (!e.response)
		return `Internal Error Sorry!!: \n ${e.toString().substr(0, 50)}}`;
	console.log("Auth Error errrrrr");
	console.log(e);
	console.log(e.message);
	return (
		e.response.data["hydra:description"] ||
		e.response.data.detail ||
		`Something Went Wrong: ${e.response.data.message}`
	);
};
