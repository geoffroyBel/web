import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

export default createStore(
	reducers,
	{},
	applyMiddleware(reduxThunk, tokenMiddleware)
);
