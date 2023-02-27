import React, { useState, useEffect } from "react";
import { useField } from "formik";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDayjs";
import TimePicker from "@mui/lab/TimePicker";
import { Grid, TextField, FormControl, FormLabel } from "@mui/material";
export default function TimePickerField(props) {
	const [field, meta, helper] = useField(props);
	const { touched, error } = meta;
	const { setValue } = helper;
	const isError = touched && error && true;
	const { value } = field;
	const [selectedDate, setSelectedDate] = useState(null);

	useEffect(() => {
		if (value) {
			const date = new Date(value);
			setSelectedDate(date);
		}
	}, [value]);

	function handleChange(date) {
		if (date) {
			setSelectedDate(date);
			try {
				const ISODateString = date.toISOString();
				setValue(ISODateString);
			} catch (error) {
				setValue(date);
			}
		} else {
			setValue(date);
		}
	}

	return (
		<LocalizationProvider dateAdapter={DateAdapter}>
			<TimePicker
				label='start'
				value={value}
				onChange={handleChange}
				renderInput={(params) => (
					<TextField fullWidth variant='filled' {...params} />
				)}
			/>
		</LocalizationProvider>
	);
}
