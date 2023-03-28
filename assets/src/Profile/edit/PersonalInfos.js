import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import React from "react";
import styled from "@emotion/styled";
import RadioGroup from "../ui/RadioGroup";
import TextField from "../../Authentication/components/form/TextField";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/system/Stack";
const Form = styled("form")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	[theme.breakpoints.up("md")]: {
		width: "70%",
	},
}));
const PersonalInfos = () => {
	return (
		<Box
			sx={{
				padding: "0 2rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<Formik>
				{() => (
					<Form>
						<Stack spacing={1}>
							<Typography
								variant='body'
								color={"text.primary"}>
								Account Informations
							</Typography>
							<TextField
								margin='dense'
								fullWidth
								lefticon={<EmailIcon color='primary' />}
								rightIconName={"check"}
								placeholder='Enter your Email'
								label='User name'
								type='text'
								id='username'
								name='username'
							/>
							<TextField
								margin='dense'
								lefticon={<EmailIcon color='primary' />}
								rightIconName={"check"}
								placeholder='Enter your Password'
								label='Email'
								required={true}
								fullWidth={true}
								name='email'
								type='text'
								id='email'
								autoComplete='Email'
							/>
							<TextField
								margin='dense'
								lefticon={<EmailIcon color='primary' />}
								rightIconName={"check"}
								placeholder='Enter your Password'
								label='Password'
								required={true}
								fullWidth={true}
								name='password'
								type='password'
								id='password'
								autoComplete='new password'
							/>
							<Box m={2} />
							<RadioGroup
								name='gender'
								label='gender'
								options={["Male", "female"]}
							/>
						</Stack>

						<Button
							sx={{ margin: "2.5rem auto" }}
							variant='contained'>
							Save change
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default PersonalInfos;
