import React, { useState, Fragment, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";

import Box from "@mui/material/Box";
import styled from "@mui/styles/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/prestation";
import { slideIn as variants } from "../variants";

const ErrorProvider = () => {
	const { errors, values, touched } = useFormikContext();
	const dispatch = useDispatch();
	useEffect(() => {
		console.log("values");
		console.log(values);
		console.log("touched");
		console.log(touched);

		dispatch(actions.sendErrors({ errors, touched, values }));
	}, [errors, touched, values]);
	return null;
};
export default ({ children, step = 0, page = 0, ...props }) => {
	// const [step, setStep] = useState(initialStep);
	// const [page, setPage] = useState(initialPage);
	const pages = React.Children.toArray(children);
	// console.log(pages);
	// const childrens = pages[page].props.children;
	//const childrens = React.Children.toArray(pages[0]);
	// const childrens = React.Children.toArray(pages[0]);
	//const childrens = React.Children.toArray(children);

	// const step = childrens[0];

	useEffect(() => {
		console.log(
			"------------FORM PROPS validation page/step" + page + "/" + step
		);
		console.log(pages);
	});
	const validationSchema =
		pages[page].props.children[step]?.props.validationSchema || {};
	return (
		<Formik
			//validationSchema={pages[page].props.children[step].props.validationSchema}
			{...{ validationSchema }}
			{...props}
			onSubmit={async (values, helpers) => {
				const childrens = pages[page].props.children;
				childrens[step].props.onSubmit(values);
				// if (step !== childrens.length - 1 && childrens.length > 1) {
				// 	setStep(step + 1);
				// } else if (step === childrens.length - 1 && pages.length > 1) {
				// 	setPage(page + 1);
				// 	setStep(0);
				// } else {
				// 	childrens[step].props.onSubmit(values);
				// }
			}}>
			{({ errors, values }) => {
				return (
					<Form autoComplete='off'>
						<ErrorProvider />
						<AnimatePresence
							initial={false}
							exitBeforeEnter>
							{pages.map(({ props }, index_page) => {
								if (index_page === page) {
									// console.log("---------childrens ?");
									// console.log(props.children);
									const steps = props.children.map(
										(formStep, index) => formStep
									);
									return (
										<Box
											component={motion.div}
											key={`page-${index_page}`}
											{...{ variants }}
											initial='hidden'
											animate='visible'
											exit='exit'>
											{/* {props.children.map((formStep, index) => {
												return { formStep };
											})} */}
											{steps}
										</Box>
									);
								}
							})}
							{/* {childrens.map((formStep, index) => {
								const { title = null, description = null } = formStep.props;
								return (
									<Box
										// component={motion.div}
										key={`k-${index}`}
										// {...{ variants }}
										// initial='hidden'
										// animate='visible'
										// exit='exit'
									>
										{formStep}
									</Box>
								);
							})} */}
						</AnimatePresence>
						{/* <Button
							// disabled={childrens[step].props.fields.some(
							// 	(name) => values[name] == ""
							// )}
							fullWidth
							type='submit'
							color='primary'
							variant='contained'>
							{childrens[step].props.btnText || "Next"}
						</Button> */}
					</Form>
				);
			}}
		</Formik>
	);
};
