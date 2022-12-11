import User from "../../models/User";
import api from "../../api/heroku";
import { FETCH_USER, SIGN_IN } from "../types";
import { async } from "regenerator-runtime";

export const SIGN_UP = "SIGN_UP";
export const ERROR_AUTH = "ERROR_AUTH";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const IS_LOADING = "IS_LOADING";
export const AUTH = "AUTH";

export const clearError = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERROR });
};

export const tryLocalSignin =
	(completion = (value) => console.log("navigate :", value)) =>
	async (dispatch) => {
		const token = window.localStorage.getItem("token");
		const id = window.localStorage.getItem("id");

		if (token) {
			try {
				const { data } = await api.get(`/users/${id}`, {
					withCredentials: true,
				});
				const user = new User(
					data.id,
					data.username,
					data.email,
					data.password,
					data.shoppingCart.id
				);
				dispatch({ type: SIGN_IN, payload: { token, user } });
				completion("prestation");
			} catch (e) {
				console.log(e);

				dispatch({
					type: ERROR_AUTH,
					payload: errorFunc(e),
				});
				completion("signIn");
			}
		} else {
			completion("signIn");
		}
	};

export const isLoading = (bool) => async (dispatch) => {
	dispatch({ type: IS_LOADING, payload: bool });
};
export const fetchUser = (id) => async (dispatch) => {
	try {
		const { data } = await api.get(`/users/${id}`, { withCredentials: true });
		console.log(data);
		dispatch({ type: FETCH_USER, payload: data });
	} catch (e) {
		dispatch({
			type: ERROR_AUTH,
			payload: errorFunc(e),
		});
	}
};
export const signIn =
	({ username, password, email }, completion = () => {}) =>
	async (dispatch) => {
		dispatch({ type: IS_LOADING, payload: true });
		try {
			const {
				data: { id, token },
			} = await api.post(
				"/login_check",
				{
					username,
					password,
				},
				{ withCredentials: false }
			);

			console.log(token);
			dispatch({ type: SIGN_IN, payload: { token, id } });
			completion();
		} catch (e) {
			dispatch({
				type: ERROR_AUTH,
				payload: errorFunc(e),
			});
			dispatch({ type: IS_LOADING, payload: false });
		}
	};
export const signUp =
	({ username, password, email }, completion = () => {}) =>
	async (dispatch) => {
		dispatch({ type: IS_LOADING, payload: true });

		try {
			const { data } = await api.post("/users", {
				username,
				name: username,
				password,
				retypePassword: password,
				email,
			});

			dispatch({ type: IS_LOADING, payload: false });
			dispatch({ type: SIGN_UP, payload: data });
			completion();
		} catch (e) {
			console.log(e.message);
			dispatch({ type: IS_LOADING, payload: false });
			dispatch({
				type: ERROR_AUTH,
				payload: errorFunc(e),
			});
			// dispatch(
			// 	updateSyncErrors("user", {
			// 		username: " ",
			// 		password: " ",
			// 	})
			// );
		}
	};
export const signUpConfirm =
	({ confirmCode, userId }, completion = () => {}) =>
	async (dispatch) => {
		dispatch({ type: IS_LOADING, payload: true });
		try {
			const { data } = await api.put(`/users/${userId}/confirmation-code`, {
				retypedConfirmationCode: Number(confirmCode),
			});
			console.log(data);
			dispatch({ type: IS_LOADING, payload: false });
			dispatch({ type: SIGN_UP, payload: data });
			completion();
		} catch (e) {
			dispatch({ type: IS_LOADING, payload: false });
			dispatch({
				type: ERROR_AUTH,
				payload: errorFunc(e),
			});
			dispatch(
				updateSyncErrors("user", {
					username: " ",
					password: " ",
				})
			);
		}
	};
export const errorFunc = (e) => {
	if (!e.response)
		return `Internal Error Sorry!!: \n ${e.toString().substr(0, 50)}}`;
	console.log("Auth Error errrrrr");
	console.log(e);
	console.log(e.message);
	return (
		e.response.data["hydra:description"] ||
		e.response.data.detail ||
		`Something Went Wrong: ${e.response.data.message}`
	);
};
export const errorFormFunc = (form, error) => {
	return updateSyncErrors("user", {
		username: " ",
		password: " ",
	});
};
