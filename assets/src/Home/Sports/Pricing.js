import React, { forwardRef, useState, useEffect } from "react";
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
	Tab,
	Tabs,
} from "@mui/material";

import { makeStyles, styled } from "@mui/styles";

import { useMotionValue, motion } from "framer-motion";
import Carrousel from "./Carrousel";
import PricingRecap from "./PricingRecap";
// import { Abonnement } from "../../../src/models";
// import { DataStore } from "aws-amplify";

const Layout = styled(Container)(({ theme }) => ({
	"&.MuiContainer-root": {
		flex: 1,
		width: "100%",
		minHeight: 400,
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
	},
	height: "100vh",
}));
const Wrapper = styled(Box)(({ theme, width = 0 }) => ({
	position: "relative",
	width,
	display: "flex",
	flexDirection: "row",
	backgroundColor: "orange",
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
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				backgroundColor: "red",
				width: "100%",
			}}
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
export default forwardRef(
	({ abonnement, tab, onClickTab, user, prestation }, ref) => {
		const classes = useStyles();
		const [tiers, setTiers] = useState([]);
		const [value, setValue] = useState(tab);
		const [status, setStatus] = useState(null);
		const visibleItemLength = 3;
		let x = useMotionValue(0);

		const handleChange = (event, newValue) => {
			setValue(newValue);
		};
		useEffect(() => {
			if (abonnement) {
				//const id = abonnement.id;
				console.log("-----------------Abonnement--------------");
				console.log(abonnement);
				setStatus(abonnement.paymentStatus);
				setValue(1);
				// const subscription = DataStore.observe(Abonnement, id).subscribe(
				// 	(msg) => {
				// 		console.log("-------------------------status", msg.element.status);
				// 		setStatus(msg.element.status);
				// 	}
				// 	//console.log(msg.model, msg.opType, msg.element);
				// );
				// //subscription.unsubscribe();
				// setValue(1);
			}
		}, [abonnement]);

		useEffect(() => {
			if (prestation) {
				console.log("PRICING-------------company");
				console.log(user);
				console.log(prestation);
				console.log(prestation.company);
				const _tiers = prestation.tarifs.map((tarif) => ({
					title: tarif.name,
					price: tarif.price,
					...getInfo(tarif),
					buttonText: "Sign up for free",
					buttonVariant: "outlined",
					checkoutParams: {
						stripeAccount: prestation.company.accountID,
						mode: tarif.type === "forfait" ? "payment" : "subscription",
						prestationId: prestation.id,
						userID: user.id,
						tarifId: tarif.id,
					},
				}));
				console.log(_tiers);
				setTiers(_tiers);
			}
		}, [prestation]);
		// const { tarifs } = props.prestation;
		const getInfo = (tarif) => {
			let label = "";
			let description = [];
			if (tarif.credits === 1) {
				label = "Entrée";
				description = ["1 entrée"];
			} else if (tarif.type === "mensuel") {
				label = "Mois";
				description = ["Abonement mensuel", "Reservation illimité"];
			} else if (tarif.type === "annuel") {
				label = "An";
				description = ["Abonement annuel", "Reservation illimité"];
			} else {
				label = "Forfait";
				description = [
					`Forfait de ${tarif.credits} entrées`,
					"Reservation limité",
				];
			}
			return { label, description };
		};
		return (
			<Layout
				{...{ ref }}
				maxWidth={false}
				disableGutters>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "0px 20px",
					}}>
					<Tabs
						{...{ value }}
						onChange={handleChange}
						aria-label='basic tabs example'>
						<Tab
							label='Tarifs'
							{...a11yProps(0)}
						/>
						<Tab
							label='Compte'
							{...a11yProps(1)}
						/>
					</Tabs>
				</Box>

				{value === 0 ? (
					<Carrousel data={[...tiers, ...tiers]} />
				) : (
					<PricingRecap
						navigateToPricing={() => {
							setValue(0);
						}}
						{...{ status }}
						{...{ prestation }}
						{...{ abonnement }}
					/>
				)}

				{/* <TabPanel value={value} index={0}>
				
			</TabPanel>
			<TabPanel value={value} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel> */}

				{/* <Wrapper
				width={Object.keys(data).length * (width / options.days_per_page)}
				//{...{ dragConstraints }}
				dragTransition={{
					power: 0.3,
					timeConstant: 200,
					// Snap calculated target to nearest 50 pixels
					modifyTarget: (target) =>
						Math.round(target / (width / options.days_per_page)) *
						(width / options.days_per_page),
				}}
				drag={"x"}
				style={{ x }}
				component={motion.div}></Wrapper> */}
				{/* Hero unit */}
				{/* <Container maxWidth='sm' component='main' className={classes.heroContent}>
				<Typography
					component='h1'
					variant='h2'
					align='center'
					color='textPrimary'
					gutterBottom>
					Pricing
				</Typography>
				<Typography
					variant='h5'
					align='center'
					color='textSecondary'
					component='p'>
					Quickly build an effective pricing table for your potential customers
					with this layout. It&apos;s built with default Material-UI components
					with little customization.
				</Typography>
			</Container> */}
				{/* End hero unit */}
				{/* <Container maxWidth='md' component='main'>
				<Grid container spacing={5} alignItems='flex-end'>
					{tiers.map((tier) => (
						// Enterprise card is full width at sm breakpoint
						<Grid
							item
							key={tier.title}
							xs={12}
							sm={tier.title === "Enterprise" ? 12 : 6}
							md={4}>
							<Card>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									titleTypographyProps={{ align: "center" }}
									subheaderTypographyProps={{ align: "center" }}
									action={tier.title === "Pro" ? <StarIcon /> : null}
									className={classes.cardHeader}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component='h2' variant='h3' color='textPrimary'>
											${tier.price}
										</Typography>
										<Typography variant='h6' color='textSecondary'>
											/mo
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
									<Button
										fullWidth
										variant={tier.buttonVariant}
										color='primary'>
										{tier.buttonText}
									</Button>
									<CheckoutButton {...tier.checkoutParams} />
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container> */}
				{/* Footer */}

				{/* End footer */}
			</Layout>
		);
	}
);
