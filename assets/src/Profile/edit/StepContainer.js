import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const Container = styled((props) => {
	return <motion.div {...props} />;
})(() => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	minHeight: "100vh",
}));
const StepActionContainer = styled("div")(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	flexDirection: "row",
}));

const ButtonAction = styled((props) => (
	<Button
		fullWidth={false}
		{...props}
	/>
))(({ theme }) => ({
	borderRadius: 5,
	padding: theme.spacing(1.5, 3),
}));

const StepContainer = ({
	data,
	children,
	item,
	isOpen = false,
	handleClick = () => console.log("next"),
	handlePrevious = () => console.log("back"),
	labelBtnPrevious = "Retour",
	labelBtnClick = "Suivant",
	variants = {},
}) => {
	return (
		<Container
			{...{ variants }}
			animate={isOpen ? "open" : "closed"}>
			<Stack spacing={3}>
				<span>
					<Typography
						display='block'
						mb={1}
						variant='title'>
						{item.label}
					</Typography>
					<Typography variant='body'>{item.description}</Typography>
				</span>
				{children}

				<StepActionContainer>
					{/* <ButtonAction
						onClick={handlePrevious}
						variant='outlined'>
						{labelBtnPrevious}
					</ButtonAction>

					<ButtonAction
						type='submit'
						variant='contained'>
						{labelBtnClick}
					</ButtonAction> */}
				</StepActionContainer>
			</Stack>
		</Container>
	);
};

export default StepContainer;
