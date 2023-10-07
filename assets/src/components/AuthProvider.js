import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import * as authActions from "../store/actions/auth";
const excludeRoutes = [
	"/signin",
	"/signup",
	"/signupConfirm",
	"/home",
	"/register",
	"/confirm",
	"/confirm/",
];

const AuthProvider = ({ location, tryLocalSignin }) => {
	const navigate = useNavigate();
	const { pathname } = location;
	const { token, user } = useSelector(({ auth }) => auth);
	useEffect(() => {
		//si il y a token laisser la navigation se faire
		//car tt requette avec rtr token expired or not found
		// will send back to login
		if (!token && !excludeRoutes.includes(pathname)) {
			tryLocalSignin(() => navigate("/login"));
		} else if (pathname === "/signupConfirm" && !user) {
			navigate("/register");
		}
	}, [pathname, token]);

	return <Outlet />;
};
export default connect(null, authActions)(AuthProvider);
