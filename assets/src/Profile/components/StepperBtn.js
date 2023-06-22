import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "../assets/CheckIcon";
import { useTheme } from "@emotion/react";
import { motion } from "framer-motion";

const StepperBtn = ({ label, checked, style, error }) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const theme = useTheme();
	const handleClick = () => {
		setButtonClicked(true);
	};
	const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="red"/>
    </svg>
  `;
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}>
			<Box
				component={motion.div}
				style={{ ...style }}
				sx={{
					borderRadius: 50,
					bgcolor: "primary.ultraLight",
					width: 30,
					height: 30,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				{checked && (
					<CheckIcon
						size={20}
						color={"white"}
					/>
				)}
			</Box>
			<Typography
				// sx={{ backgroundColor: "yellow" }}
				variant='subtitle1'
				pl={2}
				color='primary'>
				{label}
			</Typography>
		</Box>
	);
};

export default StepperBtn;
