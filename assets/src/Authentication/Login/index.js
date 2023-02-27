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

export default connect(
	null,
	authActions
)(({ signIn }) => {
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
					title='Welcome Bac'
					description='Please Use your Credentials to login'
					fields={["username", "password"]}
					onSubmit={
						(values) => {
							signIn(values, () => navigate("/home"));
						}
						// signUp(values, () => navigate("/signupConfirm"))
					}
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
					})}>
					<TextField
						// m={5}
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
						// sx={{ margin: "23px 0" }}
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
				</FormSection>
			</Form>
		</Container>
	);
});

/*
5.2

DEBUT nbre (Entier)
Lire "ecrire un nbre"
nbr <--
Tant que nbre < 10 And nbre > 20
Debut Tant que
	"Ecrire Trop petit ou trop grand"
	Lire "ecrire un nouveau nbre"
Fin de Tant que
SI nbre >= 10 And nbre <= 20
	nbre <-- nbre + 1
	Ecrire nbre
Fin Si

DEBUT nbre (Entier)
Lire "ecrire un nbre"
nbr <--
i <-- 0
Tant que i < 10
Debut Tant Que
	i <-- i + 1
	nbr <-- nbre + i
	Ecrire i
Fin de Tant que

DEBUT nbre (Entier)
Lire "ecrire un nbre"
nbr <--
i <-- 0
for (i= 0, i < 10; i++)
	i <-- i + 1
	nbr <-- nbre + i
	Ecrire i
Fin de Tant que

DEBUT nbre (Entier)
Lire "ecrire un nbre"
nbr <--
i <-- 0
for (i= 1, i <= 10; i++)
	value <-- nbr * 1
	
	Ecrire value
Fin de Pour que


DEBUT nbre (Entier)
Lire "ecrire un nbre"
nbr <--
value <-- 0
for (i= 1, i <= nbre; i++)
	value <-- value + i 
	
	Ecrire value
Fin de Pour que


DEBUT nbre (Entier)
Lire "ecrire un nbre"
nbr <--
value <-- 1
for (i= 1, i <= nbre; i++)
	value <-- value * i 
	
Ecrire value
Fin de Pour que

DEBUT nbre (Entier)
Lire "ecrire un nbre"
nbr <--
value <-- 1
for (i= 1, i <= nbre; i++)
	value <-- value * i 
	
	Ecrire value
Fin de Pour que

Debut nbre Entier
bigest <-- 0
Tant que i < 20
Debut Tant Que
	Lire nbre
	nbre <--
	Si  nbre >= bigest
	bigest <-- nbre
	Fin Si
Fin Tant Que

Ecrire "le plus grand nombre: " nbre

Debut nbre Entier
lap <-- 0
bigest <-- 0
i <-- 0
Tant que i < 20
Debut Tant Que
	i <-- i+ 1
	Lire nbre
	nbre <--
	Si  nbre >= bigest
	lap <-- i
	bigest <-- nbre
	Fin Si
Fin Tant Que

Ecrire "le plus grand nombre: " bigest  "position: " lap
Ecrire "position: " lap

Debut nbre Entier
Lire "taper votre nbre"

nbre <---
lap <-- 0
bigest <-- 0

Tant que nbre != 0
Debut Tant Que
	i <-- i+ 1
	Lire nbre
	nbre <--
	Si  nbre >= bigest
	lap <-- i
	bigest <-- nbre
	Fin Si
Fin Tant Que

Ecrire "le plus grand nombre: " bigest  "position: " lap
Ecrire "position: " lap

5.10)
Debut prix, payment (Entier)
Lire prix
prix <--
total <-- 
totalPayment <--
Tant que  prix && prix != "stop"
	Lire prix
	total<-- total + prix
Fin Tant que
Tant que  totalPayment != total
	Lire payment
	payment <--		
	totalPayment<-- totalPayment + payment
	monnaie <-- totalPayment - total
	SI monnaie >= 0 
	  Ecrire "votre monaie" monnaie " Euro" 
	Fin Si
Fin Tant que

POUR i de 1 a 15
  Ecrire "par ici"
  Pour j de 1 a 6
	Ecrire "par la"
  Fin Pour
Fin POUR
*/
