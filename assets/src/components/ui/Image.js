import React from "react";
import { styled } from "@mui/styles";
const Image = styled("img")(({ theme }) => ({
	width: "100%",
	height: "100%",
	position: "relative",
	pointerEvents: "none",
	objectFit: "contain",
}));
export default (props) => {
	return <Image {...props} />;
};
