import React, { useCallback, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuContext from "../../context/MenuContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const settings = ["Profile", "Account", "Logout"];
import * as actionsAuth from "../../store/actions/auth";
export default function NavBar({
	position = "relative",
	title = "My Profile",
	bgColor = "transparent",
	color = "text.light",
	iconLeft = <HighlightOffIcon />,
	iconRight = <PresentToAllIcon />,
}) {
	// const [auth, setAuth] = React.useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { user } = useSelector(({ auth }) => auth);

	const handleChange = (event) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (index) => {
		setAnchorEl(null);
		if (index === settings.length - 1) {
			dispatch(actionsAuth.signOut(() => navigate("/login")));
		} else if (index === 1) {
			navigate("profile/edit");
		}
	};

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
					{/* <IconButton
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
					</IconButton> */}
					<div>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							sx={{
								marginRight: 1,
								boxShadow: "0px 0px 1px gray",
								color,
							}}>
							<AccountCircle />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}>
							{settings.map((setting, index) => {
								let link = setting;
								if (index === settings.length - 1 && !user) {
									link = "Login";
								}
								return (
									<MenuItem
										key={setting}
										onClick={() => handleClose(index)}>
										<Typography textAlign='center'>{link}</Typography>
									</MenuItem>
								);
							})}
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
