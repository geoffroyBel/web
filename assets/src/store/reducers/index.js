import { combineReducers } from "redux";
import prestationsReducer from "./prestation";
import authReducer from "./auth";
import companyReducer from "./company";

export default combineReducers({
	auth: authReducer,
	prestations: prestationsReducer,
	company: companyReducer,
});
