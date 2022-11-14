import React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { green, grey, red } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";

const LinkBehavior = React.forwardRef((props, ref) => {
	const { href, ...other } = props;
	// Map href (MUI) -> to (react-router)
	return (
		<RouterLink data-testid='custom-link' ref={ref} to={href} {...other} />
	);
});

LinkBehavior.propTypes = {
	href: PropTypes.oneOfType([
		PropTypes.shape({
			hash: PropTypes.string,
			pathname: PropTypes.string,
			search: PropTypes.string,
		}),
		PropTypes.string,
	]).isRequired,
};

const rawTheme = createTheme({
	palette: {
		text: {
			light: "#FFFFFF",
			main: "#28282a",
			dark: "#1e1e1f",
			gray: "#AEC6CC",
		},
		primary: {
			ultraLight: "#F2F4F4",
			light: "#69696a",
			main: "#28282a",
			dark: "#1e1e1f",
		},
		secondary: {
			light: "#fff5f8",
			main: "#ff3366",
			dark: "#e62958",
		},
		warning: {
			main: "#ffc071",
			dark: "#ffb25e",
		},
		error: {
			light: red[50],
			main: red[500],
			dark: red[700],
		},
		success: {
			light: green[50],
			main: green[500],
			dark: green[700],
		},
	},
	typography: {
		fontFamily: "'Work Sans', sans-serif",
		fontSize: 14,
		fontWeightLight: 300, // Work Sans
		fontWeightRegular: 400, // Work Sans
		fontWeightMedium: 600, // Roboto Condensed
		fontWeightBold: 800,
	},
});

const fontHeader = {
	color: rawTheme.palette.text.primary,
	fontWeight: rawTheme.typography.fontWeightMedium,
	fontFamily: "'Roboto Condensed', sans-serif",
	textTransform: "uppercase",
};
const fontSection = {
	color: rawTheme.palette.text.gray,
	fontWeight: rawTheme.typography.fontWeightRegular,
	fontFamily: "'Roboto Condensed', sans-serif",
	letterSpacing: 1,
	textTransform: "uppercase",
};
const fontTitle = {
	color: rawTheme.palette.text.primary,
	fontWeight: rawTheme.typography.fontWeightLight,
	fontFamily: "'Roboto Condensed', sans-serif",
	letterSpacing: 1,
};

const theme = {
	...rawTheme,
	palette: {
		...rawTheme.palette,
		background: {
			...rawTheme.palette.background,
			default: rawTheme.palette.common.white,
			placeholder: grey[200],
		},
	},
	typography: {
		...rawTheme.typography,
		fontHeader,
		h1: {
			...rawTheme.typography.h1,
			...fontHeader,
			letterSpacing: 0,
			fontSize: 60,
		},
		h2: {
			...rawTheme.typography.h2,
			...fontHeader,
			fontSize: 48,
		},
		h3: {
			...rawTheme.typography.h3,
			...fontTitle,
			fontWeight: rawTheme.typography.fontWeightRegular,
			fontSize: 38,
		},
		h4: {
			...rawTheme.typography.h4,
			...fontHeader,
			fontSize: 36,
			letterSpacing: 5,
		},
		h5: {
			...rawTheme.typography.h5,
			fontSize: 20,
			fontWeight: rawTheme.typography.fontWeightLight,
			textTransform: "capitalize",
		},
		h6: {
			...rawTheme.typography.h6,
			...fontSection,
			fontSize: 16,
		},
		h7: {
			...rawTheme.typography.h2,
			...fontHeader,
			fontSize: 30,
			fontWeight: rawTheme.typography.fontWeightLight,
			letterSpacing: 1,
		},
		title: {
			...fontTitle,
			fontSize: 70,
			letterSpacing: 1,
			fontWeight: rawTheme.typography.fontWeightBold,
			textTransform: "uppercase",
		},
		desc: {
			...fontTitle,
			fontSize: 20,
			letterSpacing: 3,
			fontWeight: rawTheme.typography.fontWeightRegular,
		},
		subtitle1: {
			...rawTheme.typography.subtitle1,
			fontSize: 18,
		},
		subtitle2: {
			...rawTheme.typography.subtitle1,
			fontSize: 18,
			letterSpacing: 1,
			fontWeight: rawTheme.typography.fontWeightBold,
		},
		subtitle3: {
			...rawTheme.typography.subtitle1,
			fontSize: 18,
			fontWeight: rawTheme.typography.fontWeightLight,
		},
		body1: {
			...rawTheme.typography.body2,
			fontWeight: rawTheme.typography.fontWeightRegular,
			fontSize: 16,
		},
		body2: {
			...rawTheme.typography.body1,
			fontWeight: rawTheme.typography.fontWeightLight,
			fontSize: 14,
		},
		captionBold: {
			...rawTheme.typography.body1,
			fontWeight: rawTheme.typography.fontWeightBold,
			fontSize: 14,
		},
	},
	components: {
		MuiLink: {
			defaultProps: {
				component: LinkBehavior,
			},
		},
		MuiButtonBase: {
			defaultProps: {
				LinkComponent: LinkBehavior,
			},
		},
	},
};

export default theme;
