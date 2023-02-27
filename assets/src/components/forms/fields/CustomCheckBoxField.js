import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import {
	Checkbox,
	FormControl,
	FormHelperText,
	FormGroup,
	FormControlLabel,
	Typography,
	Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";

export function CustomCheckBoxField(props) {
	const { custom = true, size = 30, label, ...rest } = props;
	const [field, meta, helper] = useField(props);
	const { setValue } = helper;
	function _onChange(e) {
		setValue(e.target.checked);
		setTouched(true);
	}
	const style = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: size,
		height: size,
		borderRadius: size / 2,
	};
	if (!custom) {
		return (
			<FormControl {...rest}>
				<FormControlLabel
					value={field.value}
					checked={field.value}
					control={<Checkbox {...field} onChange={_onChange} />}
					label={label}
				/>
				{/* {_renderHelperText()} */}
			</FormControl>
		);
	}
	return (
		<Checkbox
			{...field}
			sx={{ padding: 0, margin: 0 }}
			value={field.value}
			checked={field.value}
			onChange={_onChange}
			icon={
				<Box
					sx={{
						...style,
						bgcolor: "primary.ultraLight",
					}}>
					<Typography variant={"captionBold"}>{label}</Typography>
				</Box>
			}
			checkedIcon={
				<Box
					sx={{
						...style,
						bgcolor: "secondary.main",
					}}>
					<Typography variant={"captionBold"} color='text.light'>
						{label}
					</Typography>
				</Box>
			}
		/>
	);
}

export default function CheckboxGroupField(props) {
	const { name, options } = props;
	return (
		<FormControl component='fieldset' fullWidth>
			{/* <FormLabel component='legend'>Tarifs</FormLabel> */}
			<FormGroup
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				{options.map((label, index) => (
					<CustomCheckBoxField
						{...{ index }}
						name={`${name}[${index}]`}
						key={index}
						label={label}
					/>
					// <Field
					// 	type='checkbox'
					// 	component={CheckboxField}
					// 	name='numbers'
					// 	key={opt.value}
					// 	value={opt.value}
					// 	label={opt.label}
					// />
				))}
			</FormGroup>
		</FormControl>
	);
}
