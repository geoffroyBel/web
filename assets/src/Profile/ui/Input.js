import * as React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { at } from "lodash";
import { useTheme } from "@emotion/react";

export default function Input(props) {
	const { lefticon: leftIcon, rightIconName, ...rest } = props;
	const theme = useTheme();
	const [field, meta, helpers] = useField(props);
	const [touched, error] = at(meta, "touched", "error");

	const color =
		touched && error ? "error" : touched && !error ? "success" : "null";
	//    function _renderHelperText() {
	//     const [touched, error] = at(meta, "touched", "error");
	//     if (touched && error) {
	//         return error;
	//     }
	// }

	const getIconFromName = (iconName, iconProps) => {
		switch (iconName) {
			case "check":
				return (
					<TaskAltIcon
						{...iconProps}
						{...{ color }}
					/>
				);
			default:
				return null;
		}
	};
	return (
		<TextField
			fullWidth
			{...rest}
			inputProps={{
				style: {
					...theme.typography.title,
					color: theme.palette.text.secondary,
				},
			}}
			color='text'
			// InputProps={{
			// 	startAdornment: leftIcon && (
			// 		<InputAdornment position='start'>{leftIcon}</InputAdornment>
			// 	),
			// 	endAdornment: rightIconName && (
			// 		<InputAdornment position='end'>
			// 			{getIconFromName("check")}
			// 		</InputAdornment>
			// 	),
			// }}
			variant='standard'
			error={meta.touched && meta.error && true}
			{...field}
		/>
	);
}
