import { combineReducers } from "redux";
import prestationsReducer from "./prestation";
import authReducer from "./auth";
import companyReducer from "./company";
import favoriteReducer from "./favorite";
import cartReducer from "./cart";
import orderReducer from "./order";

export default combineReducers({
	auth: authReducer,
	prestations: prestationsReducer,
	favorites: favoriteReducer,
	company: companyReducer,
	cart: cartReducer,
	order: orderReducer,
});
