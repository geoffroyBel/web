import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import store from "./src/store";
import withRoot from "./withRoot";
import App from "./src/components/App";
import { BrowserRouter } from "react-router-dom";

const Home = withRoot(() => (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
));

ReactDom.render(<Home />, document.getElementById("root"));
