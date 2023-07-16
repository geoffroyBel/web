import React, { useContext, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useDimensions from "../../hooks/useDimensions";
import { Typography } from "@mui/material";
import NavBar from "../../components/ui/NavBar";
import { styled } from "@mui/styles";
import MenuContext, { MenuProvider } from "../../context/MenuContext";
import { useSelector } from "react-redux";
const assets = [require("../../img/sport1.png")];
const aspectRatio = 1075 / 1768;
const width = 450;
const items = [
	{
		label: "Coachs",
		screen: "Coachs",
		color: "primary.main",
		link: "/home/sports",
		icon: () => (
			<InboxIcon
				p={0}
				m={0}
				color='background'
			/>
		),
	},
	{
		label: "Favorites",
		screen: "Favorites",
		color: "primary.main",
		link: "/home/favorites",
		icon: () => (
			<InboxIcon
				p={0}
				m={0}
				color='background'
			/>
		),
	},
	{
		label: "Reservations",
		screen: "Reservations",
		color: "primary.main",
		link: "/home/reservation",
		icon: () => (
			<InboxIcon
				p={0}
				m={0}
				color='background'
			/>
		),
	},
	{
		label: "Edit Profile",
		screen: "profile",
		color: "primary.main",
		link: "/profile/edit",
		icon: () => (
			<InboxIcon
				p={0}
				m={0}
				color='background'
			/>
		),
	},
	{
		label: "Settings",
		screen: "Settings",
		color: "primary.main",
		link: "/home/sports",
		icon: () => (
			<InboxIcon
				p={0}
				m={0}
				color='background'
			/>
		),
	},
];
const Container = ({ onClick, onKeyDown, children }) => (
	<Box
		sx={{
			flex: 1,
			display: "flex",
			flexDirection: "column",
			width: 250,
		}}
		role='presentation'
		{...{ onClick }}
		{...{ onKeyDown }}>
		<Header>
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					zIndex: 20,
					//borderTopRightRadius: 70,
					borderBottomRightRadius: 70,
					backgroundColor: "primary.main",
				}}>
				<NavBar title='Menu' />
				<Box
					sx={{
						position: "absolute",
						left: "50%",
						top: "100%",
						transform: "translate(-50%, -50%)",
						width: 100,
						height: 100,
						borderRadius: "50%",
						backgroundColor: "primary.light",
					}}></Box>
			</Box>
		</Header>
		<Main>
			<Box
				sx={{
					position: "relative",
					flex: 1,
					backgroundColor: "primary.main",
				}}></Box>
			<Box
				sx={{
					overflow: "hidden",
					position: "relative",
					flex: 1,
					backgroundColor: "primary.light",
				}}>
				<img
					src={assets[0]}
					style={{
						// border: "solid 2px red",
						position: "absolute",
						width,
						height: width * aspectRatio,
						borderBottomLeftRadius: 50,
						bottom: 0,
						transform: "translateY(80%)",
					}}
				/>
			</Box>
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					borderTopLeftRadius: 70,
					borderBottomRightRadius: 70,
					backgroundColor: "background.light",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}>
				<Box mb={2}>
					<Typography
						display={"block"}
						align='center'
						variant='title'
						color={"primary"}>
						Geoff Bellemare
					</Typography>
					<Typography
						display={"block"}
						align='center'
						variant='body'>
						ggg@li.fr
					</Typography>
				</Box>
				{children}
			</Box>
		</Main>
		<Footer>
			<Box
				sx={{
					overflow: "hidden",
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					borderTopLeftRadius: 70,
					backgroundColor: "primary.light",
				}}>
				<img
					src={assets[0]}
					style={{
						transform: "translateY(-20%)",

						width,
						height: width * aspectRatio,
						borderBottomLeftRadius: 50,
					}}
				/>
			</Box>
		</Footer>
	</Box>
);
const MyListItem = () => {
	const navigate = useNavigate();
	return (
		<List>
			{items.map(({ label, icon, link }, index) => (
				<ListItem
					key={label}
					disablePadding>
					<ListItemButton
						onClick={() => navigate(link)}
						sx={{ paddingLeft: 4 }}>
						<Box
							sx={{
								width: 40,
								height: 40,
								borderRadius: "50%",
								backgroundColor: "primary.main",
								display: "flex",
								marginRight: 1,
								justifyContent: "center",
								alignItems: "center",
							}}>
							{icon()}
						</Box>
						<ListItemText
							sx={{ fontWeight: "800" }}
							primaryTypographyProps={{
								fontWeight: "medium",
								fontSize: "16px",
							}}
							primary={label}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};
const Header = styled(Box)(({ theme }) => ({
	position: "relative",
	flex: 0.2,
	backgroundColor: theme.palette.background.light,
}));

const Main = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	flex: 0.8,
	position: "relative",
}));
const Footer = styled(Box)(({ theme }) => ({
	position: "relative",
	flex: 0.2,
	backgroundColor: "background.light",
}));

export const MyDrawer = ({ navBarPos, navBarColor }) => {
	const navigate = useNavigate();
	const { totalItems } = useSelector(({ cart }) => cart);
	const { isMenuVisible, setIsMenuVisible, headerTitle } =
		useContext(MenuContext);

	const height = width * aspectRatio;

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setIsMenuVisible(open);
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",

					minHeight: "100vh",
				}}>
				{["left"].map((anchor) => (
					<React.Fragment key={anchor}>
						<NavBar
							position={navBarPos}
							title={headerTitle}
							iconLeft={<MenuIcon />}
							color={navBarColor}
							iconRight={
								<Badge
									anchorOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									badgeContent={totalItems}
									color='primary'>
									<ShoppingCartIcon />
								</Badge>
							}
						/>
						{/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
						<Drawer
							anchor={anchor}
							open={isMenuVisible}
							onClose={toggleDrawer("left", false)}>
							<Container
								onClick={toggleDrawer("left", false)}
								onKeyDown={toggleDrawer("left", false)}>
								<MyListItem />
							</Container>
						</Drawer>
					</React.Fragment>
				))}

				<Outlet />
			</div>
		</>
	);
};
export default ({ navBarPos = "static", navBarColor = "text.gray" }) => {
	return (
		<MenuProvider>
			<MyDrawer
				{...{ navBarPos }}
				{...{ navBarColor }}
			/>
		</MenuProvider>
	);
};
