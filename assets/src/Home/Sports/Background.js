import Box from "@mui/system/Box";
import React from "react";
import Image from "../../components/ui/Image";
import { Hidden } from "@mui/material";

const Background = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				position: "absolute",
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				backgroundColor: "black",
				zIndex: 0,
			}}>
			<Box
				sx={{
					flex: 1 / 3,
					bgcolor: "primary.ultraLight",
					position: "relative",
					overflow: "hidden",
				}}>
				<img
					src={require("./assets/sport1.png")}
					style={{
						position: "absolute",
						top: "100%",
						left: "50%",
						transform: "translate(-50%, -40%)",
						zIndex: 0,
						// objectFit: "fill",
						// objectPosition: "50% 50%",
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						zIndex: 1,
						backgroundColor: "white",
						borderBottomRightRadius: 70,
					}}></Box>
			</Box>
			<Box
				sx={{
					flex: 1 / 3,
					position: "relative",
					overflow: "hidden",
					bgcolor: "primary.light",
				}}>
				<Box
					sx={{
						bgcolor: "background.light",
						width: 1 / 1,
						height: 1 / 2,
					}}></Box>
				<Box sx={{ width: 1 / 1, height: 1 / 2 }}></Box>
				<Box
					sx={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						borderTopLeftRadius: 70,
						borderBottomRightRadius: 70,
						overflow: "hidden",
						bgcolor: "primary.ultraLight",
					}}>
					<img
						src={require("./assets/sport1.png")}
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							// objectFit: "fill",
							// objectPosition: "50% 50%",
							borderTopLeftRadius: 70,
						}}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					flex: 1 / 3,
					overflow: "hidden",
					bgcolor: "primary.light",
					position: "relative",
				}}>
				<img
					src={require("./assets/sport1.png")}
					style={{
						position: "absolute",
						top: "0%",
						left: "50%",
						transform: "translate(-50%, -60%)",
						zIndex: 0,
						// objectFit: "fill",
						// objectPosition: "50% 50%",
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						zIndex: 1,
						bgcolor: "primary.light",
						borderTopLeftRadius: 70,
					}}></Box>
			</Box>
		</Box>
	);
};

export default Background;
