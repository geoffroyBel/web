import React from "react";
import { motion } from "framer-motion";

export default (props) => {
	const {
		style = {
			position: "absolute",
			left: 0,
			bottom: -50,
		},
		width = 50,
		height = 50,
		d = "M 0 50 A 55 55, 0, 0, 1, 50 0 L 0 0",
		background = "orange",
	} = props;
	return (
		<motion.svg
			component={motion.div}
			{...{ style }}
			{...{ width }}
			{...{ height }}
			viewBox={`0 0 ${width} ${height}`}>
			<motion.path
				fill={background}
				{...{ d }}
			/>
		</motion.svg>
	);
};
