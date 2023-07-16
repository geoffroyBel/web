import {
	ADD_RESERVATION,
	REMOVE_RESERVATION,
	FETCH_ALL_USER_RESERVATION,
	FETCH_ALL_USER_ABONNEMENT,
	FETCH_RESERVATION_BY_PAGE,
} from "../types";

const initialStates = {
	currentPage: 0,
	totalPage: 0,
	error: null,
	reservations: [],
	abonnements: [],
	userReservationsByPID: {},
	userReservationsByPage: {},
};
const sortResaByPresta = (array) => {
	return array.reduce((acc, resa) => {
		const prestation = resa.abonnement?.prestation || null;
		const horaire = resa.horaire;
		if (!prestation || !horaire) return acc;
		if (!acc[prestation.id]) {
			acc[prestation.id] = [];
		}
		if (!acc[prestation.id][horaire.id]) {
			acc[prestation.id][horaire.id] = [];
		}
		acc[prestation.id][horaire.id].push(resa);
		return acc;
	}, {});
};
export default (state = initialStates, action) => {
	switch (action.type) {
		case ADD_RESERVATION:
			return {
				...state,
				reservations: [...state.reservations, action.payload],
				userReservationsByPID: sortResaByPresta([
					...state.reservations,
					action.payload,
				]),
				abonnements: state.abonnements.map((a) => {
					if (a.id === action.payload.abonnement.id) {
						return action.payload.abonnement;
					}
					return a;
				}),
			};
		case FETCH_RESERVATION_BY_PAGE:
			const ITEMS_PER_PAGE = 6;
			const currentPage = action.payload.page;
			const data = action.payload.data["hydra:member"];
			const totalPage = parseInt(
				action.payload.data["hydra:totalItems"] / ITEMS_PER_PAGE
			);
			return {
				...state,
				totalPage,
				userReservationsByPage: {
					...state.userReservationsByPage,
					[currentPage - 1]: data,
				},
				currentPage,
			};
		case FETCH_ALL_USER_ABONNEMENT:
			return {
				...state,
				abonnements: action.payload || [],
				//userReservationsByPID: sortResaByPresta(action.payload),
			};
		case FETCH_ALL_USER_RESERVATION:
			return {
				...state,

				reservations: action.payload || [],
				userReservationsByPID: sortResaByPresta(action.payload),
			};
		case REMOVE_RESERVATION:
			const reservations = state.reservations.filter(
				(resa) => resa.id !== action.payload.id
			);
			return {
				...state,
				reservations: reservations,
				userReservationsByPID: sortResaByPresta(reservations),
				abonnements: state.abonnements.map((a) => {
					if (a.id === action.payload.abonnement.id && a.credits) {
						return { ...action.payload.abonnement, credits: a.credits + 1 };
					}
					return a;
				}),
			};
		default:
			return state;
	}
};
