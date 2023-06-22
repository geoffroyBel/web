import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { styled } from "@mui/styles";
import {
	useTransform,
	motion,
	useMotionValue,
	useSpring,
	useMotionValueEvent,
	useAnimation,
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
import Sport from "./Sport";
const α = Math.PI / 12;
const HEIGHT_POURCENT_WINDOW = 0.55;
const RATIO_FROM_HEIGHT = 350 / 385;

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
	console.log("velocity");
	console.log(velocity);
	if (Math.abs(velocity) < window.innerWidth / 3) return 0;
	const point = velocity;
	const deltas = points.map((p) => Math.abs(point - p));
	const minDelta = Math.min.apply(null, deltas);
	return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};
export default forwardRef(
	(
		{ position = useMotionValue(0), onSwipe, index, item = null, parent_scale },
		ref
	) => {
		const theme = useTheme();
		const { width: wWidth, height: wHeight } = useWindowDimensions();
		const x = useMotionValue(0);
		const y = useMotionValue(0);
		const controls = useAnimation();
		// const width = wWidth * 0.75;
		// const height = width * (425 / 294);

		// const height = wHeight * 0.6;
		// const width = height * (294 / 385);

		// const width = wWidth * 0.75;
		// const height = width * (425 / 294);
		// const height = wHeight * 0.55;
		// const width = height * (350 / 385);

		const height = wHeight * HEIGHT_POURCENT_WINDOW;
		const width = height * RATIO_FROM_HEIGHT;

		const A = Math.round(width * Math.cos(α) + height * Math.sin(α));
		const backgroundColor = useTransform(
			position,
			[0, 1],
			[theme.palette.primary.ultraLight, theme.palette.primary.main]
		);
		const _x = useSpring(x, { damping: 20, stiffness: 400 });
		const _y = useTransform(position, [0, 1], [0, -70]);
		const scale = useTransform(position, [0, 1], [1, 0.8]);
		const zIndex = useTransform(position, [0, 1], [3, 0]);
		const rotate = useTransform(
			x,
			[-wWidth / 4, 0, wWidth / 4],
			[-α * (180 / Math.PI), 0, α * (180 / Math.PI)]
		);

		const scale_other = useTransform(x, [-wWidth, 0, wWidth], [1.2, 1, 1.2]);

		//parent_scale = useTransform(x, [-wWidth, 0, wWidth], [1.2, 1, 1.2]);
		useTransform(scale_other, (value) => {
			parent_scale.set(value);
		});
		const onDragEnd = (event, info) => {
			setTimeout(() => {
				x.stop();
				x.set(0);
				onSwipe();
			}, 300);
		};
		const swipe = (_x) => {
			controls
				.start({
					x: _x,
					transition: { duration: 0.5 },
				})
				.then(() => {
					x.stop();
					//x.set(0);
					onSwipe();
				});
			// setTimeout(() => {
			// 	x.stop();
			// 	//x.set(0);
			// 	onSwipe();
			// }, 300);
		};

		useImperativeHandle(ref, () => ({
			swipeLeft: () => {
				swipe(-A);
			},
			swipeRight: () => {
				swipe(A);
			},
		}));
		// useEffect(() => {
		// 	x.onChange((latest) => {
		// 		const center = wWidth / 2;
		// 		const left_bound = center - A / 2;
		// 		const right_bound = center + A;
		// 		// const offsetX = info.point.x - event.offsetX;
		// 		console.log("A", A);
		// 		console.log("wWidth :" + wWidth + " latest:" + latest);
		// 		if (Math.abs(latest) === A) {
		// 			console.log("YOU SHOULD SWIPE");
		// 			setTimeout(() => {
		// 				x.stop();
		// 				//x.set(0);
		// 				onSwipe(latest >= 0);
		// 			}, 500);
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
				animate={controls}
				onAnimationEnd={() => console.log(" c ou a end")}
				dragTransition={{
					power: 0.5,
					timeConstant: 200,
					modifyTarget: (target) => snapPoint(target, [-A, 0, A]),
				}}
				onDragEnd={(event, info) => {
					setTimeout(() => {
						if (info.velocity.x === 0 && Math.abs(info.offset.x) < A) {
							return;
						}
						x.stop();
						onSwipe(info.offset.x >= 0);
					}, 500);
				}}
				// onTap={(event, info) => {
				// 	console.log("End");
				// 	alert("ggggg");
				// 	// const index = parseInt((info.point.x - x.current) / itemWidth);
				// 	// const delta = -itemWidth * (index - 1);
				// 	// //const delta = -itemWidth * index;
				// 	// controls.start({
				// 	// 	x: delta,
				// 	// 	transition: { duration: 0.5 },
				// 	// });
				// }}
				style={{ x: x, y: y, zIndex, rotate, scale: parent_scale }}
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
				<Sport
					{...{ x }}
					{...{ scale }}
					{...{ scale_other }}
					y={_y}
					{...{ backgroundColor }}
					item={item}
					onSave={swipe}
					{...{ width }}
					{...{ height }}
				/>
			</Box>
		);
	}
);
