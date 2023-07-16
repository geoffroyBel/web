import React, { useEffect, useImperativeHandle, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useField, Field, FieldArray, useFormikContext } from "formik";
// import TextField from "./TextField";
// import Select from "./Select";
import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import LinkButton from "../components/LinkButton";
import * as actionTarifs from "../../store/actions/tarif";
import { useDispatch, useSelector } from "react-redux";
import BaseDialog from "../components/BaseDialog";
const _FORFAIT = 1;
const _MENSUEL = 2;
const _ANNUEL = 3;
const VerticalDivider = styled(Box)({
	margin: "0 10px",
	width: "1px",
	height: 40,
	bgcolor: "primary.light",
});
const InputContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(0, 1),
}));
const RadioGroupComponent = ({ label, options, ...props }) => {
	const [field, meta, helpers] = useField(props.name);
	const [type, setType] = useState(field.value);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [open, setOpen] = useState(false);
	const [credits, setCredits] = useState(1);
	const [recurring, setRecurring] = useState(1);
	const prestationId = useSelector(
		({ prestations }) => prestations.prestationId
	);
	const dispatch = useDispatch();

	const handleChange = (event) => {
		console.log(event.target.value);
		//helpers.setValue(event.target.value);
		// alert(event.target.value);
		setType(event.target.value);
	};
	const handleCreate = () => {
		setOpen(false);

		dispatch(
			actionTarifs.createTarif(
				{ prestationId, type, amount, recurring, credits, name },
				() =>
					helpers.setValue([
						...field.value,
						{ type, amount, recurring, credits, name },
					])
			)
		);
	};
	// useImperativeHandle(ref, () => ({
	// 	add: () => {
	// 		helpers.setValue([...field.value, { type, amount, recurring }]);
	// 	},
	// }));
	const add = () => {
		helpers.setValue([...field.value, { type, amount, recurring }]);
	};
	useEffect(() => {
		console.log("-------RADIOGROUP FIELD VALUE");
		console.log(field);
		console.log(field.value);
		console.log(options);
	}, [field.value]);
	const renderInput = (option) => {
		console.log(" RENDER INPU ---------------------");
		console.log(type);
		switch (true) {
			case Number(type) === _FORFAIT && option.value === _FORFAIT:
				return (
					<>
						<Box
							sx={{
								flex: 1,
								padding: "0 10",
								textAlign: "center",
							}}>
							<Typography
								sx={(theme) => ({
									color: theme.palette.primary.main,
									textAlign: "center",
								})}
								variant='body'>
								1 entrée
							</Typography>
						</Box>
						<TextField
							name={`amount`}
							label='Prix en euros'
							value={amount}
							onChange={(event) => setAmount(event.target.value)}
						/>
					</>
				);
			case Number(type) === _MENSUEL && option.value === _MENSUEL:
				return (
					<>
						<TextField
							name={`credits`}
							label='Entrees'
							value={credits}
							onChange={(event) => setCredits(event.target.value)}
						/>
						<VerticalDivider />
						<TextField
							name={`amount`}
							label='Prix en euros'
							value={amount}
							onChange={(event) => setAmount(event.target.value)}
						/>
					</>
				);
			case Number(type) === _ANNUEL && option.value === _ANNUEL:
				return (
					<>
						{/* <Select
							sx={{ flex: 1 }}
							name='souscription'
							label='Souscription'
							data={[
								{ label: "Annuel", value: 1 },
								{ label: "Mensuel", value: 2 },
							]}
						/> */}
						<FormControl>
							<InputLabel id='demo-simple-select-label'>Reccurence</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={recurring}
								label='Recurrence'
								onChange={(event) => {
									setRecurring(event.target.value);
								}}>
								<MenuItem value={1}>Mensuel</MenuItem>
								<MenuItem value={2}>Annuel</MenuItem>
							</Select>
						</FormControl>
						<VerticalDivider />
						<TextField
							name={`amount`}
							label='Prix en euros'
							value={amount}
							onChange={(event) => setAmount(event.target.value)}
						/>
					</>
				);
		}
	};
	return (
		<>
			<BaseDialog
				label={"Creation du tarif"}
				{...{ open }}
				{...{ setOpen }}
				completion={handleCreate}
			/>

			<FieldArray
				name='tarifs'
				render={(arrayHelpers) => (
					<div>
						<Stack spacing={2}>
							<TextField
								name={`name`}
								label='Nom du tarif'
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
							<RadioGroup
								aria-labelledby='demo-radio-buttons-group-label'
								name='radio-buttons-group'
								onChange={handleChange}>
								{options.map((option) => (
									<>
										<FormControlLabel
											key={option.value}
											value={option.value}
											control={<Radio />}
											label={option.label}
										/>
										<InputContainer>{renderInput(option)}</InputContainer>
									</>
								))}
							</RadioGroup>

							<LinkButton
								label='Enregistrer tarif'
								onClick={() => {
									setOpen(true);
								}}
							/>
						</Stack>

						{/* <button
						type='button'
						onClick={() => {
							//add();
							arrayHelpers.push({ type, amount, recurring });
						}}>
						+
					</button> */}
						{field.value.map((friend, index) => (
							<div key={index}>
								{/** both these conventions do the same */}
								<Field
									type='hidden'
									name={`tarifs[${index}].type`}
								/>
								<Field
									type='hidden'
									name={`tarifs.${index}.amount`}
								/>
								<Field
									type='hidden'
									name={`tarifs.${index}.recurring`}
								/>

								{/* <button
								type='button'
								onClick={() => arrayHelpers.remove(index)}>
								-
							</button> */}
							</div>
						))}
					</div>
				)}
			/>
		</>
	);
	return (
		<div>
			<RadioGroup
				{...field}
				{...props}
				onChange={handleChange}>
				{options.map((option) => (
					<>
						<FormControlLabel
							key={option.value}
							value={option.value}
							control={<Radio />}
							label={option.label}
						/>
						{Number(field.value) === 1 && option.value === 1 && (
							<InputContainer>
								<Box
									sx={{
										flex: 1,
										padding: "0 10",
										textAlign: "center",
									}}>
									<Typography
										sx={(theme) => ({
											color: theme.palette.primary.main,
											textAlign: "center",
										})}
										variant='body'>
										1 entrée
									</Typography>
								</Box>
								<TextField
									name={`${field.name}[amount]`}
									label='Prix en euros '
								/>
							</InputContainer>
						)}
						{Number(field.value) === 2 && option.value === 2 && (
							<InputContainer>
								<TextField
									name={`${field.name}.credits`}
									label='Entrees'
								/>
								<Box
									sx={{
										margin: "0 10px",
										width: "1px",
										height: 40,
										bgcolor: "primary.light",
									}}
								/>

								<TextField
									name={`${field.name}.amount`}
									label='Prix en euros'
								/>
							</InputContainer>
						)}
						{Number(field.value) === 3 && option.value === 3 && (
							<InputContainer>
								<Select
									sx={{ flex: 1 }}
									name='souscription'
									label='Souscription'
									data={[
										{ label: "Annuel", value: 1 },
										{ label: "Mensuel", value: 2 },
									]}
								/>
								<Box
									sx={{
										margin: "0 10px",
										width: "1px",
										height: 40,
										bgcolor: "primary.light",
									}}
								/>

								<TextField
									sx={{ flex: 1 }}
									name={`${field.name}.amount`}
									label='Prix en euros'
								/>
							</InputContainer>
						)}
					</>
				))}
			</RadioGroup>
		</div>
	);
};

export default RadioGroupComponent;
