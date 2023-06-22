import React, { useEffect, useState } from "react";
import {
	Container,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	Typography,
	IconButton,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { makeStyles, styled } from "@mui/styles";
import { RRuleFormattedText } from "../utils/RRuleFormated";

const Layout = styled(Container)(({ theme }) => ({
	paddingBottom: theme.spacing(5),
}));

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
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: theme.spacing(2),
	},
}));

export default ({ field, form, ...props }) => {
	const classes = useStyles();
	const [primaryText, setPrimaryText] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [horaire, setHoraire] = useState(null);
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	useEffect(() => {
		console.log("-------Horaire View Useeffrc");
		const str = RRuleFormattedText(field.value);
		setStartTime(str.startTime);
		setEndTime(str.endTime);
		setPrimaryText(str.period.horaire.description);
		setFrom(str.period.from);
		setTo(str.period.to);
	}, [field.value.rRule]);

	return (
		<Layout
			maxWidth={false}
			disableGutters>
			<Container
				maxWidth='md'
				component='main'>
				<Grid
					container
					spacing={5}
					alignItems='flex-end'>
					<Grid
						item
						//key={tier.title}
						xs={12}
						//sm={tier.title === "Enterprise" ? 12 : 6}
						md={12}>
						<Card>
							<CardHeader
								avatar={
									<IconButton aria-label='settings'>
										<CalendarMonthIcon />
									</IconButton>
								}
								title='Shrimp and Chorizo Paella'
								subheader={
									<Box sx={{ display: "flex", flexDirection: "column" }}>
										<div>
											{from} - {to}
										</div>
									</Box>
								}
							/>
							<CardContent>
								<div className={classes.cardPricing}>
									<Typography
										variant='h6'
										color='textSecondary'>
										{primaryText}
									</Typography>
									<Typography
										component='h2'
										variant='h3'
										color='textPrimary'>
										{startTime} - {endTime}
									</Typography>
								</div>
								{/* <ul>
										{tier.description.map((line) => (
											<Typography
												component='li'
												variant='subtitle1'
												align='center'
												key={line}>
												{line}
											</Typography>
										))}
									</ul> */}
							</CardContent>
							<CardActions>
								<Button
									fullWidth
									color='primary'>
									action
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
			{/* Footer */}

			{/* End footer */}
		</Layout>
	);
};
