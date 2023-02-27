import React, { useRef, useState, useEffect } from "react";
import { styled } from "@mui/styles";
import {
	motion,
	useMotionValue,
	useTransform,
	useAnimation,
	useAnimationControls,
} from "framer-motion";
import useDimensions from "../../hooks/useDimensions";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Image from "../../components/ui/Image";
import Rounded from "../../components/Rounded";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { display, Stack } from "@mui/system";
import { SlideDescription, SlideTitle } from "../components/Slides";
const picture = {
	width: 1768,
	height: 1075,
	src: require("../../img/sport1.png"),
};
const SECTIONS = [
	{
		name: "Sports",
		title: "trouve ton prof de skate",
		description: "atleast vous propose des cours dans des discipline extremes",
		textButton: "Next",
	},
	{
		name: "Coach",
		title: "trouve ton prof de skate",
		description: "atleast vous propose des cours dans des discipline extremes",
		textButton: "Next",
	},
	{
		name: "Welcome",
		title: "trouve ton prof de skate",
		description: "atleast vous propose des cours dans des discipline extremes",
		textButton: "Next",
	},
];
const Layout = styled("section")(({ theme }) => ({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	width: "100vw",
	height: "100vh",

	overflow: "hidden",
}));

const Header = styled("header")(({ theme }) => ({
	position: "relative",
	// flex: 1,
	height: "40%",
	width: "100%",

	borderTopLeftRadius: 50,
	borderTopRightRadius: 50,
	borderBottomRightRadius: 50,
	backgroundColor: theme.palette.gray.light,
}));
const Main = styled("main")(({ theme }) => ({
	padding: theme.spacing(0, 5),
	position: "relative",
	height: "60%",

	width: "100%",
	display: "flex",
	justifyContent: "space-evenly",
	alignItems: "center",
	flexDirection: "column",
}));

const SubTitle = styled("h1")(({ theme }) => ({
	...theme.typography.h3,
	// marginBottom: theme.spacing(1),
	textAlign: "center",
	textTransform: "capitalize",
}));
const Description = styled("p")(({ theme }) => ({
	textAlign: "center",
	...theme.typography.description,
}));
const Image1 = styled(motion.img)(({ theme, height, width }) => ({
	position: "relative",
	objectFit: "contain",
}));

const containerVariants = {
	hidden: {
		x: "-100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	exit: {
		x: 0,
		opacity: 0,
		transition: {
			delay: 0.5,
			duration: 0.5,
		},
	},
};
function Landing() {
	let x = useMotionValue(0);
	const [ref, { width, height }] = useDimensions();
	const [dragConstraints, setDragConstraints] = useState({});
	const controls = useAnimation();
	const roundedOpacity = useAnimationControls();
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setDragConstraints({
			right: 0,
			left: -1 * width * (SECTIONS.length - 1),
		});
	}, [width]);

	const modifyTarget = (target) => Math.round(target / width) * width;

	const scrollToIndex = async (i) => {
		if (i == SECTIONS.length) navigate("/signin");
		controls.start({
			x: -dimensions.width * i,
			transition: { duration: 0.5 },
		});
	};
	const useTransformHelper = (motionValue, i, output) => {
		const input = [(i + 1) * -width, i * -width, (i - 1) * -width];
		return useTransform(x, input, output, { clamp: true });
	};
	const size = useMediaQuery(theme.breakpoints.down("sm"))
		? {
				width: width,
				height: (width * picture.height) / picture.width,
				scale: 1,
		  }
		: {
				width: (height * 0.4 * picture.width) / picture.height,
				height: height * 0.4,
				scale: 1.5,
		  };
	console.log(height);
	return (
		<Layout
			component={motion.div}
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
			{...{ ref }}>
			<Header component={motion.div}>
				<motion.div
					onHoverStart={() =>
						controls.start({
							scale: 1.7,
							transition: { duration: 1 },
						})
					}
					onHoverEnd={() =>
						controls.start({
							scale: 1.5,
							transition: { duration: 1 },
						})
					}
					style={{
						position: "relative",
						display: "flex",
						justifyContent: "center",
						width: "100%",
						height: "100%",
						overflow: "hidden",
					}}>
					<Image1
						animate={controls}
						src={picture.src}
						{...{ height }}
						{...{ width }}
						style={{
							marginTop: "auto",
							position: "relative",
							...size,
							objectFit: "contain",
							objectPosition: "0px 30px",
						}}
					/>
				</motion.div>
				<Rounded
					style={{
						position: "absolute",
						left: 0,
						bottom: -50,
					}}
					background={theme.palette.gray.light}
				/>
			</Header>
			<Main>
				<SlideTitle>Let's get Started</SlideTitle>
				<SlideDescription>
					Login or Sign up for start your visit
				</SlideDescription>

				<Stack
					sx={{ width: "100%", display: "flex", alignItems: "center" }}
					spacing={2}>
					<Button
						onClick={() => navigate("/login")}
						variant='contained'
						color='success'>
						Have an Account? Sign In!
					</Button>
					<Button variant='contained' color='gray'>
						Become a Coach!
					</Button>
					<Button onClick={() => navigate("/register")} sx={{ color: "black" }}>
						Join us it's free
					</Button>
				</Stack>
			</Main>
		</Layout>
	);
}

export default Landing;
