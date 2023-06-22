import { CREATE_PAYMENT_CHECKOUT, CREATE_PAYMENT_INTENT } from "../types";

const initialStates = {
	error: null,
	paymentMethodId: null,
	client_secret: null,
	loading: false,
	orders: [],
	checkoutUrl: null,
};

export default (state = initialStates, action) => {
	switch (action.type) {
		case CREATE_PAYMENT_INTENT:
			return {
				paymentMethodId: action.payload.paymentId,
				clientSecret: action.payload.clientSecret,
				orders: [...state.orders, action.payload.order],
			};
		case CREATE_PAYMENT_CHECKOUT:
			return {
				...state,
				checkoutUrl: action.payload.checkoutUrl,
			};
		default:
			return state;
	}
};
