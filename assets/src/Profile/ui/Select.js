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
	OutlinedInput,
} from "@mui/material";

import styled from "@emotion/styled";
import ChevronIcon from "../assets/ChevronIcon";
import { useTheme } from "@emotion/react";

const MySelect = styled(Select)(({ theme }) => ({
	//backgroundColor: "white",
	...theme.typography.title,
	color: theme.palette.text.secondary,
	borderColor: "white",
	// "& .MuiSvgIcon-root": {
	// 	//marginRight: "10px",
	// 	top: "50%",
	// 	transform: "translateY(-50%)",
	// 	height: 40,
	// 	width: 40,
	// 	color: "white",
	// 	borderRadius: "50%",
	// 	backgroundColor: theme.palette.primary.main,
	// },
}));
export default (props) => {
	const theme = useTheme();
	const { label, data, ...rest } = props;
	const [field, meta] = useField(props);
	const { value: selectedValue } = field;
	const [touched, error, initialTouched] = at(
		meta,
		"touched",
		"error",
		"initialTouched"
	);
	const isError = touched || (error && true); //touched &&
	function _renderHelperText() {
		if (isError) {
			return <FormHelperText>{error}</FormHelperText>;
		}
	}
	// console.log(field);
	const [age, setAge] = React.useState("");
	// useEffect(() => {
	// 	console.log(isError);
	// 	console.log(touched);
	// 	console.log(initialTouched);
	// }, [error, touched]);
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
		// if (props.onClick) {
		// 	console.log("FX");
		// 	//props.onClick();
		// }
	};
	return (
		<Box>
			<FormControl
				// variant='standard'
				{...rest}
				error={(!touched && initialTouched) || error}
				fullWidth
				onBlur={handleBlur}>
				<InputLabel>
					{(!touched && initialTouched) || error || label}
				</InputLabel>
				<MySelect
					color='primary'
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					sx={{
						color: "white",
						".MuiOutlinedInput-notchedOutline": {
							borderColor: theme.palette.primary.main,
						},
					}}
					IconComponent={() => (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								padding: "0 10px 0 0",
							}}>
							<ChevronIcon
								color={
									error ? theme.palette.error.main : theme.palette.primary.main
								}
							/>
						</div>
					)}
					{...field}
					onClick={handleClick}
					value={selectedValue ? selectedValue : ""}
					label={label}>
					{data.map((item, index) => (
						<MenuItem
							key={index}
							value={item.value}>
							{item.label}
						</MenuItem>
					))}
				</MySelect>
				{/* {_renderHelperText()} */}
			</FormControl>
		</Box>
	);
	return (
		<FormControl
			{...rest}
			error={isError}>
			<InputLabel>{label}</InputLabel>
			<Select
				{...field}
				value={selectedValue ? selectedValue : ""}>
				{data.map((item, index) => (
					<MenuItem
						key={index}
						value={item.value}>
						{item.label}
					</MenuItem>
				))}
			</Select>
			{_renderHelperText()}
		</FormControl>
	);
};

// SelectField.defaultProps = {
// 	data: [],
// };

// SelectField.propTypes = {
// 	data: PropTypes.array.isRequired,
// };
