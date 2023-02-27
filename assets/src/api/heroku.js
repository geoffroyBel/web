import axios from "axios";
const instance = axios.create({
	baseURL: "http://127.0.0.1:8000/api",

	baseURL: "https://cryptic-badlands-94917.herokuapp.com//api",
});

instance.interceptors.request.use(
	async (config) => {
		const token = window.localStorage.getItem("token");

		if (token && config.withCredentials) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			config.headers.Authorization = "";
		}

		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);
export default instance;
