import React from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const cities = [
	{
		value: undefined,
		label: "None",
	},
	{
		value: "1",
		label: "New York",
	},
	{
		value: "2",
		label: "Chicago",
	},
	{
		value: "3",
		label: "Saigon",
	},
];
const sports = [
	{
		value: undefined,
		label: "None",
	},
	{
		value: "1",
		label: "Skateboard",
	},
	{
		value: "2",
		label: "Moto",
	},
	{
		value: "3",
		label: "Parapente",
	},
];
const types = [
	{
		value: "1",
		label: "Cours Collectif",
	},
	{
		value: "2",
		label: "Cours Particulier",
	},
	{
		value: "3",
		label: "Entree",
	},
	{
		value: "4",
		label: "Stage",
	},
];
const states = [
	{
		value: undefined,
		label: "None",
	},
	{
		value: "11",
		label: "Florida",
	},
	{
		value: "22",
		label: "Michigan",
	},
	{
		value: "33",
		label: "Texas",
	},
];

const countries = [
	{
		value: null,
		label: "None",
	},
	{
		value: "111",
		label: "United States",
	},
	{
		value: "222",
		label: "Italy",
	},
	{
		value: "333",
		label: "Vietnam",
	},
];
const formStepVariants = {
	hidden: {
		x: "-100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			when: "beforeChildren",
		},
	},
	exit: {
		x: "100vw",
		opacity: 0,
		transition: {
			//delay: 0.5,
			duration: 0.5,
			when: "beforeChildren",
		},
	},
};
const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			delay: 0.5,
			//when: "afterChildren",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			//delay: 0.5,
			duration: 0.5,
		},
	},
};

export default function CreatePrestationStep(props) {
	const { currentItem, title, description = null, children, step } = props;
	//step === currentItem &&
	return (
		<>
			{
				<Box
					component={motion.div}
					key={currentItem}
					variants={formStepVariants}
					initial='hidden'
					animate='visible'
					exit='exit'
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						flex: 1,
						width: "100%",
						// position: "absolute",
						// left: 0,
						// right: 0,
						// top: 0,
						// bottom: 0,
					}}>
					<Box
						key={`${currentItem}-container`}
						component={motion.div}
						variants={containerVariants}
						initial='hidden'
						animate='visible'
						exit={{ opacity: 0 }}
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<>
							{title && (
								<Box
									key={`${currentItem}-text`}
									component={motion.div}
									initial={{ opacity: 0, scale: 0 }}
									animate={{
										opacity: 1,
										scale: 1,
										transition: {
											delay: 0.5,
											duration: 0.5,
										},
									}}
									exit={{ opacity: 0 }}>
									<Typography textAlign='left' variant='h3' mb={1}>
										{title}
									</Typography>
								</Box>
							)}
							{description && (
								<Container maxWidth='sm'>
									{description && (
										<Typography
											variant='subtitle1'
											color='textSecondary'
											textAlign={"center"}
											component='div'
											mb={1}>
											{description}
										</Typography>
									)}
								</Container>
							)}
						</>
					</Box>

					{children}
				</Box>
			}
		</>
	);
}
