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
import { useTheme } from "@emotion/react";

const Card = styled(motion.div)(({ theme, ...rest }) => ({
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
export default ({ position = useMotionValue(0), onSwipe }) => {
	const theme = useTheme();
	const { width: wWidth, height: wHeight } = useWindowDimensions();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	let xInitial = 0;
	let yInitial = 0;
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

	function onPanStart(event, info) {
		// console.log(info.point.x, info.point.y);
	}
	function onPan(event, info) {
		//console.log(xInitial - info.point.x);
		x.set(info.offset.x + xInitial);
		y.set(info.offset.y + yInitial);
		// console.log(info.point.x, info.point.y);
	}
	function onPanEnd(event, info) {
		//console.log(info);
		xInitial = 0 + xInitial;
		//x.set(info.velocity.x / 5);
		const translation = info.velocity.x / 5;

		console.log(snapPoint(info.velocity.x / 4, [-wWidth, 0, wWidth]));
		//x.set(info.point.x - xInitial);
		x.set(snapPoint(info.velocity.x / 4, [-wWidth, 0, wWidth]));
		y.set(0);
		setTimeout(() => {
			onSwipe();
		}, 1000);
		//x.set(useSpring(info.velocity.x, { damping: 50, stiffness: 400 }));
	}
	return (
		<Box
			component={motion.div}
			onAnimationEnd={() => console.log("end")}
			dragTransition={{
				power: 0.3,
				timeConstant: 200,
				modifyTarget: (target) => snapPoint(target, [-wWidth, 0, wWidth]),
			}}
			onDragEnd={(event, info) =>
				setTimeout(() => {
					onSwipe();
				}, 500)
			}
			style={{ x, y: y }}
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
				// backgroundColor: "black",
			}}>
			<Box
				component={motion.div}
				style={{ scale, backgroundColor, y: _y }}
				sx={{
					// marginTop: "auto",
					// marginBottom: 10,
					width,
					height,
					borderRadius: "70px",
					bgcolor: "primary.light",
				}}></Box>
		</Box>
	);
	return (
		<Card
			onAnimationEnd={() => console.log("end")}
			dragTransition={{
				power: 0.3,
				timeConstant: 200,
				modifyTarget: (target) => snapPoint(target, [-width, 0, width]),
			}}
			onDragEnd={(event, info) =>
				setTimeout(() => {
					onSwipe();
				}, 1000)
			}
			style={{ x, y: y, scale, top: _y, backgroundColor }}
			// onPanStart={onPanStart}
			// onPan={onPan}
			// onPanEnd={onPanEnd}
			drag
			// style={{
			// 	top: _y,
			// 	x: _x,
			// 	backgroundColor,
			// 	y: y,
			// 	scale,
			// 	height,
			// 	width,
			// }}
		/>
	);
};
