import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
export const Slide = styled(motion.div)(({ theme, width }) => ({
	position: "relative",
	width,
	// flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(5),
}));
export const SlideDescription = styled("p")(({ theme }) => ({
	textAlign: "center",
	...theme.typography.body1,
}));
export const SlideTitle = styled("h1")(({ theme }) => ({
	...theme.typography.h3,

	marginBottom: theme.spacing(2),
	textAlign: "center",
	textTransform: "capitalize",
}));
