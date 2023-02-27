import React from "react";
import Container from "../layout/Container";
import SocialLogin from "../components/SocialLogin";
import Button from "../../components/ui/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "../components/form/TextField";
import EmailIcon from "@mui/icons-material/Email";
import Form, { FormSection } from "../components/form/Form";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import * as authActions from "../../store/actions/auth";
import { connect } from "react-redux";
function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(
	mapStateToProps,
	authActions
)(({ signUpConfirm, auth }) => {
	const { user } = auth;
	const navigate = useNavigate();
	const footer = (
		<>
			<SocialLogin />
			<Button
				onClick={() => navigate("/register")}
				style={{ width: "100%" }}
				variant='transparent'>
				<Typography fontWeight={"light"} variant='button' color='text.light'>
					Don't have an account?
				</Typography>
				<Typography ml={1} variant='button' color='text.success'>
					Sign Up Here!
				</Typography>
			</Button>
		</>
	);
	return (
		<Container {...{ footer }}>
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
					title='Confirm Your Registration'
					description='Enter the code we send to your mail'
					btnText='Confirm'
					fields={["confirmCode"]}
					onSubmit={
						(values) => {
							signUpConfirm({ ...values, userId: user.id }, () =>
								navigate("/home")
							);
							//signIn(values, () => navigate("/home"));
						}
						// signUp(values, () => navigate("/signupConfirm"))
					}
					validationSchema={Yup.object({
						confirmCode: Yup.string("Enter your password")
							.min(3, "Password should be of minimum 8 characters length")
							.required("Password is required"),

						// email: Yup.string("Enter your email")
						// 	.email("Enter a valid email")
						// 	.required("Email is required"),
					})}>
					<TextField
						// m={5}
						margin='dense'
						fullWidth
						lefticon={<EmailIcon color='primary' />}
						rightIconName={"check"}
						placeholder='Enter your Confirmation Code'
						label='Confirm Code'
						type='text'
						id='confirmCode'
						name='confirmCode'
					/>
				</FormSection>
			</Form>
		</Container>
	);
});
