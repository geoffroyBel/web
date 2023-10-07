import User from "../../models/User";
import api from "../../api/heroku";
import {
	FETCH_ALL_USER_ABONNEMENT,
	FETCH_ALL_USER_RESERVATION,
	FETCH_CART,
	FETCH_USER,
	SIGN_IN,
	SIGN_OUT,
} from "../types";
import { async } from "regenerator-runtime";
import Axios from "axios";
import { upload } from "../../api/aws";

export const SIGN_UP = "SIGN_UP";
export const ERROR_AUTH = "ERROR_AUTH";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const IS_LOADING = "IS_LOADING";
export const AUTH = "AUTH";

export const clearError = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERROR });
};
/*

	if (!image_profile) {
		dispatch({ type: "auth_error", payload: "Please provide a profile image" });
		return;
	}
	const file = image_profile[0];

	try {
		const {
			data: { preSignUrl }
		} = await api.post("/image/presign", { preSignUrl: "hhhhhh" });

		await axios.put(preSignUrl, file, {
			headers: {
				"Content-Type": file.type
			}
		});
	} catch (error) {
		dispatch({
			type: "auth_error",
			payload: `upload fail: ${error.response.status} ${error.response.statustext}`
		});
		return;
	}
*/
export const tryLocalSignin =
	(fail = () => {}) =>
	async (dispatch) => {
		console.log("------------TryLocalSignIn---------");
		const token = window.localStorage.getItem("token");
		const id = Number(window.localStorage.getItem("id"));

		if (token && id) {
			console.log("id", id);
			console.log(token);
			try {
				const { data } = await api.get(`/users/${id}`, {
					withCredentials: true,
				});
				console.log(data);
				console.log("--------------");
				dispatch({
					type: FETCH_ALL_USER_RESERVATION,
					payload: data.reservations["hydra:member"],
				});
				dispatch({
					type: FETCH_ALL_USER_ABONNEMENT,
					payload: data.abonnements["hydra:member"],
				});
				dispatch({ type: FETCH_USER, payload: data });
				dispatch({ type: SIGN_IN, payload: { token, id } });
				//completion();
			} catch (e) {
				console.log(e.response.status);
				fail();
				dispatch({ type: SIGN_IN_ERROR });
			}
		} else {
			console.log("go to sign in");
			fail();
		}

		// if (token) {
		// 	try {
		// 		const { data } = await api.get(`/users/${id}`, {
		// 			withCredentials: true,
		// 		});
		// 		const user = new User(
		// 			data.id,
		// 			data.username,
		// 			data.email,
		// 			data.password,
		// 			data.shoppingCart.id
		// 		);
		// 		dispatch({ type: SIGN_IN, payload: { token, user } });
		// 		completion("prestation");
		// 	} catch (e) {
		// 		console.log(e);

		// 		dispatch({
		// 			type: ERROR_AUTH,
		// 			payload: errorFunc(e),
		// 		});
		// 		completion("signIn");
		// 	}
		// } else {
		// 	completion("signIn");
		// }
	};

export const isLoading = (bool) => async (dispatch) => {
	dispatch({ type: IS_LOADING, payload: bool });
};
export const fetchUser = (id, completion) => async (dispatch) => {
	try {
		const { data } = await api.get(`/users/${id}`, { withCredentials: true });
		console.log("FETCH USER");
		console.log(data);

		completion();
		dispatch({
			type: FETCH_ALL_USER_RESERVATION,
			payload: data.reservations["hydra:member"],
		});
		dispatch({
			type: FETCH_ALL_USER_ABONNEMENT,
			payload: data.abonnements["hydra:member"],
		});
		dispatch({ type: FETCH_CART, payload: data.cart });
		dispatch({ type: FETCH_USER, payload: data });
	} catch (e) {
		console.log(error);
		dispatch({
			type: ERROR_AUTH,
			payload: errorFunc(e),
		});
	}
};
export const signOut =
	(completion = () => alert("sign out")) =>
	async (dispatch) => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("id");
		completion();
		dispatch({ type: SIGN_OUT });
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
			//save token user
			window.localStorage.setItem("token", token);
			window.localStorage.setItem("id", JSON.stringify(id));

			//fetchUser

			await fetchUser(id, completion)(dispatch);

			dispatch({ type: SIGN_IN, payload: { token, id } });
		} catch (e) {
			dispatch({
				type: ERROR_AUTH,
				payload: errorFunc(e),
			});
			dispatch({ type: IS_LOADING, payload: false });
		}
	};
export const signUp =
	({ image_profile, ...rest }, completion = () => {}) =>
	async (dispatch) => {
		let payload = { ...rest };
		try {
			if (image_profile) {
				const { data: presign } = await api.post("/image/presignUrl", {
					preSignUrl: "hhhhhh",
				});

				await upload(image_profile[0], presign.uri);
				payload.picture = `https://${presign.host}${presign.path}`;
				// await api.post("/images", {
				// 	user: `/api/users/${user.id}`,
				// 	url: `https://${presign.host}${presign.path}`,
				// });
			}
			const { data: user } = await api.post("/users", payload);
			dispatch({ type: IS_LOADING, payload: false });
			dispatch({ type: SIGN_UP, payload: user });
			completion();
		} catch (e) {
			console.log(e.message);
			dispatch({ type: IS_LOADING, payload: false });
			dispatch({
				type: ERROR_AUTH,
				payload: errorFunc(e),
			});
		}
		// return;
		// dispatch({ type: IS_LOADING, payload: true });

		// try {
		// 	const { data } = await api.post("/users", {
		// 		username,
		// 		name: username,
		// 		password,
		// 		retypePassword: password,
		// 		email,
		// 	});

		// 	dispatch({ type: IS_LOADING, payload: false });
		// 	dispatch({ type: SIGN_UP, payload: data });
		// 	completion();
		// } catch (e) {
		// 	console.log(e.message);
		// 	dispatch({ type: IS_LOADING, payload: false });
		// 	dispatch({
		// 		type: ERROR_AUTH,
		// 		payload: errorFunc(e),
		// 	});
		// 	// dispatch(
		// 	// 	updateSyncErrors("user", {
		// 	// 		username: " ",
		// 	// 		password: " ",
		// 	// 	})
		// 	// );
		// }
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
