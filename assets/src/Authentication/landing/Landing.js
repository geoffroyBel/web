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
import Button from "@mui/material/Button";
import Image from "../../components/ui/Image";
import Rounded from "../../components/Rounded";
import logo from "../../img/sport1.png";
import { useTheme } from "@emotion/react";
import { Slide, SlideTitle } from "../components/Slides";
//SlideDescription, SlideTitle
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
const ScrollView = styled("div")(({ theme, width = 0 }) => ({
	position: "absolute",
	zIndex: 10,
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	display: "flex",
	flexDirection: "row",

	width,
}));
const Header = styled("header")(({}) => ({
	position: "relative",
	flex: 1,
	width: "100%",
	borderTopLeftRadius: 50,
	borderTopRightRadius: 50,
	borderBottomRightRadius: 50,
}));
const Main = styled("main")(({ theme }) => ({
	padding: theme.spacing(0, 0),
	position: "relative",
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

const Item = styled("div")(({ theme, width = 0 }) => ({
	position: "relative",
	width: width,
	height: "100%",
}));

const AbsoluteContainer = styled("div")(({ theme }) => ({
	height: "100%",

	position: "absolute",
	overflow: "hidden",
	top: "0",
	left: "-10%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "center",
	width: "100vw",
}));

const Dot = styled("span")(({ theme }) => ({
	display: "inline-block",
	margin: theme.spacing(1),
	width: 10,
	height: 10,
	borderRadius: 5,
	backgroundColor: theme.palette.secondary.main,
}));

const SubTitle = styled("h1")(({ theme }) => ({
	...theme.typography.h3,
	marginTop: "auto",
	marginBottom: theme.spacing(2),
	textAlign: "center",
	textTransform: "capitalize",
}));
const SlidesContainer = styled("div")(({ theme, width }) => ({
	display: "flex",
	flexDirection: "row",
	minHeight: "50vh",
	width,
}));
const Title = styled("span")(({ theme }) => ({
	...theme.typography.h1,
	textTransform: "capitalize",
	color: theme.palette.text.light,
}));
const TitleBackground = styled("div")(({ theme, width }) => ({
	position: "relative",
	display: "flex",
	justifyContent: "center",
	alignItems: "flex-start",
	height: 100,
	top: "50%",
	transform: `translateY(-50%) translateX(${
		(width - 100) / 2
	}px) rotate(90deg)`,
}));
const DotContainer = styled("div")(({ theme, width = 45, height = 45 }) => ({
	position: "absolute",
	display: "flex",
	flexDirection: "row",
	width: "100%",
	padding: theme.spacing(1),
	margin: theme.spacing(1),

	justifyContent: "center",
	alignItems: "center",
}));
const Description = styled("p")(({ theme }) => ({
	textAlign: "center",
	...theme.typography.body1,
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
	const theme = useTheme();
	let x = useMotionValue(0);
	const [ref, dimensions] = useDimensions();
	const [dragConstraints, setDragConstraints] = useState({});
	const controls = useAnimation();
	const roundedOpacity = useAnimationControls();
	const navigate = useNavigate();
	const background = useTransform(
		x,
		[
			-1 * (dimensions.width * 0),
			-1 * (dimensions.width * 1),
			-1 * (dimensions.width * 2),
		],
		[
			theme.palette.primary.main,
			theme.palette.primary.light,
			theme.palette.primary.ultraLight,
		]
	);

	useEffect(() => {
		setDragConstraints({
			right: 0,
			left: -1 * dimensions.width * (SECTIONS.length - 1),
		});
	}, [dimensions]);

	const modifyTarget = (target) =>
		Math.round(target / dimensions.width) * dimensions.width;

	const scrollToIndex = async (i) => {
		if (i == SECTIONS.length) {
			navigate("/welcome");
			return;
		}
		controls.start({
			x: -dimensions.width * i,
			transition: { duration: 0.5 },
		});
	};
	const useTransformHelper = (motionValue, i, output) => {
		let width = dimensions.width;
		const input = [(i + 1) * -width, i * -width, (i - 1) * -width];
		return useTransform(x, input, output, { clamp: true });
	};

	return (
		<Layout
			layout
			component={motion.div}
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
			{...{ ref }}>
			<Header component={motion.div} style={{ background }}>
				{new Array(SECTIONS.length).fill(true).map((_, index) => {
					const width = dimensions.width;
					const _x = useTransformHelper(x, index, [width, 0, -width]);
					const scale = useTransformHelper(x, index, [0, 1, 0]);
					return (
						<AbsoluteContainer
							key={index}
							style={{ x: _x, scale, opacity: scale }}
							component={motion.div}>
							<Image src={logo} />
						</AbsoluteContainer>
					);
				})}
				<ScrollView
					animate={controls}
					width={SECTIONS.length * dimensions.width}
					{...{ dragConstraints }}
					dragTransition={{
						power: 0.3,
						timeConstant: 200,
						modifyTarget,
					}}
					style={{ x: x }}
					drag={"x"}
					component={motion.div}>
					{SECTIONS.map(({ title, description, textButton, name }, key) => {
						const opacity = useTransformHelper(x, key, [0, 1, 0]);
						return (
							<Item {...{ key }} width={dimensions.width}>
								<TitleBackground
									component={motion.div}
									style={{ opacity }}
									width={dimensions.width}>
									<Title>{name}</Title>
								</TitleBackground>
							</Item>
						);
					})}
				</ScrollView>
				<Rounded
					style={{
						position: "absolute",
						left: 0,
						bottom: -50,
					}}
					{...{ background }}
				/>
			</Header>
			<Main>
				<DotContainer>
					{SECTIONS.map((_, i) => {
						const opacity = useTransformHelper(x, i, [0.5, 1, 0.5]);
						const scale = useTransformHelper(x, i, [1, 1.5, 1]);
						return (
							<Dot
								component={motion.div}
								style={{ opacity, background, scale }}
							/>
						);
					})}
				</DotContainer>
				<SlidesContainer
					component={motion.div}
					width={dimensions.width * SECTIONS.length}
					style={{ x }}>
					{SECTIONS.map((el, i) => {
						const width = dimensions.width;

						const _x = useTransformHelper(x, i, [-width, 0, width]);

						const scale = useTransformHelper(x, i, [0.5, 1, 0.5]);
						return (
							<Slide
								{...{ width }}
								// style={{
								// 	position: "relative",
								// 	width,
								// 	// flex: 1,
								// 	display: "flex",
								// 	flexDirection: "column",
								// 	justifyContent: "center",
								// 	alignItems: "center",
								// 	//padding: "3rem",
								// }}
								key={i}>
								<SubTitle
									component={motion.div}
									style={{ position: "relative", x: _x }}>
									{el.title} dam
								</SubTitle>
								<Description component={motion.div}>
									{el.description}
								</Description>

								<Button
									size='large'
									fullWidth
									variant='contained'
									sx={{
										marginTop: "auto",
									}}
									color={i === SECTIONS.length - 1 ? "success" : "gray"}
									title={el.textButton}
									onClick={() => scrollToIndex(i + 1)}
									component={motion.div}
									//style={{ background }}
									// variant={i === SECTIONS.length - 1 ? "primary" : "secondary"}
								>
									Next
								</Button>
							</Slide>
						);
					})}
				</SlidesContainer>
			</Main>
		</Layout>
	);
}

export default Landing;
