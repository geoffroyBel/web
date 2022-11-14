import * as React from "react";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

export default function withRoot(Component) {
	function WithRoot(props) {
		return (
			<ThemeProvider theme={responsiveFontSizes(theme)}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithRoot;
}
// export default ({children}) => {
//     return (
//         <ThemeProvider theme={theme}>
//             {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//             <CssBaseline />
//             {children}
//         </ThemeProvider>
//     );
// }
