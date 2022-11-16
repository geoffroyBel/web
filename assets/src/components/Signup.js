import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form, useField } from "formik";

import * as Yup from "yup";
import { minWidth } from "@mui/system";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
const containerVariants = {
	hidden: {
		x: "-100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	exit: {
		x: 0,
		opacity: 0,
		transition: {
			delay: 0.5,
			duration: 0.5,
			when: "beforeChildren",
		},
	},
};
const childVariants = {
	hidden: {
		x: "-100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	exit: {
		x: 0,
		opacity: 0,
		transition: {
			delay: 0.5,
			duration: 0.5,
		},
	},
};
const submitVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			delay: 0.5,
		},
	},
};
function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{"Copyright © "}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<TextField
			{...field}
			{...props}
			label={label}
			error={meta.touched && Boolean(meta.error)}
			helperText={meta.touched && meta.error}
		/>
	);
};
export const FormikStep = ({ children, ...props }) => {
	return (
		<Box
			component={motion.div}
			variants={childVariants}
			initial='hidden'
			animate='visible'
			sx={{ mt: 3 }}>
			{children}
		</Box>
	);
	//return children;
};
export const FormikStepper = ({ children, step: stepNumber, ...props }) => {
	//const [stepNumber, setStepNumber] = useState(0);
	const steps = React.Children.toArray(children);
	const step = steps[stepNumber];
	const handleSubmit = async (values, bag) => {
		if (step.props.onSubmit) {
			await step.props.onSubmit(values, bag);
		}
		if (isLastStep) {
			return onSubmit(values, bag);
		} else {
			bag.setTouched({});
			next(values);
		}
	};
	return (
		<Formik
			validationSchema={step.props.validationSchema}
			{...props}
			onSubmit={async (values, helpers) => {
				step.props.onSubmit(values);
				// if (stepNumber === steps.length - 1) {
				// 	props.onSubmit(values, helpers);
				// } else {
				// 	setStepNumber((s) => s + 1);
				// }
			}}>
			{(formik) => (
				<Form autoComplete='off' style={{ width: "100%" }}>
					{step}
					<Box
						key='signup'
						component={motion.div}
						variants={submitVariants}
						initial='hidden'
						animate='visible'
						whileHover={{
							scale: 1.2,
							transition: { duration: 0.3 },
						}}>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							{stepNumber === 0 ? "Sign Up" : "Confirm Code"}
						</Button>
					</Box>

					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link href='#' to='/signin' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
					{stepNumber > 0 && (
						<Button onClick={() => setStepNumber(stepNumber - 1)}>prev</Button>
					)}
					{stepNumber < steps.length - 1 && (
						<Button onClick={() => setStepNumber(stepNumber + 1)}>next</Button>
					)}
				</Form>
			)}
		</Formik>
	);
};
const Signup = ({ signUp, confirmSignUp }) => {
	/* <Field
							id='username'
							label='User Name'
							name='username'
							autoComplete='username'
							placeholder='Jane'
							component={CustomInputComponent}
						/> */

	const navigate = useNavigate();
	return (
		<Container
			sx={{ width: "100%", height: "100%" }}
			component={motion.div}
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
			maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>

				<FormikStepper
					step={0}
					initialValues={{
						email: "rastakongoner@gmail.com",
						username: "rasta",
						phone: "+033611259067",
						password: "11111111",
						retypePassword: "11111111",
						confirmCode: "",
					}}
					//validationSchema={validationSchema}
				>
					<FormikStep
						onSubmit={(values) =>
							signUp(values, () => navigate("/signupConfirm"))
						}
						validationSchema={Yup.object({
							username: Yup.string("Enter your password")
								.min(3, "Password should be of minimum 8 characters length")
								.required("Password is required"),
							email: Yup.string("Enter your email")
								.email("Enter a valid email")
								.required("Email is required"),
							// password: Yup.string("Enter your password")
							// 	.min(8, "Password should be of minimum 8 characters length")
							// 	.required("Password is required"),
							// // retypePassword: Yup.string().when("password", {
							// // 	is: (val) => (val && val.length > 0 ? true : false),
							// // 	then: Yup.string().oneOf(
							// // 		[Yup.ref("password")],
							// // 		"Both password need to be the same"
							// // 	),
							// // }),
						})}>
						<Box sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<MyTextInput
										required={true}
										fullWidth={true}
										id='username'
										label='User Name'
										name='username'
										autoComplete='username'
										placeholder='Jane'
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<MyTextInput
										required={true}
										fullWidth={true}
										id='email'
										label='Email Address'
										name='email'
										autoComplete='email'
									/>
								</Grid>
								<Grid item xs={12}>
									<MyTextInput
										required={true}
										fullWidth={true}
										id='phone'
										label='Phone'
										name='phone'
										autoComplete='phone'
									/>
								</Grid>
								<Grid item xs={12}>
									<MyTextInput
										required={true}
										fullWidth={true}
										name='password'
										label='Password'
										type='password'
										id='password'
										autoComplete='new password'
									/>
								</Grid>
								<Grid item xs={12}>
									<MyTextInput
										required={true}
										fullWidth={true}
										name='retypePassword'
										label='Retype password'
										type='password'
										id='retypePassword'
										autoComplete='retype password'
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										control={
											<Checkbox value='allowExtraEmails' color='primary' />
										}
										label='I want to receive inspiration, marketing promotions and updates via email.'
									/>
								</Grid>
							</Grid>
						</Box>
					</FormikStep>
					<FormikStep
						onSubmit={(values) => confirmSignUp(values, navigate)}
						validationSchema={Yup.object({
							confirmCode: Yup.string("Enter your password")
								.min(3, "Password should be of minimum 8 characters length")
								.required("Password is required"),
						})}>
						<Box sx={{ mt: 3, width: "100%" }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<MyTextInput
										required={true}
										fullWidth={true}
										id='confirmCode'
										label='Confirmation Code'
										name='confirmCode'
										autoComplete='confirmCode'
										autoFocus
									/>
								</Grid>
							</Grid>
						</Box>
					</FormikStep>
				</FormikStepper>
			</Box>
		</Container>
	);
};
export default connect(null, authActions)(Signup);
