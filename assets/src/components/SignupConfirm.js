import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { motion } from "framer-motion";
import { useFormik, useField } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import * as authActions from "../store/actions/auth";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{"Copyright © "}
			<Link
				color='inherit'
				href='https://mui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
const validationSchema = Yup.object({
	confirmCode: Yup.string("Enter your password")
		.min(3, "Password should be of minimum 8 characters length")
		.required("Password is required"),
});
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
const SignupConfirm = ({ signUpConfirm, auth }) => {
	const { user } = auth;
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: { confirmCode: "" },
		validationSchema: validationSchema,
		onSubmit: (values) => {
			signUpConfirm({ ...values, userId: user.id }, () => navigate("/login"));
		},
	});
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
			},
		},
	};
	return (
		<Container
			key='SignIn'
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
				{/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar> */}
				<Typography
					component='h1'
					variant='h5'>
					Confirm code
				</Typography>
				<Box
					component='form'
					onSubmit={formik.handleSubmit}
					noValidate
					sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required={true}
						fullWidth={true}
						id='confirmCode'
						label='Confirmation Code'
						name='confirmCode'
						autoComplete='confirmCode'
						autoFocus
						value={formik.values.confirmCode}
						onChange={formik.handleChange}
						error={
							formik.touched.confirmCode && Boolean(formik.errors.confirmCode)
						}
						helperText={formik.touched.confirmCode && formik.errors.confirmCode}
					/>

					<Box
						component={motion.div}
						initial={{ opacity: 0.3 }}
						whileHover={{
							scale: 1.2,
							transition: { duration: 0.3 },
						}}>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Confirm Code
						</Button>
					</Box>

					<Grid container>
						<Grid
							item
							xs>
							<Link
								href='#'
								variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link
								href='#'
								to='/signup'
								variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
};
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps, authActions)(SignupConfirm);
