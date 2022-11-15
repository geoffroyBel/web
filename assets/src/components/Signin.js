import React from "react";
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
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as yup from "yup";
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
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
const validationSchema = yup.object({
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
});

const Signin = ({ signIn }) => {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: "rastakongoner@gmail.com",
			username: "rasta",
			phone: "+033611259067",
			password: "12345678",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			signIn(values, navigate);
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
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<Box
					component='form'
					onSubmit={formik.handleSubmit}
					noValidate
					sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='User name'
						name='username'
						autoComplete='username'
						value={formik.values.username}
						onChange={formik.handleChange}
						error={formik.touched.username && Boolean(formik.errors.username)}
						helperText={formik.touched.username && formik.errors.username}
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						autoComplete='current-password'
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
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
							Sign In
						</Button>
					</Box>

					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href='#' to='/signup' variant='body2'>
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

export default connect(null, authActions)(Signin);
