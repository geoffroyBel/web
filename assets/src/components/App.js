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
import SignupConfirm from "./SignupConfirm";
import AuthProvider from "./AuthProvider";
import Profile from "../screens/Profile";
import Landing from "../Authentication/landing/Landing";
import Welcome from "../Authentication/Welcome";
import Login from "../Authentication/Login";
import EditProfile from "../Profile/edit";
import CompanyCreate from "../Profile/edit/CompanyCreate";
import { Register, Confirm } from "../Authentication/Register";
import { Sports } from "../Home/Sports/Sports";
import FavoriteSports from "../Home/FavoritesSports";
import Drawer from "../Home/Drawer";
import SportDetail from "../Home/Sports/SportDetail";
import Reservation from "../Home/Reservations";
import CompanyCreate2 from "../Profile/edit/CompanyCreate2";

const App = () => {
	const location = useLocation();
	/*element={<AuthProvider {...{ location }} />}*/
	return (
		<AnimatePresence
			//initial={false}
			exitBeforeEnter>
			<Routes
				{...{ location }}
				key={location.pathname}>
				<Route
					path='/'
					element={<AuthProvider {...{ location }} />}>
					{/* <Route
						path='/home'
						element={<Landing />}
					/> */}
					<Route
						path='/home'
						element={<Drawer navBarPos='relative' />}>
						<Route
							index
							element={<Landing />}
						/>
						<Route
							path='sports'
							// element={<Sports />}
						>
							<Route
								index
								element={<Sports />}
							/>
							<Route
								path='detail/:id'
								element={<SportDetail />}
							/>
						</Route>
						<Route
							path='favorites'
							element={<FavoriteSports />}
						/>
						<Route
							path='reservation'
							element={<Reservation />}
						/>
					</Route>
					<Route
						path='/profile'
						element={
							<Drawer
								navBarPos='absolute'
								navBarColor='text.light'
							/>
						}>
						<Route
							path='edit'
							element={<EditProfile />}
						/>
					</Route>
					<Route
						path='prestation/add'
						element={<CompanyCreate />}
					/>
					{/* <Route
						path='/home/sports'
						element={<Sports />}
					/> */}
					<Route
						path='/welcome'
						element={<Welcome />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='signup'
						element={<Signup />}
					/>
					<Route
						path='signin'
						element={<Signin />}
					/>
					<Route
						path='confirm'
						element={<Confirm />}
					/>
					<Route
						path='company/create/:page'
						element={<Profile />}
					/>
					<Route
						path='company/test/'
						element={<CompanyCreate2 />}
					/>
				</Route>
			</Routes>
		</AnimatePresence>
	);
};

export default App;
