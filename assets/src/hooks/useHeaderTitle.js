import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import MenuContext from "../context/MenuContext";

const useHeaderTitle = (title) => {
	const { setHeaderTitle } = useContext(MenuContext);
	useEffect(() => {
		console.log(title);
		setHeaderTitle(title);
	}, []);
	//   return (
	//     <div>useHeaderTitle</div>
	//   )
};

export default useHeaderTitle;
