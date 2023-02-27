import * as React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { at } from "lodash";

export default function InputWithIcon(props) {
	const { lefticon: leftIcon, rightIconName, ...rest } = props;
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
				return <TaskAltIcon {...iconProps} {...{ color }} />;
			default:
				return null;
		}
	};
	return (
		<TextField
			{...rest}
			InputProps={{
				startAdornment: leftIcon && (
					<InputAdornment position='start'>{leftIcon}</InputAdornment>
				),
				endAdornment: rightIconName && (
					<InputAdornment position='end'>
						{getIconFromName("check")}
					</InputAdornment>
				),
			}}
			variant='outlined'
			error={meta.touched && meta.error && true}
			{...field}
		/>
	);
}
// export default function InputField(props) {
// 	const { InputProps, errorText, ...rest } = props;
// 	const [field, meta] = useField(props);

// 	function _renderHelperText() {
// 		const [touched, error] = at(meta, "touched", "error");
// 		if (touched && error) {
// 			return error;
// 		}
// 	}

// 	return (
// 		<TextField
// 			type='text'
// 			error={meta.touched && meta.error && true}
// 			helperText={_renderHelperText()}
// 			{...field}
// 			{...rest}
// 		/>
// 	);
// }
// Tableau notes [12] Numerique
// j <-- 0
// Tanque que j < 12
//  Ecrire "enregistrer ta note"
//  Lire note
//  notes[j] = note
//  note
// somme <--
// Pour index de 0 a 11
// 	somme <-- somme + notes[i]
// Fin Pour
// Ecrire (some / 12)
// dix <-- 0
// cinq<-- 0
// pieces<--0

// rendu <-- monaie
// Tant que rendu > 0
// 	Si rendu - 10 > 0
// 		dix <-- dix + 1
// 	Fin si
// 	rendu <- rendu - 10
// Fin Tant Que

// rendu <-- monaie - dix * 10
// Tant que rendu > 0
// 	 Si rendu - 5 > 0
// 		 cinq <-- cinq + 1
// 	 Fin si
//   rendu <- rendu - 5
// Fin Tan que

// rendu <-- monaie - (dix * 10) - (cinq * 5)
// Tant que rendu > 0
// 	 Si rendu - 1 > 0
// 		 pieces <-- pieces + 1
// 	 Fin si
//   rendu <- rendu - 1
// Fin Tan que

// Ecrire dix "billets de 10, " cinq "billets de 5, " pieces "pieces"
