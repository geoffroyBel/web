import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import MenuContext from "../../context/MenuContext";

export default function NavBar({
	position = "relative",
	title = "My Profile",
	bgColor = "transparent",
	color = "text.light",
	iconLeft = <HighlightOffIcon />,
	iconRight = <PresentToAllIcon />,
}) {
	async function fetchMoviesJSON() {
		const response = await fetch("jsonplaceholder.typicode.com/posts");
		const movies = await response.json();
		for (let i = 0; i <= 10; i++) {
			const p = document.createElement("p");
			p.textContent = `index ${i}: ${movies[i].title}`;
			document.body.append(p);
		}
		return movies;
	}

	//const color = variant === "transparent" ? "gray" : "white";
	const { setIsMenuVisible, isMenuVisible } = useContext(MenuContext);

	return (
		<Box>
			<AppBar
				{...{ position }}
				sx={{
					boxShadow: "none",
					padding: 0,
					margin: 0,
					backgroundColor: bgColor,
				}}>
				<Toolbar
					sx={{
						justifyContent: "space-between",
						padding: 0,
						margin: 0,
						"&.MuiToolbar-root": {
							padding: 0,
						},
					}}>
					<IconButton
						size='large'
						edge='end'
						color='gray'
						onClick={() => {
							setIsMenuVisible(!isMenuVisible);
						}}
						aria-label='menu'
						sx={{
							marginLeft: 1,
							color,
							boxShadow: "0px 0px 1px gray",
						}}>
						{iconLeft}
					</IconButton>
					<Typography
						variant='h7'
						component='div'
						sx={{
							textAlign: "center",
							color,
							// fontWeight: "medium",
						}}>
						{title.toUpperCase()}
					</Typography>
					<IconButton
						sx={{
							marginRight: 1,
							boxShadow: "0px 0px 1px gray",
							color,
						}}
						size='large'
						edge='start'
						// color={color}
						aria-label='menu'>
						{iconRight}
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
