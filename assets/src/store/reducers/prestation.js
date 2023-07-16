import { Prestation } from "../../models/Prestation";
import {
	FETCH_PRESTATIONS,
	POST_PRESTATION,
	CREATE_PRESTATION,
	PRESTATION_EVENT_LISTENER,
	ERROR_CREATE_PRESTATION,
	FETCH_CATGORIES,
	FETCH_TYPES,
	FETCH_PRESTATION_BY_ID,
} from "../types";

const initialstates = {
	types: [],
	categories: [],

	availablePrestations: [],
	userPrestations: [],
	initialValues: {},
	errors: null,
	loading: false,
	currentPrestation: null,
	pageLoaded: {},
	prestationId: null,
	horaires: [],
	prestation: null,
	submitForm: null,
};
const sortResaByPresta = (array) => {
	return array.reduce((acc, resa) => {
		if (!acc[resa.prestation.id]) {
			acc[resa.prestation.id] = [];
		}
		if (!acc[resa.prestation.id][resa.horaire.id]) {
			acc[resa.prestation.id][resa.horaire.id] = [];
		}
		acc[resa.prestation.id][resa.horaire.id].push(resa);
		return acc;
	}, {});
};
export default (state = initialstates, action) => {
	switch (action.type) {
		case FETCH_TYPES:
			return {
				...state,
				types: action.payload,
			};
		case FETCH_CATGORIES:
			return {
				...state,
				categories: action.payload.filter((c) => c.parent !== null),
			};
		case FETCH_PRESTATION_BY_ID:
			// const userReservationsByPID = sortResaByPresta(
			// 	action.payload.reservations
			// );
			const prestation = new Prestation(action.payload);
			const id = prestation.id;
			return {
				...state,
				prestation,
				horaires: action.payload.horaires.reduce((acc, h) => {
					console.log("----------------Putainnnnn----------------");
					console.log(h);
					const horaire = {
						id: h.id,
						startDate: h.startTime,
						endDate: h.endTime,
						rRule: h.r_rule,
						// exDate: h.exDate,
						title: "Go to a gym",
					};
					// if (userReservationsByPID[id]) {
					// 	if (userReservationsByPID[id][h.id]) {
					// 		horaire.reservations = userReservationsByPID[id][h.id];
					// 	}
					// }
					return [...acc, horaire];
				}, []),
			};
		case PRESTATION_EVENT_LISTENER:
			return {
				...state,
				availablePrestations: {
					...state.availablePrestations,
					[action.payload.id]: action.payload,
				},
			};
		case FETCH_PRESTATIONS:
			const { data: rows, page } = action.payload;
			let availablePrestations = state.availablePrestations;
			if (!state.pageLoaded[page]) {
				availablePrestations = [
					...state.availablePrestations,
					...rows.map((data) => new Prestation(data)),
				];
			} else if (page === 1) {
				//click on categories shoul make cash multi dim by categories

				availablePrestations = [...rows.map((data) => new Prestation(data))];
			}
			return {
				...state,
				pageLoaded: { ...state.pageLoaded, [page]: true },
				availablePrestations,
			};
		case CREATE_PRESTATION:
			return {
				...state,
				prestationId: action.payload.id,
			};
		case ERROR_CREATE_PRESTATION:
			return {
				...state,
				errors: action.payload,
			};
		case POST_PRESTATION:
			return {
				...state,
				prestation: action.payload,
			};
		default:
			return state;
	}
};
