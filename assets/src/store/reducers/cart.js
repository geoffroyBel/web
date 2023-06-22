import { ADD_TO_CART, FETCH_CART, FETCH_CART_ITEMS } from "../types";
import { Cart } from "../../models/Cart";

const initialState = {
	items: [],
	totalAmount: 0,
	totalItems: 0,
	error: "ggggggg",
	checkOutSessionID: null,
	cart: null,
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
			const cart = new Cart(action.payload);
			return {
				...state,
				cart: cart,
				totalItems: cart.getTotalItems(),
				items: cart.cartItems,
			};
		// case ADD_TO_CART:
		// 	const cartItem = action.payload;
		// 	return {
		// 		...state,
		// 		items: [...state.items, cartItem],
		// 		totalAmount: [...state.items, cartItem].reduce(
		// 			(total, item) => total + item.quantity * 20,
		// 			0
		// 		),
		// 	};
		default:
			return state;
	}
};
