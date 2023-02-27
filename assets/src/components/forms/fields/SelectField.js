import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";
import {
	InputLabel,
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	Box,
} from "@mui/material";

function SelectField(props) {
	const { label, data, ...rest } = props;
	const [field, meta] = useField(props);
	const { value: selectedValue } = field;
	const [touched, error] = at(meta, "touched", "error");
	const isError = touched && error && true; //touched &&
	function _renderHelperText() {
		if (isError) {
			return <FormHelperText>{error}</FormHelperText>;
		}
	}
	const [age, setAge] = React.useState("");

	const handleBlur = useCallback(() => {
		// console.log("---------META-------------");
		// console.log(isError);
		// console.log(touched);
	}, [error, touched]);
	const handleChange = (event) => {
		setAge(event.target.value);
	};
	const handleClick = () => {
		console.log("CLICK");
		if (props.onClick) {
			console.log("FX");
			props.onClick();
		}
	};
	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl {...rest} error={isError} fullWidth onBlur={handleBlur}>
				<InputLabel>{label}</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					{...field}
					onClick={handleClick}
					value={selectedValue ? selectedValue : ""}
					label={label}>
					{data.map((item, index) => (
						<MenuItem key={index} value={item.value}>
							{item.label}
						</MenuItem>
					))}
				</Select>
				{_renderHelperText()}
			</FormControl>
		</Box>
	);
	return (
		<FormControl {...rest} error={isError}>
			<InputLabel>{label}</InputLabel>
			<Select {...field} value={selectedValue ? selectedValue : ""}>
				{data.map((item, index) => (
					<MenuItem key={index} value={item.value}>
						{item.label}
					</MenuItem>
				))}
			</Select>
			{_renderHelperText()}
		</FormControl>
	);
}

SelectField.defaultProps = {
	data: [],
};

SelectField.propTypes = {
	data: PropTypes.array.isRequired,
};

export default SelectField;
