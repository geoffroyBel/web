import React from "react";
import { styled } from "@mui/styles";
const Button = styled("button")(({ theme }) => ({
	border: "none",
	borderRadius: 30,
	padding: theme.spacing(2, 5),
	color: "white",
	//marginTop: "2rem",
	width: 300,
	textAlign: "center",
	fontWeight: "bold",
}));
export default (props) => {
	const { variant, style, children, title = null } = props;
	let backgroundColor =
		variant === "primary" ? "#09C570" : "rgba(12,13, 52, 0.1)";
	backgroundColor =
		variant === "transparent" ? "rgba(12,13, 52, 0.0)" : backgroundColor;
	const color = variant === "primary" ? "white" : "black";

	return (
		<Button {...props} style={{ ...style, backgroundColor, color }}>
			{title || children}
		</Button>
	);
};
