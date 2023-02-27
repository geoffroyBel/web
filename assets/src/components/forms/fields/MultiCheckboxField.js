import React, { useEffect } from "react";
import { at } from "lodash";
import { useField, Field, useFormikContext } from "formik";
import {
	Checkbox,
	FormControl,
	FormHelperText,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Box,
	Typography,
	Grid,
} from "@mui/material";
import CheckboxField from "./CheckboxField";
import InputField from "./InputField";
import SliderField from "./SliderField";
import { display, minWidth } from "@mui/system";
import { withStyles } from "@mui/styles";

export const StyledFormControlLabel = withStyles({
	root: {
		display: "flex",
		flexDirection: "row",
	},
	label: {
		flex: 1,

		textTransform: "capitalize",
	},
})(FormControlLabel);
const options = [
	{
		label: "1 seance",
		value: "one",
	},
	{
		label: "5 seances",
		value: "two",
	},
	{
		label: "10 seances",
		value: "three",
	},
];
export const SimpleCheckboxField = (props) => {
	const { index, label, name, ...rest } = props;
	const { values, touched, setFieldValue } = useFormikContext();
	const [field, meta, helper] = useField(props);
	const { setValue, setTouched } = helper;

	function _renderHelperText() {
		const [touched, error] = at(meta, "touched", "error");
		if (touched && error) {
			return <FormHelperText>{error}</FormHelperText>;
		}
	}
	// useEffect(() => {
	// 	console.log("FIELD VALUE _________simplecheckbox");
	// 	console.log(values);
	// 	console.log(field.value);
	// }, [field.value, values]);
	function _onChange(e) {
		if (props.selectall) {
			values.prices.forEach((el, key) =>
				setFieldValue(`prices[${key}]`, {
					...el,
					checked: e.target.checked,
				})
			);
		}
		console.log("ONCHANGE -----------");
		console.log(values);
		console.log(field.value);
		setValue({ ...field.value, checked: e.target.checked });
		setTouched(true);
	}

	return (
		<FormControl {...rest}>
			<StyledFormControlLabel
				value={field.value}
				checked={(field.value && field.value.checked) || false}
				control={<Checkbox {...field} onChange={_onChange} />}
				label=''
			/>
		</FormControl>
	);
};
const MyCheckboxField = (props) => {
	const { index, label, name, ...rest } = props;
	const {
		values: {
			price: [tarif],
		},
		touched,
		setFieldValue,
	} = useFormikContext();
	const [field, meta, helper] = useField(props);
	const { setValue, setTouched } = helper;

	//useEffect(() => {
	// set the value of textC, based on textA and textB
	// if (
	//   textA.trim() !== '' &&
	//   textB.trim() !== '' &&
	//   touched.textA &&
	//   touched.textB
	// ) {
	//   setFieldValue(props.name, `textA: ${textA}, textB: ${textB}`);
	// }
	// console.log("---------ALLLLLLO");
	// console.log(tarif);
	// console.log(touched);
	//}, [tarif.price, touched]);
	//textB, textA, touched.textA, touched.textB, setFieldValue, props.name

	function _renderHelperText() {
		const [touched, error] = at(meta, "touched", "error");
		if (touched && error) {
			return <FormHelperText>{error}</FormHelperText>;
		}
	}

	function _onChange(e) {
		setValue({ ...field.value, checked: e.target.checked });
		setTouched(true);
	}
	const calcRemise = (remise, quantity, price) => {
		return (price - (remise / 100) * price) * quantity;
	};

	return (
		<FormControl {...rest} style={{ display: "flex" }}>
			<StyledFormControlLabel
				value={field.value.checked}
				checked={field.value.checked}
				control={<Checkbox {...field} onChange={_onChange} />}
				label={
					<Box
						sx={{
							position: "relative",
							display: "flex",
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
						}}>
						<Typography variant='subtitle2' mr={1}>
							{field.value.name}{" "}
						</Typography>

						<Box
							sx={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Typography variant='body2' color={"secondary.dark"}>
								{field.value.quantity} * {tarif.price} euros
							</Typography>
						</Box>
					</Box>
				}
			/>
			{field.value.checked && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						padding: 5,
					}}>
					{index > 0 ? (
						<>
							<Box
								mb={1}
								sx={{
									alignSelf: "stretch",
									borderBlockColor: "red",
									paddingRight: 10,
									paddingLeft: 10,
								}}>
								<SliderField
									marks={[
										{
											value: 0,
											label: "0",
										},
										{
											value: 30,
											label: "30",
										},
									]}
									valuelabeldisplay='off'
									min={0}
									max={30}
									name={`${name}.remise`}
									label={"price"}
									autoComplete={"price"}
									autoFocus
								/>
							</Box>
							<Grid
								container
								spacing={3}
								sx={{
									justifyContent: "center",
								}}>
								<Grid item xs={12} sm={6}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: 200,
											borderRadius: 2,
											padding: 3,
											border: 2,
											borderColor: "primary.light",
											fontWeight: 400,
										}}>
										<Typography variant='h6'>{field.value.remise} %</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: 200,
											height: 80,
											borderRadius: 2,
											padding: 3,
											border: 2,
											borderColor: "primary.light",
											fontWeight: 400,
										}}>
										<Typography variant='h6'>
											{calcRemise(
												field.value.remise,
												field.value.quantity,
												tarif.price
											)}
											{" Euros"}
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</>
					) : (
						<>
							<Box
								mb={1}
								sx={{
									alignSelf: "stretch",
									borderBlockColor: "red",
									paddingRight: 10,
									paddingLeft: 10,
								}}>
								<SliderField
									marks={[
										{
											value: 20,
											label: "20",
										},
										{
											value: 100,
											label: "100",
										},
									]}
									valuelabeldisplay='off'
									min={20}
									max={100}
									name={`${name}.price`}
									label={"price"}
									autoComplete={"price"}
									autoFocus
								/>
							</Box>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 200,
									borderRadius: 2,
									padding: 3,
									border: 2,
									borderColor: "primary.light",
									fontWeight: 400,
								}}>
								<Typography variant='h6'>{field.value.price} Euros</Typography>
							</Box>
						</>
					)}
				</Box>
			)}
			{_renderHelperText()}
		</FormControl>
	);
};
export default function MultiCheckboxField(props) {
	// const { label, ...rest } = props;
	// const [field, meta, helper] = useField(props);
	// const { setValue } = helper;

	// function _renderHelperText() {
	// 	const [touched, error] = at(meta, "touched", "error");
	// 	if (touched && error) {
	// 		return <FormHelperText>{error}</FormHelperText>;
	// 	}
	// }

	// function _onChange(e) {
	// 	setValue(e.target.checked);
	// }

	return (
		<FormControl component='fieldset' fullWidth>
			{/* <FormLabel component='legend'>Tarifs</FormLabel> */}
			<FormGroup>
				{options.map((opt, index) => (
					<MyCheckboxField
						{...{ index }}
						name={`price[${index}]`}
						key={opt.value}
						value={opt.value}
						label={opt.label}
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
