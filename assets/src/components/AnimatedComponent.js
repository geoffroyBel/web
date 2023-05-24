import React from "react";

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedComponent = ({ currentItem, children, containerVariants }) => (
	<AnimatePresence exitBeforeEnter>
		<Box
			component={motion.div}
			key={currentItem}
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
			sx={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				flex: 1,
			}}>
			{children}
		</Box>
	</AnimatePresence>
);

export default AnimatedComponent;
