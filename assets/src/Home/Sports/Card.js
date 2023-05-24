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
export default ({
	position = useMotionValue(0),
	onSwipe,
	index,
	item = null,
}) => {
	const theme = useTheme();
	const { width: wWidth, height: wHeight } = useWindowDimensions();
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	// const width = wWidth * 0.75;
	// const height = width * (425 / 294);
	const height = wHeight * 0.6;
	const width = height * (294 / 385);
	const backgroundColor = useTransform(
		position,
		[0, 1],
		[theme.palette.primary.ultraLight, theme.palette.primary.main]
	);
	const _x = useSpring(x, { damping: 20, stiffness: 400 });
	const _y = useTransform(position, [0, 1], [0, -70]);
	const scale = useTransform(position, [0, 1], [1, 0.8]);
	const zIndex = useTransform(position, [0, 1], [3, 0]);

	const onDragEnd = (event, info) => {
		setTimeout(() => {
			x.stop();
			x.set(0);
			onSwipe();
		}, 300);
	};

	// useEffect(() => {
	// 	x.onChange((latest) => {
	// 		//console.log("wWidth :" + wWidth + " latest:" + latest);
	// 		if (latest <= -wWidth || latest >= wWidth) {
	// 			console.log("wWidth :" + wWidth + " latest:" + latest);
	// 		}
	// 	});
	// }, []);
	let url = "/static/images/cards/contemplative-reptile.jpg";
	if (item && item.images[0]) {
		url = item.images[0].url;
	}
	return (
		<Box
			component={motion.div}
			onAnimationEnd={() => console.log(" c ou a end")}
			dragTransition={{
				power: 0.2,
				timeConstant: 200,
				modifyTarget: (target) => snapPoint(target, [-wWidth, 0, wWidth]),
			}}
			onDragEnd={(event, info) =>
				setTimeout(() => {
					x.stop();
					x.set(0);
					onSwipe();
				}, 300)
			}
			style={{ x: x, y: y, zIndex }}
			drag
			sx={{
				position: "absolute",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,

				// zIndex: 55,
				//backgroundColor: "black",
			}}>
			<Card
				component={motion.div}
				style={{
					scale,
					backgroundColor,
					y: _y,
				}}
				sx={{
					//width,
					height,
					maxWidth: 345,
					borderRadius: "70px",
					bgcolor: "primary.light",
				}}>
				<CardMedia
					sx={{ height: 140 }}
					image={url}
					title='green iguana'
				/>
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
				<CardActions>
					<Button size='small'>Share</Button>
					<Button size='small'>Learn More</Button>
				</CardActions>
			</Card>
			{/* <Box
				component={motion.div}
				style={{
					scale,
					backgroundColor,
					y: _y,
				}}
				sx={{
					// marginTop: "auto",
					// marginBottom: 10,
					width,
					height,
					borderRadius: "70px",
					bgcolor: "primary.light",
				}}></Box> */}
		</Box>
	);
};
