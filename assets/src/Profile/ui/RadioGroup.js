import React, { useState, useEffect } from "react";
import { at } from "lodash";
import { useField } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/styles";
import { Typography, Box } from "@mui/material";

const Label = styled(FormControlLabel)(({ theme, checked }) => {
	const typograpy = theme.typography.subtitle;
	return {
		margin: theme.spacing(0, 2),
		borderRadius: 25,
		padding: theme.spacing(1, 3),
		backgroundColor: checked
			? theme.palette.primary.light
			: theme.palette.gray.light,

		// "&.MuiFormControlLabel-root": {
		// 	// padding: theme.spacing(1, 3),
		// 	// margin: theme.spacing(0, 0, 0, 0),
		// 	// height: 30,

		// 	color: checked ? theme.palette.text.light : theme.palette.text.primary,
		// 	textTransform: "capitalize",
		// },

		// "&.Mui-focused": {
		// 	color: theme.palette.primary.light,
		// },
		// },
	};
});
const BpIcon = styled("span")(({ theme }) => ({
	borderRadius: "50%",
	width: 20,
	height: 20,
	boxShadow:
		theme.palette.mode === "dark"
			? "0 0 0 1px rgb(16 22 26 / 40%)"
			: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
	backgroundColor: theme.palette.secondary.light,
	// backgroundImage:
	// 	theme.palette.mode === "dark"
	// 		? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
	// 		: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
	// ".Mui-focusVisible &": {
	// 	outline: "5px auto rgba(19,124,189,.6)",
	// 	outlineOffset: 2,
	// },
	"input:hover ~ &": {
		backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
	},
	"input:disabled ~ &": {
		boxShadow: "none",
		background:
			theme.palette.mode === "dark"
				? "rgba(57,75,89,.5)"
				: "rgba(206,217,224,.5)",
	},
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
	backgroundColor: theme.palette.secondary.main,
	backgroundImage:
		"linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
	"&:before": {
		display: "block",
		width: 20,
		height: 20,
		backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
		content: '""',
	},
	"input:hover ~ &": {
		backgroundColor: theme.palette.secondary.main,
	},
}));
function BpRadio(props) {
	return (
		<Radio
			sx={{
				display: "none",
				"&:hover": {
					bgcolor: "transparent",
				},
				"& .MuiSvgIcon-root": {
					fontSize: 10,
				},
			}}
			disableRipple
			color='default'
			checkedIcon={<BpCheckedIcon />}
			icon={<BpIcon />}
			{...props}
		/>
	);
}
// export function TarifRadioGroupField(props) {
// 	const { label, options = ["individual", "company"], ...rest } = props;
// 	const [field, meta, helper] = useField(props);
// 	//const { setValue } = helper;
// 	const [value, setValue] = useState("Individuel");

// 	useEffect(() => {
// 		if (field.value?.type) {
// 			setValue(field.value?.type);
// 		} else {
// 			helper.setValue({ ...field.value, type: value });
// 		}
// 	}, [field.value]);
// 	function _renderHelperText() {
// 		const [touched, error] = at(meta, "touched", "error");
// 		if (touched && error) {
// 			return <FormHelperText>{error}</FormHelperText>;
// 		}
// 	}

// 	// function _onChange(e) {
// 	// 	setValue(e.target.checked);
// 	// }
// 	function onChange(e) {
// 		helper.setValue({ ...field.value, type: e.target.value });
// 	}
// 	return (
// 		// <FormControl {...rest}>
// 		// 	<FormControlLabel
// 		// 		value={field.checked}
// 		// 		checked={field.checked}
// 		// 		control={<Checkbox {...field} onChange={_onChange} />}
// 		// 		label={label}
// 		// 	/>
// 		// 	{_renderHelperText()}
// 		// </FormControl>
// 		<FormControl sx={{ width: "100%" }}>
// 			<RadioGroup
// 				sx={{}}
// 				aria-labelledby='demo-radio-buttons-group-label'
// 				//defaultValue={"Individuel"}
// 				{...{ onChange }}
// 				{...{ value }}
// 				name={field.name}>
// 				{options.map((opt) => {
// 					return (
// 						<Box key={opt}>
// 							<Label
// 								labelPlacement='end'
// 								key={opt}
// 								value={opt}
// 								control={<BpRadio />}
// 								// control={
// 								// 	<Radio
// 								// 		sx={{
// 								// 			"& .MuiSvgIcon-root": {
// 								// 				fontSize: 17,
// 								// 			},
// 								// 		}}
// 								// 		size='medium'
// 								// 		checked={field.value === opt ? true : false}
// 								// 		onChange={_onChange}
// 								// 	/>
// 								// }
// 								label={
// 									<Typography color='textSecondary' variant='subtitle3'>
// 										{opt}
// 									</Typography>
// 								}
// 							/>
// 							{value === opt && (
// 								<Box sx={{ paddingLeft: 4 }}>
// 									{value !== "Individuel" && (
// 										<CustomInputField
// 											name={`${field.name}['credits']`}
// 											width={150}
// 											label='Nombres de credits pour ce tarif'
// 										/>
// 									)}

// 									<CustomInputField
// 										name={`${field.name}['tarif']`}
// 										width={150}
// 										label='Tarif'
// 									/>
// 								</Box>
// 							)}
// 						</Box>
// 					);
// 				})}
// 			</RadioGroup>
// 		</FormControl>
// 	);
// }
export default (props) => {
	const {
		onClick = () => console.log("click"),
		label,
		options = ["individual", "company"],
		...rest
	} = props;
	const [field, meta, helper] = useField(props);
	//const { setValue } = helper;
	const [value, setValue] = useState("company");
	console.log(field);
	useEffect(() => {
		if (field.value?.type) {
			setValue(field.value?.type);
		}
	}, [field.value]);
	function _renderHelperText() {
		const [touched, error] = at(meta, "touched", "error");
		if (touched && error) {
			return <FormHelperText>{error}</FormHelperText>;
		}
	}

	function onChange(e) {
		console.log("euhhhhh");
		console.log(e.target.value);
		onClick(e.target.value);
		setValue(e.target.value);
	}

	return (
		<FormControl
			sx={{
				width: "100%",
				paddingLeft: 1,
				paddingRight: 1,
			}}>
			<RadioGroup
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
				aria-labelledby='demo-radio-buttons-group-label'
				//defaultValue={"Individuel"}

				{...{ onChange }}
				{...{ value }}
				name={field.name}>
				{options.map((opt) => {
					return (
						<Box key={opt}>
							<Label
								checked={value === opt ? true : false}
								sx={{ color: "primary.main" }}
								labelPlacement='end'
								key={opt}
								value={opt}
								control={<BpRadio />}
								// control={
								// 	<Radio
								// 		sx={{
								// 			"& .MuiSvgIcon-root": {
								// 				fontSize: 17,
								// 			},
								// 		}}
								// 		size='medium'
								// 		checked={field.value}
								// 		onChange={onChange}
								// 	/>
								// }
								label={
									<Typography
										variant='subtitle'
										fontSize={15}
										color={value === opt ? "text.light" : "text.primary"}>
										{opt}
									</Typography>
								}
							/>
						</Box>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
};
