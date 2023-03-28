import React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { green, grey, red } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";

const LinkBehavior = React.forwardRef((props, ref) => {
	const { href, ...other } = props;
	// Map href (MUI) -> to (react-router)
	return (
		<RouterLink
			data-testid='custom-link'
			ref={ref}
			to={href}
			{...other}
		/>
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
			secondary: "#C7C8C7",
			primary: "#28282a",
			dark: "#1e1e1f",
			gray: "#565557",
			success: "#64ffda",
		},
		primary: {
			ultraLight: "#E4F2FF",
			light: "#2A9CFF",
			main: "#1378EC",
			dark: "#1378EC",
		},
		secondary: {
			light: "#e7b9ff",
			main: "#b388ff",
			dark: "#805acb",
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
			light: "#09C570",
			main: "#09C570",
			dark: "#09C570",
		},
		background: {
			main: "#FFFFFF",
			light: "#FFFFFF",
			dark: "#FFFFFF",
		},
		gray: {
			main: "rgba(12, 13, 52, 0.2)",
			light: "#E4E5E4",
			dark: "rgba(12, 13, 52, 0.2)",
		},
	},
	typography: {
		// fontFamily: "'Work Sans', sans-serif",
		fontSize: 14,
		fontWeightLight: 300, // Work Sans
		fontWeightRegular: 400, // Work Sans
		fontWeightMedium: 600, // Roboto Condensed
		fontWeightBold: 800,
	},
	borderRadius: {
		xl: 70,
		lg: 50,
		md: 30,
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
	fontWeight: rawTheme.typography.fontWeightRegular,
	fontFamily: "'Roboto Condensed', sans-serif",
	//letterSpacing: 2,
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
			// letterSpacing: 0,
			// fontSize: 60,
		},
		h2: {
			...rawTheme.typography.h2,
			...fontHeader,
			fontSize: 48,
		},
		h3: {
			...rawTheme.typography.h3,
			...fontTitle,
			fontSize: 28,
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
			...fontTitle,
			textTransform: "capitalize",
			fontSize: 12,
			fontWeight: rawTheme.typography.fontWeightMedium,
			letterSpacing: 1,
		},
		title: {
			...fontTitle,
			fontSize: 20,
			fontWeight: rawTheme.typography.fontWeightBold,
			textTransform: "capitalize",
		},
		subtitle: {
			...fontTitle,
			fontSize: 16,
			fontWeight: rawTheme.typography.fontWeightMedium,
			textTransform: "capitalize",
			letterSpacing: 1,
		},
		description: {
			...fontTitle,
			fontSize: 20,
			letterSpacing: 1,
			fontWeight: rawTheme.typography.fontWeightLight,
			color: rawTheme.palette.text.gray,
		},
		subtitle: {
			...fontTitle,
			fontSize: 16,
			fontWeight: rawTheme.typography.fontWeightMedium,
			textTransform: "capitalize",
			letterSpacing: 1,
		},
		subtitle1: {
			// ...rawTheme.typography.subtitle1,
			// fontWeight: rawTheme.typography.fontWeightMedium,
			...fontTitle,
			fontSize: 16,
			fontWeight: rawTheme.typography.fontWeightRegular,
			textTransform: "capitalize",
			letterSpacing: 1,
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
		button: {
			// ...rawTheme.typography.body2,
			fontWeight: rawTheme.typography.fontWeightBold,
			fontSize: 16,
			color: rawTheme.palette.text.gray,
		},
		body: {
			...rawTheme.typography.body2,
			fontWeight: rawTheme.typography.fontWeightRegular,
			fontSize: 16,
			color: rawTheme.palette.text.gray,
		},
		body1: {
			...rawTheme.typography.body2,
			fontWeight: rawTheme.typography.fontWeightLight,
			fontSize: 16,
		},
		captionBold: {
			...rawTheme.typography.body1,
			fontWeight: rawTheme.typography.fontWeightBold,
			fontSize: 14,
		},
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				button: {
					textTransform: "Capitalize",
				},
			},
		},
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
		MuiButton: {
			defaultProps: {
				fullWidth: true,
			},
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					borderRadius: "30px",
					padding: rawTheme.spacing(1.5),
					maxWidth: 300,
					textTransform: "none",
				},
			},
		},
	},
};

export default theme;
