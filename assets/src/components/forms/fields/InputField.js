import React, { useState } from "react";
import { at } from "lodash";
import { useField } from "formik";
import {
	TextField,
	Grid,
	Typography,
	Box,
	Paper,
	InputBase,
	InputLabel,
	FormControl,
	FormHelperText,
	FormLabel,
	Divider,
	Button,
} from "@mui/material";
import { styled } from "@mui/styles";

const SectionRow = styled(FormControl)({
	"&.MuiFormControl-root": {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
});
const SectionRowContainer = styled("div")(({ theme }) => ({
	//	padding: "10px 0px",
	width: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
	//alignItems: "center",
}));
const Input = styled(InputBase)(({ theme, width }) => ({
	//flex: 2,
	margin: theme.spacing(1, 0),
	padding: theme.spacing(1),
	"&.MuiInputBase-root": {
		width: width ? width : "100%",
		...theme.typography.h5,
		borderRadius: 2,
		borderColor: theme.palette.text.gray,
		backgroundColor: theme.palette.secondary.light,
		transition: "all .5s ease",
		WebkitTransition: "all .5s ease",
		MozTransition: "all .5s ease",
		"&.Mui-focused, &:hover": {
			border: "1px solid rgba(0, 0, 0, 0.05)",
			borderColor: theme.palette.secondary.main,
			//color: theme.palette.common.white,
			//fontWeight: "bold",
		},
	},
}));
const Label = styled(FormLabel)(({ theme, fontWeight = 600 }) => {
	return {
		//flex: 1,
		textAlign: "left",
		//...theme.typography.h7,
		textTransform: "capitalize",
		margin: theme.spacing(0),
		//fontWeight: 900,
		//fontSize: 18,
		"&.MuiFormLabel-root": {
			fontWeight: "Bold",
			color: theme.palette.text.secondary,

			"&.Mui-focused": {
				color: theme.palette.text.primary,
			},
		},
	};
});
const HelperTest = styled(FormHelperText)(({ theme }) => {
	return {
		//flex: 1,
		textAlign: "left",
		...theme.typography.h7,
		textTransform: "capitalize",
		margin: theme.spacing(0),
		fontWeight: 600,
		//fontSize: 18,
		"&.MuiFormHelperText-root": {
			fontStyle: "italic",
			color: theme.palette.secondary.main,
			margin: theme.spacing(0, 0),
			// "&.Mui-focused": {
			// 	color: theme.palette.text.gray,
			// },
		},
	};
});
export const CustomInputField = (props) => {
	const { fullWidth = false, label, helpertext = null, width } = props;
	const { InputProps, errorText, ...rest } = props;
	const [field, meta, helper] = useField(props);
	const [value, setValue] = useState("");
	function renderHelperText() {
		const [touched, error] = at(meta, "touched", "error");
		let message;
		if (touched && error) {
			message = error;
		} else if (helpertext) {
			message = helpertext;
		}
		return <HelperTest id='my-helper-text'>{message}</HelperTest>;
	}
	const onChange = (e) => {
		setValue(e.target.value);
		helper.setValue(e.target.value);
	};
	return (
		<SectionRow {...props}>
			<SectionRowContainer>
				<Label required>{label}</Label>
				<Input
					id='my-input'
					aria-describedby='my-helper-text'
					margin='dense'
					width={width}
					{...{ value }}
					{...{ onChange }}
				/>
			</SectionRowContainer>
			{/* 
							<FormHelperText id='my-helper-text'>
								We'll never share your email.
							</FormHelperText> */}
		</SectionRow>
	);
};
export default function InputField(props) {
	const { InputProps, errorText, ...rest } = props;
	const [field, meta] = useField(props);

	function _renderHelperText() {
		const [touched, error] = at(meta, "touched", "error");
		if (touched && error) {
			return error;
		}
	}

	return (
		<TextField
			type='text'
			error={meta.touched && meta.error && true}
			helperText={_renderHelperText()}
			{...field}
			{...rest}
		/>
	);
}
