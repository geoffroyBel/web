import React, { useCallback, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";

import { motion, useSpring } from "framer-motion";

import Button from "@mui/material/Button";
import Rounded from "../ui/Rounded";
import { useTheme } from "@emotion/react";

const Header = ({ steps, page, step, scrollYProgress }) => {
	const theme = useTheme();
	const scaleX = useSpring(0);

	useEffect(() => {
		scaleX.set((page + 1) / steps.length);
	}, [page]);
	return (
		<>
			<Box
				sx={{
					zIndex: 1,
					position: "fixed",
					padding: "0 2rem",
					top: 0,
					width: "100%",
					height: 100,
					borderBottomRightRadius: 70,
					backgroundColor: "primary.main",
				}}>
				<Box
					sx={{
						position: "relative",

						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Button
						sx={{
							color: "background.light",

							paddingLeft: 0,
							width: "auto",
						}}
						variant='text'>
						{page + 1} / {steps.length}
					</Button>
					<Button
						sx={{
							color: "background.light",

							paddingLeft: 0,
							width: "auto",
						}}
						variant='text'>
						Skip
					</Button>
				</Box>
				<Box
					sx={{
						position: "relative",
						width: 1 / 1,
						height: 5,
						backgroundColor: "primary.light",
					}}>
					<Box
						component={motion.div}
						style={{ x: 0, scaleX /*: scrollYProgress*/ }}
						sx={{
							height: "100%",
							backgroundColor: "white",
							transformOrigin: "top left",
						}}></Box>
				</Box>
			</Box>
			<Box
				sx={{
					zIndex: 1,
					position: "fixed",
					top: 100,
					left: 0,
					width: 70,
					height: 70,
				}}>
				<Rounded
					width={70}
					height={70}
					backgroundColor={theme.palette.primary.main}
				/>
			</Box>
		</>
	);
};

export default Header;
