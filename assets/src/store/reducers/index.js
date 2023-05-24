import { combineReducers } from "redux";
import prestationsReducer from "./prestation";
import authReducer from "./auth";
import companyReducer from "./company";
import favoriteReducer from "./favorite";

export default combineReducers({
	auth: authReducer,
	prestations: prestationsReducer,
	favorites: favoriteReducer,
	company: companyReducer,
});
