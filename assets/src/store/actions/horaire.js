import api from "../../api/heroku";
import DayjsUtils from "@date-io/dayjs";

import {
	CREATE_HORAIRES,
	ERROR,
	ERROR_CREATE_HORAIRES,
	ERROR_CREATE_PRESTATION,
} from "../types";
import { getEndDate, getStartDate } from "../../Profile/utils/RRuleFormated";

export const createHoraire =
	(values, completion = () => console.log("hhhhhhhh")) =>
	async (dispatch) => {
		const config = {
			withCredentials: true,
		};
		const body = {
			startTime: getStartDate(values.horaires[0]),
			endTime: getEndDate(values.horaires[0]),
			rRule: values.horaires[0].rRule,
			prestation: `/api/prestations/${values.prestationId}`,
		};
		try {
			const { data } = await api.post(`/horaires`, body, config);

			console.log("----------CREATE");
			console.log(data);
			dispatch({
				type: CREATE_HORAIRES,
				payload: data,
			});
			completion();

			//dispatch({ type: FETCH_PRESTATIONS, payload: data["hydra:member"] });
		} catch (error) {
			console.log(error);
			dispatch({ type: ERROR_CREATE_HORAIRES, payload: error.response });
		}
	};
export const sendErrors = (states) => async (dispatch) => {
	dispatch({ type: ERROR_CREATE_PRESTATION, payload: states });
};
