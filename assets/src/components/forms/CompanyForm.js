import React, { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import {
	InputField,
	CheckboxField,
	SelectField,
	RadioGroupField,
} from "./fields";
import CreatePrestationStep from "./CreateFormStep";
import { styled } from "@mui/styles";
import { fontSize } from "@mui/system";

const Section = styled(Paper)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	display: "flex",
	flexDirection: "column",
	width: "100%",
}));
const SectionRow = styled(FormControl)({
	"&.MuiFormControl-root": {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
});
const SectionRowContainer = styled("div")({
	padding: "10px 0px",
	width: "100%",
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
});
const Input = styled(InputBase)(({ theme }) => ({
	flex: 2,
	"&.MuiInputBase-root": {
		...theme.typography.h5,
	},
}));

const Label = styled(FormLabel)(({ theme }) => {
	console.log(theme);
	return {
		flex: 1,
		textAlign: "right",
		...theme.typography.h6,
		textTransform: "capitalize",
		margin: "0px 20px",
		fontWeight: 600,
		fontSize: 18,
		"&.MuiFormLabel-root": {
			color: theme.palette.text.gray,
			"&.Mui-focused": {
				color: theme.palette.text.gray,
			},
		},
	};
});
const SectionLabel = styled(Typography)({});

export default function CompanyForm(props) {
	const {
		currentItem,
		step,
		formField: { firstName, lastName, email, businessType },
	} = props;
	const [businessTypeVisible, setBusinessTypeVisible] = useState("company");

	return (
		<CreatePrestationStep
			{...{ currentItem }}
			{...{ step }}
			title={"Creer votre compagnie"}>
			<Grid
				container
				spacing={3}
				sx={{
					width: "100%",
					//justifyContent: "center",
					margin: 0,
					padding: 0,
				}}>
				<Grid item xs={12} sm={12}>
					<SectionLabel mb={2} variant='h6'>
						Business type
					</SectionLabel>
					<RadioGroupField
						name={businessType.name}
						label={businessType.label}
						onClick={setBusinessTypeVisible}
					/>
				</Grid>
				<AnimatePresence exitBeforeEnter>
					{businessTypeVisible === "individual" && (
						<Grid
							component={motion.div}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key='individual'
							item
							xs={12}
							sm={12}>
							<SectionLabel mb={2} variant='h6'>
								PERSONAL INFORMATION
							</SectionLabel>
							<Section elevation={2}>
								<SectionRow>
									<SectionRowContainer>
										<Label required>hellllo ggggg</Label>
										<Input
											placeholder='Hello'
											id='my-input'
											aria-describedby='my-helper-text'
										/>
									</SectionRowContainer>
									{/* 
							<FormHelperText id='my-helper-text'>
								We'll never share your email.
							</FormHelperText> */}
								</SectionRow>
								<Divider />
								<SectionRow>
									<SectionRowContainer>
										<Label required>hellllo ggggg</Label>
										<Input
											placeholder='Hello'
											id='my-input'
											aria-describedby='my-helper-text'
										/>
									</SectionRowContainer>
								</SectionRow>
							</Section>
						</Grid>
					)}
					{businessTypeVisible === "company" && (
						<Grid
							component={motion.div}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key='company'
							item
							xs={12}
							sm={12}>
							<SectionLabel mb={2} variant='h6'>
								COMPAGNIE INFORMATION
							</SectionLabel>
							<Section elevation={2}>
								<SectionRow>
									<SectionRowContainer>
										<Label required>hellllo ggggg</Label>
										<Input
											placeholder='Hello'
											id='my-input'
											aria-describedby='my-helper-text'
										/>
									</SectionRowContainer>
									{/* 
							<FormHelperText id='my-helper-text'>
								We'll never share your email.
							</FormHelperText> */}
								</SectionRow>
								<Divider />
							</Section>
						</Grid>
					)}
				</AnimatePresence>

				<Grid item xs={12} sm={12}>
					<SectionLabel mb={2} variant='h6'>
						PAYMENT INFORMATION
					</SectionLabel>
					<Section
						sx={{
							padding: 4,
						}}
						variant='outlined'
						elevation={2}>
						<Typography sx={{ color: "text.gray" }} variant='captionBold'>
							We use Stripe to make sure you get paid on time and to keep your
							personal bank and details secure. Click Save and continue to set
							up your payments on Stripe.
						</Typography>
					</Section>
				</Grid>
				<Grid item xs={12} sm={12}></Grid>
			</Grid>
		</CreatePrestationStep>
	);
}
