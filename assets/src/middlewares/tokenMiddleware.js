import { fetchUser } from "../store/actions/auth";
import { SIGN_IN } from "../store/types";

export const tokenMiddleware = (store) => (next) => (action) => {
	switch (action.type) {
		case SIGN_IN:
			console.log(action.payload);
			const { id, token } = action.payload;
			window.localStorage.setItem("token", action.payload.token);
			window.localStorage.setItem("id", JSON.stringify(action.payload.id));
			fetchUser(id)(store.dispatch);
			break;
	}
	next(action);
};
