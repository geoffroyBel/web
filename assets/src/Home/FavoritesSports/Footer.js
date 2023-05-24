import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/styles";
import Rounded from "../../components/Rounded";
const Footer = styled(Box)(({ theme }) => ({
	padding: theme.spacing(3, 0, 0, 0),
	position: "fixed",
	bottom: 0,
	width: "100%",
	// //flex: 0.2,
	// height: 100,

	// backgroundColor: "background.light",
}));
export default ({
	label = "not provided",
	onPress = () => console.log("onPress masonry"),
}) => {
	const theme = useTheme();
	return (
		<Footer>
			<Box
				sx={{
					// overflow: "hidden",
					// position: "absolute",
					// top: 0,
					// left: 0,
					// bottom: 0,
					// right: 0,
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderTopLeftRadius: 50,
					borderBottomLeftRadius: 50,
					backgroundColor: "primary.light",
				}}>
				<Button
					fullWidth
					onClick={onPress}
					sx={{
						maxWidth: 250,

						borderRadius: 20,
						marginTop: 3,
						marginBottom: 3,
						textTransform: "none",
						color: "white",
					}}
					type='submit'
					color='success'
					variant='contained'>
					{label}
				</Button>
				<Rounded
					d='M 50 0
                    A 45 45, 0, 0, 1, 0 50
                    L 50 50 Z'
					style={{
						position: "absolute",
						right: 0,
						top: -50,
						backgroundColor: "transparent",
					}}
					background={theme.palette.primary.light}
				/>
			</Box>
		</Footer>
	);
};
