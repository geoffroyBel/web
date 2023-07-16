import React, { forwardRef, useState, useEffect, useRef } from "react";
import {
	Container,
	Box,
	AppBar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	Toolbar,
	Typography,
	Link,
	ButtonBase,
	useMediaQuery,
} from "@mui/material";

import StarIcon from "@mui/icons-material/StarBorder";
import { makeStyles, styled, useTheme } from "@mui/styles";
// import CheckoutButton from "../components/CheckOutButton";
import {
	useMotionValue,
	motion,
	useTransform,
	useSpring,
	useAnimation,
} from "framer-motion";
import CheckoutButton from "./CheckoutButton";

const Layout = styled(Container)(({ theme }) => ({
	"&.MuiContainer-root": {
		flex: 1,
		width: "100%",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
	},
}));
const WrapperContainer = styled(Box)(({ theme, width = 0 }) => ({
	flex: 1,
	display: "flex",
	flexDirection: "row",

	width: "100%",
}));
const Wrapper = styled(Box)(({ theme, width = 0 }) => ({
	flex: 3,
	display: "flex",
	flexDirection: "row",
	width,
}));
const WrapperItem = styled(Box)(({ theme, width = 0 }) => ({
	position: "relative",
	width,
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}));
const Dots = styled(Box)((theme) => ({
	width: "100%",
	flex: 1,
	//height: 100,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}));
const Dot = styled("span")(({ theme }) => ({
	margin: theme.spacing(1),
	width: 10,
	height: 10,
	borderRadius: 5,
	backgroundColor: theme.palette.secondary.main,
}));
const Header = styled("div")(({ theme }) => ({
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(3, 0),
}));
function Copyright() {
	return (
		<Typography
			variant='body2'
			color='textSecondary'
			align='center'>
			{"Copyright © "}
			<Link
				color='inherit'
				href='https://mui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	"@global": {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: "none",
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: "wrap",
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	heroContent: {
		padding: theme.spacing(8, 0, 6),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	cardPricing: {
		display: "flex",
		justifyContent: "center",
		alignItems: "baseline",
		marginBottom: theme.spacing(2),
	},
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up("sm")]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

const tiersBis = [
	{
		title: "Free",
		price: "0",
		description: [
			"10 users included",
			"2 GB of storage",
			"Help center access",
			"Email support",
		],
		buttonText: "Sign up for free",
		buttonVariant: "outlined",
	},
	{
		title: "Pro",
		subheader: "Most popular",
		price: "15",
		description: [
			"20 users included",
			"10 GB of storage",
			"Help center access",
			"Priority email support",
		],
		buttonText: "Get started",
		buttonVariant: "contained",
	},
	{
		title: "Enterprise",
		price: "30",
		description: [
			"50 users included",
			"30 GB of storage",
			"Help center access",
			"Phone & email support",
		],
		buttonText: "Contact us",
		buttonVariant: "outlined",
	},
];
const footers = [
	{
		title: "Company",
		description: ["Team", "History", "Contact us", "Locations"],
	},
	{
		title: "Features",
		description: [
			"Cool stuff",
			"Random feature",
			"Team feature",
			"Developer stuff",
			"Another one",
		],
	},
	{
		title: "Resources",
		description: [
			"Resource",
			"Resource name",
			"Another resource",
			"Final resource",
		],
	},
	{
		title: "Legal",
		description: ["Privacy policy", "Terms of use"],
	},
];
const CustomDot = ({ matches, x, index, width }) => {
	const input = matches
		? [(index + 1) * -width, index * -width, (index - 1) * -width]
		: [index * -width, (index - 1) * -width, (index - 2) * -width];
	const scale = useTransform(x, input, [1, 1.5, 1], { clamp: true });
	const opacity = useTransform(x, input, [0.3, 1, 0.3], { clamp: true });

	return (
		<Dot
			component={motion.div}
			style={{ scale, opacity }}
		/>
	);
};
const Item = ({ x, index, width, tier, classes, onClick, matches }) => {
	const theme = useTheme();
	const input = matches
		? [(index + 1) * -width, index * -width, (index - 1) * -width]
		: [index * -width, (index - 1) * -width, (index - 2) * -width];
	const output = matches ? [0.5, 1.2, 0.5] : [0.8, 1.2, 0.8];

	const scale = useTransform(x, input, output, { clamp: true });
	//
	const colorOutput = [
		theme.palette.secondary.light,
		theme.palette.secondary.main,
		theme.palette.secondary.light,
	];
	const colorTextOutput = [
		theme.palette.text.primary,
		theme.palette.common.white,
		theme.palette.text.primary,
	];
	const color = useTransform(x, input, colorOutput, { clamp: true });
	const colorText = useTransform(x, input, colorTextOutput, { clamp: true });

	useEffect(() => {
		// console.log("CARRRRRROUSEL---------------");
		// console.log(tier.checkoutParams.prestationId);
		// console.log(tier.checkoutParams.tarifId);
	}, [tier]);
	return (
		<WrapperItem width={width}>
			<Card
				component={motion.div}
				elevation={5}
				style={{
					scale,
				}}>
				<ButtonBase
					style={{
						display: "block",
						textAlign: "initial",
					}}
					{...{ onClick }}>
					<CardHeader
						component={motion.div}
						style={{ backgroundColor: theme.palette.secondary.light }}
						title={tier.title}
						subheader={tier.subheader}
						titleTypographyProps={{ align: "center" }}
						subheaderTypographyProps={{ align: "center" }}
						action={tier.title === "Pro" ? <StarIcon /> : null}
						className={classes.cardHeader}
					/>
					<CardContent sx={{ paddingLeft: 5, paddingRight: 5 }}>
						<div className={classes.cardPricing}>
							<Typography
								component='h2'
								variant='h3'
								color='textPrimary'>
								${tier.price}
							</Typography>
							<Typography
								variant='h6'
								color='textSecondary'>
								/ {tier.label}
							</Typography>
						</div>
						<ul>
							{tier.description.map((line) => (
								<Typography
									component='li'
									variant='subtitle1'
									align='center'
									key={line}>
									{line}
								</Typography>
							))}
						</ul>
					</CardContent>
					<CardActions>
						{/* <Button fullWidth variant={tier.buttonVariant} color='primary'>
							{tier.buttonText}
						</Button> */}
						<CheckoutButton
							sx={{
								maxWidth: 200,
								borderRadius: 2,
								padding: 2,
								marginLeft: "auto",
								marginRight: "auto",
							}}
							fullWidth
							variant='contained'
							checkoutParams={tier.checkoutParams}
						/>
						{/* <CheckoutButton
							{...{ colorText }}
							{...{ color }}
							checkoutParams={tier.checkoutParams}
						/> */}
					</CardActions>
				</ButtonBase>
			</Card>
		</WrapperItem>
	);
};
export default ({ data }) => {
	const classes = useStyles();
	const [width, setWidth] = useState(0);
	const [itemWidth, setItemWidth] = useState(0);
	const [dragConstraints, setDragConstraints] = useState({});
	const visibleItemLength = 3;
	let x = useMotionValue(0);
	const tapX = useRef(0);
	const ref = useRef(null);

	const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const controls = useAnimation();
	useEffect(() => {
		if (ref.current) {
			const _itemLength = matches ? 1 : 3;
			const _width = ref.current.offsetWidth;
			const _itemWidth = _width / _itemLength;
			const _constraint = {
				right: matches ? 0 : _itemWidth,
				left: matches
					? _itemWidth * (data.length - 1) * -1
					: _itemWidth * (data.length - 2) * -1,
			};

			setWidth(_width);
			setItemWidth(_itemWidth);
			setDragConstraints(_constraint);
			// setWrapperWidth(width * cells.length);
			// console.log("-------matches----------");
			// console.log(matches);
		}
	}, [ref.current, data, matches]);

	const handleClick = (index) => {
		// console.log(x);
		// spring.set(-itemWidth * (index - 1));
	};
	const onTap = (event, info) => {
		console.log("End");
		console.log(x.current);
		console.log(tapX.current);

		if (tapX.current !== x.current) {
			tapX.current = x.current;
			return;
		}
		const index = parseInt((info.point.x - x.current) / itemWidth);
		const delta = -itemWidth * (index - 1);
		//const delta = -itemWidth * index;
		controls.start({
			x: delta,
			transition: { duration: 0.5 },
		});
	};
	const onTapStart = (event, info) => {
		tapX.current = x.current;
	};
	// const { tarifs } = props.prestation;

	return (
		<Layout
			{...{ ref }}
			maxWidth={false}
			disableGutters>
			<Header>
				<Container
					maxWidth='sm'
					component='main'>
					{/* <Typography
						component='h1'
						variant='h2'
						align='center'
						color='textPrimary'
						gutterBottom>
						Tarifs
					</Typography> */}
					<Typography
						variant='body'
						align='center'
						color='textSecondary'
						component='p'></Typography>
				</Container>
			</Header>
			<Wrapper
				width={(data.length + 1) * itemWidth}
				animate={controls}
				{...{ dragConstraints }}
				dragTransition={{
					power: 0.3,
					timeConstant: 200,
					modifyTarget: (target) => Math.round(target / itemWidth) * itemWidth,
					// Snap calculated target to nearest 50 pixels
				}}
				onTap={onTap}
				{...{ onTapStart }}
				drag={"x"}
				style={{ x: x }}
				component={motion.div}>
				{data.map((tier, index) => (
					<Item
						{...{ matches }}
						key={index}
						{...{ classes }}
						onClick={() => handleClick(index)}
						width={itemWidth}
						{...{ index }}
						{...{ x }}
						{...{ tier }}
					/>
				))}
			</Wrapper>
			<Dots sx={{ flex: 1 }}>
				{data.map((_, index) => (
					<CustomDot
						{...{ matches }}
						{...{ x }}
						{...{ index }}
						key={index}
						width={itemWidth}
					/>
				))}
			</Dots>
		</Layout>
	);
};
