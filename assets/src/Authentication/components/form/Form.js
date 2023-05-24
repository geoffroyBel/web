import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";

import Box from "@mui/material/Box";
import styled from "@mui/styles/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { slideIn as variants } from "../../variants";

import { AnimatePresence, motion } from "framer-motion";

export const FormSection = ({ children, ...props }) => {
	return (
		// <Box
		// 	// component={motion.div}
		// 	// variants={childVariants}
		// 	// initial='hidden'
		// 	// animate='visible'

		// 	sx={{
		// 		mt: 3,
		// 		// width: "100%",
		// 		display: "flex",
		// 		flexDirection: "column",
		// 		justifyContent: "center",
		// 		alignItems: "center",
		// 	}}>
		<Fragment>{children}</Fragment>

		// </Box>
	);
	//return children;
};

const MyForm = styled(Form)(({ theme }) => ({
	width: "100%",

	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",

	alignItems: "center",

	maxWidth: 400,
	padding: theme.spacing(0, 2, 0, 2),
}));

export default ({ children, initialStep = 0, ...props }) => {
	const [step, setStep] = useState(initialStep);
	const childrens = React.Children.toArray(children);

	// const step = childrens[0];

	return (
		<Formik
			validationSchema={childrens[step].props.validationSchema}
			{...props}
			onSubmit={async (values, helpers) => {
				if (step !== childrens.length - 1 && childrens.length > 1) {
					setStep(step + 1);
				} else {
					childrens[step].props.onSubmit(values);
				}
			}}>
			{({ errors, values }) => {
				return (
					<MyForm autoComplete='off'>
						<AnimatePresence
							initial={false}
							exitBeforeEnter>
							{childrens.map((formStep, index) => {
								const { title = null, description = null } = formStep.props;
								return (
									step === index && (
										<Box
											component={motion.div}
											key={index}
											{...{ variants }}
											initial='hidden'
											animate='visible'
											exit='exit'>
											{title && (
												<Box py={4}>
													<Typography
														mb={1}
														display='block'
														textAlign={"center"}
														variant='title'>
														{title}
													</Typography>
													<Typography
														color='text.gray'
														textAlign={"center"}
														display={"block"}
														variant='body'>
														{description}
													</Typography>
												</Box>
											)}
											{formStep}
										</Box>
									)
								);
							})}
						</AnimatePresence>
						<Button
							disabled={childrens[step].props.fields.some(
								(name) => values[name] == ""
							)}
							fullWidth
							sx={{
								maxWidth: 250,

								borderRadius: 20,
								marginTop: 3,
								marginBottom: 3,
								textTransform: "none",
							}}
							type='submit'
							color='primary'
							variant='contained'>
							{childrens[step].props.btnText || "Next"}
						</Button>
					</MyForm>
				);
			}}
		</Formik>
	);
};
// export default ({ children }) => {
// 	const { validationschema: validationSchema, onSubmit } =
// 		React.Children.toArray(children)[0].props;
// 	console.log(validationSchema);
// 	return (
// 		<Formik
// 			validationSchema={validationSchema}
// 			onSubmit={(values) => {
// 				console.log("-----hhhhh");
// 				//onSubmit(values);
// 			}}>
// 			{(formik) => (
// 				<Form
// 					autoComplete='off'
// 					style={{
// 						width: "100%",
// 						padding: "0 20px",
// 					}}>
// 					{React.Children.toArray(children)[0]}
// 					<Button
// 						type='submit'
// 						fullWidth
// 						variant='contained'
// 						sx={{ mt: 3, mb: 2 }}>
// 						Sibmit
// 					</Button>
// 				</Form>
// 			)}
// 		</Formik>
// 	);
// };
