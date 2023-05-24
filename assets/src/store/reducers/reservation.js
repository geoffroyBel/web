import {
	ADD_RESERVATION,
	REMOVE_RESERVATION,
	FETCH_ALL_USER_RESERVATION,
} from "../types";

const initialStates = {
	error: null,
	reservations: [],
	userReservationsByPID: {},
};
const sortResaByPresta = (array) => {
	return array.reduce((acc, resa) => {
		if (!acc[resa.prestationID]) {
			acc[resa.prestationID] = [];
		}
		if (!acc[resa.prestationID][resa.horaireID]) {
			acc[resa.prestationID][resa.horaireID] = [];
		}
		acc[resa.prestationID][resa.horaireID].push(resa);
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
			};
		case FETCH_ALL_USER_RESERVATION:
			return {
				...state,
				reservations: action.payload,
				userReservationsByPID: sortResaByPresta(action.payload),
			};
		case REMOVE_RESERVATION:
			return {
				...state,
				reservations: state.reservations.filter(
					(resa) => resa.id !== action.payload
				),
				userReservationsByPID: sortResaByPresta(
					state.reservations.filter((resa) => resa.id !== action.payload)
				),
			};
		default:
			return state;
	}
};
