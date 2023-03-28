import React, { useEffect, useState } from "react";

const MenuContext = React.createContext();
export const MenuProvider = ({ children }) => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [headerTitle, setHeaderTitle] = useState("Profile");

	return (
		<MenuContext.Provider
			value={{ headerTitle, setHeaderTitle, isMenuVisible, setIsMenuVisible }}>
			{children}
		</MenuContext.Provider>
	);
};
export default MenuContext;
