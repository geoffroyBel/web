import React from "react";
import {
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
import {
	InputField,
	CheckboxField,
	SelectField,
	RadioGroupField,
} from "./fields";
import CreatePrestationStep from "./CreateFormStep";
import { styled } from "@mui/styles";

export default function CompanySucces(props) {
	const {
		currentItem,
		step,
		formField: { firstName, lastName, email, businessType },
	} = props;

	return (
		<CreatePrestationStep
			{...{ currentItem }}
			{...{ step }}
			title={"Votre company est maintenant prete"}></CreatePrestationStep>
	);
}
