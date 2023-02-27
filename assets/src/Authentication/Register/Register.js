import React from "react";
import Container from "../layout/Container";
import SocialLogin from "../components/SocialLogin";
import Button from "../../components/ui/Button";
import Typography from "@mui/material/Typography";
import TextField from "../components/form/TextField";

import EmailIcon from "@mui/icons-material/Email";
import Form, { FormSection } from "../components/form/Form";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ImageProfileField from "../components/form/ImageProfileField";
import { motion } from "framer-motion";
import { fadeIn as variants } from "../variants";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";

export default connect(
	null,
	authActions
)(({ signUp }) => {
	const navigate = useNavigate();
	const footer = (
		<>
			<Button
				onClick={() => {
					navigate("/login");
				}}
				style={{ width: "100%" }}
				variant='transparent'>
				<Typography fontWeight={"light"} variant='button' color='text.light'>
					Already have an account?
				</Typography>
				<Typography ml={1} variant='button' color='text.success'>
					Sign In!
				</Typography>
			</Button>
		</>
	);
	return (
		<Container
			component={motion.div}
			{...{ variants }}
			initial='hidden'
			animate='visible'
			exit='exit'
			{...{ footer }}>
			<Form
				step={0}
				initialValues={{
					email: "rastakongoner@gmail.com",
					username: "rasta",
					phone: "+033611259067",
					password: "11111111",
					retypePassword: "11111111",
					confirmCode: "",
				}}>
				<FormSection
					fields={["username", "password"]}
					onSubmit={(values) => {
						signUp(values, () => navigate("/confirm"));
					}}
					validationSchema={Yup.object({
						username: Yup.string("Enter your password")
							.min(3, "Password should be of minimum 8 characters length")
							.required("Password is required"),
						password: Yup.string("Enter your password")
							.min(3, "Password should be of minimum 8 characters length")
							.required("Password is required"),
						// email: Yup.string("Enter your email")
						// 	.email("Enter a valid email")
						// 	.required("Email is required"),
						// // retypePassword: Yup.string().when("password", {
						// // 	is: (val) => (val && val.length > 0 ? true : false),
						// // 	then: Yup.string().oneOf(
						// // 		[Yup.ref("password")],
						// // 		"Both password need to be the same"
						// // 	),
						// // }),
					})}>
					<ImageProfileField name='image_profile' id='image_profile' />
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
					<TextField
						margin='dense'
						lefticon={<EmailIcon color='primary' />}
						rightIconName={"check"}
						placeholder='Enter your Password'
						label='Retype Password'
						required={true}
						fullWidth={true}
						name='retypePassword'
						type='password'
						id='retypePassword'
						autoComplete='Retype Password'
					/>
				</FormSection>
			</Form>
		</Container>
	);
});
