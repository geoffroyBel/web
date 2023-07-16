import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Switch } from "@mui/material";
import { styled } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/favorite";
import PriceStarIcon from "./assets/PriceStarIcon";
import Card from "./Card.js";
// const Button = styled(ButtonBase)(({ theme }) => ({
// 	position: "relative",
// 	borderRadius: 50,
// 	// height: 200,
// 	// [theme.breakpoints.down("sm")]: {
// 	// 	width: "100% !important", // Overrides inline-style
// 	// 	height: 100,
// 	// },
// 	// "&:hover, &.Mui-focusVisible": {
// 	// 	zIndex: 1,
// 	// 	"& .MuiImageBackdrop-root": {
// 	// 		opacity: 0.15,
// 	// 	},
// 	// 	"& .MuiImageMarked-root": {
// 	// 		opacity: 0,
// 	// 	},
// 	"& .MuiTypography-root": {
// 		border: "4px solid currentColor",
// 		display: "flex",
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	// },
// }));
const label = { inputProps: { "aria-label": "Switch demo" } };
const Favorite = ({ favorite, width }) => {
	const [selected, setSelected] = useState(false);
	const { color, aspectRatio, id } = favorite;
	const { prestations } = useSelector(({ favorites }) => favorites);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (!prestations || !prestations.length) {
	// 		dispatch(actions.getFavorites());
	// 	}
	// }, []);
	useEffect(() => {
		console.log("---------fav");
		console.log(favorite);
	}, [favorite]);
	const { description, company, type, categories = [] } = favorite;
	const _type = type?.name || "cours";
	const _sport = categories.length ? categories[0].title : "Sport";
	const title = `${_type} de ${_sport}`;
	const headerTitle = company?.owner?.username || "not provided";
	// const title = favorite.categories.length
	// 	? favorite.categories[0].title
	// 	: "Sport";
	const imageUrl = favorite.images?.length
		? favorite.images[0].url
		: "https://picsum.photos/200";
	// const imageUrl = "https://picsum.photos/200";
	return (
		<Card
			{...{ color }}
			{...{ title }}
			{...{ headerTitle }}
			{...{ width }}
			{...{ description }}
			height={width * aspectRatio}
			{...{ imageUrl }}
			price={30}
		/>
	);
	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: color,
				width,
				height: width * aspectRatio,
				borderRadius: 10,
				marginBottom: 2,
				position: "relative",
			}}>
			<CardHeader
				sx={{
					position: "absolute",
					left: 0,
					top: 0,
					backgroundColor: "transparent",
					zIndex: 30,
					"&.MuiCardHeader-root": {
						flex: 1,
						width: "100%",
						display: "flex",
						flexDirection: "row",
						background: "rgb(2,0,36)",
						background:
							"linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0) 80%)",
						"&.MuiCardHeader-title": {
							fontSize: "4rem",
						},
					},
					"&.MuiCardHeader-title": {
						fontSize: "4rem",
					},
					"&.MuiCardHeader-action": {
						backgroundColor: "orange",
					},
				}}
				avatar={
					<Avatar
						sx={{ width: 60, height: 60, bgcolor: "primary.main" }}
						aria-label='recipe'>
						R
					</Avatar>
				}
				titleTypographyProps={{
					fontSize: 20,
					variant: "title",
					color: "white",
				}}
				title={favorite.company?.owner?.username}
				action={
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",

							height: "60px",
						}}>
						<Switch
							color='success'
							{...label}
						/>
					</Box>
				}
				//subheader='September 14, 2016'
			/>
			<CardActionArea
				sx={{
					flex: 1,
					position: "relative",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "flex-start",
					margin: 0,
					backgroundColor: "#FF9900",
				}}>
				<CardMedia
					component='div'
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						zIndex: 0,
						height: "100%",
						backgroundColor: "#FF9900",
					}}
					image='https://picsum.photos/200'
					alt='green iguana'>
					<CardContent
						sx={{
							position: "relative",
							height: 300,
							backdropFilter: "blur(10px)",
							// background: "rgb(2,0,36)",
							// background:
							// 	"linear-gradient(0deg, " + color + " 0%, rgba(9,9,121,0) 80%)",
						}}>
						<Typography
							sx={{
								backgroundColor: "gray",
								textTransform: "capitalize",
								color: "white",
								alignSelf: "flex-start",
							}}
							textTransform={"capitalize"}
							gutterBottom
							variant='h3'
							component='div'>
							{`${favorite.type?.name || "cours"} de ${title}`}
						</Typography>
						<Typography
							sx={{
								backdropFilter: "blur(10px)",
							}}
							variant='body'
							color='text.secondary'>
							{favorite.description}
						</Typography>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								position: "absolute",
								right: 20,
								bottom: 20,
								width: 60,
								height: 60,
								filter: "drop-shadow(-3px 6px 5px #000)",
							}}>
							<Typography
								zIndex={1}
								variant='title'
								color='white'>
								30€
							</Typography>
							<PriceStarIcon
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									zIndex: 0,
								}}
								{...{ color }}
							/>
						</Box>
					</CardContent>
					<CardActions
						sx={{
							display: "flex",
							justifyContent: "center",
							backgroundColor: color,
							padding: 3,
						}}>
						<Button
							sx={{ maxWidth: 200, borderRadius: 2, padding: 2 }}
							variant='outlined'
							color='primary'>
							Details
						</Button>
						<Button
							sx={{ maxWidth: 200, borderRadius: 2, padding: 2 }}
							variant='outlined'
							color='primary'>
							Reservation
						</Button>
					</CardActions>
				</CardMedia>
				{/* <Switch {...label} /> */}

				<CardContent sx={{ height: 100 }}>
					<Typography
						gutterBottom
						variant='h5'
						component='div'>
						Lizard
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'>
						Lizards are a widespread group of squamate reptiles, with over 6,000
						species, ranging across all continents except Antarctica
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
	return (
		<Button
			onClick={() => {
				setSelected((prev) => !prev);
				favorite.selected = !favorite.selected;
			}}>
			<Box
				sx={{
					borderRadius: 10,
					marginBottom: 2,
					backgroundColor: color,
					width,
					height: width * aspectRatio,
					display: "flex",
					justifyContent: "flex-end",
					padding: 2,
				}}>
				{selected && (
					<TaskAltIcon
						sx={{
							fontSize: 40,
							color: "success.main",
							width: 40,
							height: 40,
						}}
					/>
				)}
			</Box>
		</Button>
	);
};

export default Favorite;
