import React, { useEffect } from "react";
import { connect, Connect } from "react-redux";
import * as authActions from "../store/actions/auth";

const Signin = ({ signIn }) => {
	useEffect(() => {
		signIn({
			username: "Katelynn56",
			password: "Secret123#",
			email: "hotmail@live.fr",
		});
	}, []);
	return <div>Signin</div>;
};

export default connect(null, authActions)(Signin);
