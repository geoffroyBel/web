import React, { useEffect } from "react";
import { styled } from "@mui/styles";
import {
	useTransform,
	motion,
	useMotionValue,
	useSpring,
	useMotionValueEvent,
} from "framer-motion";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

const CardCustom = styled(motion.div)(({ theme, ...rest }) => ({
	position: "absolute",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "orange",
	borderRadius: "70px",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
}));
export const snapPoint = (velocity, points) => {
	"worklet";
	const point = velocity;
	const deltas = points.map((p) => Math.abs(point - p));
	const minDelta = Math.min.apply(null, deltas);
	return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};
export default ({ item = null, scale, backgroundColor, y, x, onSave }) => {
	const theme = useTheme();
	const { width: wWidth, height: wHeight } = useWindowDimensions();

	// const width = wWidth * 0.75;
	// const height = width * (425 / 294);
	const height = wHeight * 0.55;
	const width = height * (294 / 385);

	let url = "/static/images/cards/contemplative-reptile.jpg";
	if (item && item.images[0]) {
		url = item.images[0].url;
	}
	const like = useTransform(x, [0, wWidth / 4], [0, 1]);
	const nope = useTransform(x, [-wWidth / 4, 0], [1, 0]);
	return (
		<Card
			component={motion.div}
			style={{
				scale,
				backgroundColor,
				y,
				boxShadow: `2px 2px 2px 2px rgba(0, 0, 0, 0.5)`,
			}}
			sx={{
				//width,
				display: "flex",
				flexDirection: "column",
				height,
				maxWidth: 345,
				borderRadius: "50px",
				bgcolor: "primary.light",
			}}>
			<CardMedia
				sx={{ height: 240, padding: 2 }}
				image={url}
				title='green iguana'>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Box
						component={motion.div}
						style={{
							opacity: nope,
						}}
						sx={{
							border: "solid 2px #ec5288",
							borderRadius: 2,
							padding: 1,
						}}>
						<Box
							sx={{
								fontSize: 18,
								color: "#ec5288",
								fontWeight: "bold",
							}}>
							NON
						</Box>
					</Box>

					<Box
						component={motion.div}
						style={{
							opacity: like,
						}}
						sx={{
							border: "solid 2px #6ee3b4",
							borderRadius: 2,
							padding: 1,
						}}>
						<Box
							sx={{
								fontSize: 18,
								color: "#6ee3b4",
								fontWeight: "bold",
							}}>
							Oui
						</Box>
					</Box>
				</Box>
			</CardMedia>
			<CardContent>
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
			<CardActions sx={{ marginTop: "auto", marginBottom: 2 }}>
				<Button
					onClick={() => {
						onSave();
						console.log("ohhhhhhh");
					}}
					size='small'>
					Share
				</Button>
				<Button size='small'>Learn More</Button>
			</CardActions>
		</Card>
	);
};
