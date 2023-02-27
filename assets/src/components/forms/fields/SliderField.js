import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField, Box, Slider, FormControl, InputLabel } from "@mui/material";

export default function SliderField(props) {
	const { min, max, label, errorText, ...rest } = props;
	const [field, meta, helper] = useField(props);
	const { setTouched } = helper;
	const [touched, error] = at(meta, "touched", "error");
	const isError = touched && error && true;
	const [value, setValue] = React.useState(37);

	function _renderHelperText() {
		if (isError) {
			return <FormHelperText>{error}</FormHelperText>;
		}
	}
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<FormControl {...rest} error={true} fullWidth>
			<Slider
				getAriaLabel={() => "Temperature range"}
				{...field}
				{...rest}
				min={min}
				max={max}
				onChange={(event, newValue) => {
					setTouched(true);
					field.onChange(event);
				}}
				aria-label='Default'
				getAriaValueText={(value) => `${value}`}
				step={1}
				defaultValue={1}
			/>
			{_renderHelperText()}
		</FormControl>
	);

	return (
		<TextField
			type='text'
			error={meta.touched && meta.error && true}
			helperText={_renderHelperText()}
			multiline
			rows={4}
			{...field}
			{...rest}
		/>
	);
}
