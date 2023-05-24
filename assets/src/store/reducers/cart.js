import { ADD_TO_CART, FETCH_CART, FETCH_CART_ITEMS } from "../types";

const initialState = {
	items: [],
	totalAmount: 0,
	error: "ggggggg",
	checkOutSessionID: null,
};
export default (state = initialState, action) => {
	let cartItem;
	switch (action.type) {
		case FETCH_CART_ITEMS:
			return {
				...state,
				items: action.payload,
			};
		case FETCH_CART:
			return {
				...state,
				totalAmount: action.payload.amount,
				items: action.payload.cartItems,
			};
		case ADD_TO_CART:
			const cartItem = action.payload;
			return {
				...state,
				items: [...state.items, cartItem],
				totalAmount: [...state.items, cartItem].reduce(
					(total, item) => total + item.quantity * 20,
					0
				),
			};
		default:
			return state;
	}
};
