/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
//import "../../styles/app.css";

// // start the Stimulus application
// import './bootstrap';
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Signin from "./Signin";
import Signup from "./Signup";

const App = () => {
	const location = useLocation();
	return (
		<AnimatePresence exitBeforeEnter>
			<Routes {...{ location }} key={location.pathname}>
				<Route path='/signup' element={<Signup />} />
				<Route path='/signin' element={<Signin />} />
			</Routes>
		</AnimatePresence>
	);
};

export default App;
