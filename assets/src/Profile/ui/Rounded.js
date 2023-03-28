import React from "react";
import { motion } from "framer-motion";

export default (props) => {
	const {
		width = 50,
		height = 50,
		d = "M 0 70 A 70 70, 0, 0, 1, 50 0 L 0 0",
		backgroundColor = "orange",
	} = props;
	return (
		<motion.svg
			component={motion.div}
			{...{ width }}
			{...{ height }}
			viewBox={`0 0 ${width} ${height}`}>
			<motion.path
				fill={backgroundColor}
				{...{ d }}
			/>
		</motion.svg>
	);
};
