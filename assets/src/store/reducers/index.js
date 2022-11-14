import { combineReducers } from "redux";
import prestationsReducer from "./prestation";
import authReducer from "./auth";

export default combineReducers({
	auth: authReducer,
	prestations: prestationsReducer,
});
