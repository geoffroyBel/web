import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField, Box, Slider, FormControl, InputLabel } from "@mui/material";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";
function ValueLabelComponent(props) {
	const { children, value } = props;

	return (
		<Tooltip
			enterTouchDelay={0}
			placement='top'
			title={value}>
			{children}
		</Tooltip>
	);
}
const PrettoSlider = styled(Slider)(({ theme }) => ({
	marginTop: 50,
	color: theme.palette.primary.ultraLight,
	height: 8,
	"& .MuiSlider-track": {
		border: "none",
	},
	"& .MuiSlider-thumb": {
		height: 24,
		width: 24,
		backgroundColor: "#fff",
		border: "2px solid currentColor",
		"&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
			boxShadow: "inherit",
		},
		"&:before": {
			display: "none",
		},
	},
	"& .MuiSlider-valueLabel": {
		lineHeight: 1.2,
		fontSize: 12,
		background: "unset",
		padding: 2,
		width: 32,
		height: 32,
		borderRadius: "50% 50% 50% 0",
		backgroundColor: "white",
		...theme.typography.title,
		color: theme.palette.primary.main,
		transformOrigin: "bottom left",
		transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
		"&:before": { display: "none" },
		"&.MuiSlider-valueLabelOpen": {
			transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
		},
		"& > *": {
			transform: "rotate(45deg)",
		},
	},
}));
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
		<FormControl
			error={true}
			fullWidth>
			<PrettoSlider
				color='secondary'
				getAriaLabel={() => "Temperature range"}
				{...field}
				{...rest}
				min={min}
				max={max}
				onChange={(event, newValue) => {
					setTouched(true);
					console.log(event);
					field.onChange(event);
				}}
				aria-label='Default'
				getAriaValueText={(value) => `${value}`}
				step={1}
				valueLabelDisplay='on'
				defaultValue={20}
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
