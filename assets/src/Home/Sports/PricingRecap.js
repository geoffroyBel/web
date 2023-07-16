import React from "react";
import Container from "@mui/material/Container";
import styled from "@mui/styles/styled";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTheme } from "@mui/styles";
import { Button, Stack, Typography } from "@mui/material";
// import PortalButton from "../components/PortalButton";

const SuccesIcon = styled(CheckCircleIcon)(({ theme }) => ({}));
const Layout = styled(Container)(({ theme }) => ({
	"&.MuiContainer-root": {
		flex: 1,
		width: "100%",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
}));

function PricingRecap({ navigateToPricing, status, abonnement, prestation }) {
	const theme = useTheme();
	if (!abonnement) return null;

	// const portalParams = {
	// 	stripeAccount: prestation?.company?.accountID,
	// 	prestationID: prestation?.id,
	// 	customerID: abonnement.customerID,
	// };
	const renderText = () => {
		{
			/* <Button variant='outlined'>Modifier Abonnement</Button> */
		}
		let text;
		if (status === "success") {
			const date_formated = new Date(abonnement.expireAt).toLocaleDateString(
				"fr-FR",
				{ weekday: "long", year: "numeric", month: "short", day: "numeric" }
			);
			return abonnement.credits === null ? (
				<>
					<Typography> Expire le {date_formated}</Typography>
					{/* <PortalButton {...{ portalParams }} /> */}
				</>
			) : (
				<>
					<Typography>Credits: {abonnement.credits}</Typography>
					<Button
						onClick={navigateToPricing}
						variant='outlined'>
						Ajouter
					</Button>
				</>
			);
		} else {
			return abonnement.credits === null ? (
				<>
					<Typography> Votre abonnement a expiré</Typography>
					{/* <PortalButton {...{ portalParams }} /> */}
				</>
			) : (
				<>
					<Typography>Credits insufisant</Typography>
					<Button
						onClick={navigateToPricing}
						variant='outlined'>
						Ajouter
					</Button>
				</>
			);
		}
	};
	return (
		<Layout>
			<Stack
				justifyContent={"center"}
				alignItems='center'
				direction='column'
				spacing={2}>
				<Avatar
					sx={{
						width: 100,
						height: 100,
						backgroundColor: theme.palette.secondary.main,
					}}>
					{status === "success" ? (
						<SuccesIcon sx={{ width: 100, height: 100 }} />
					) : (
						<HighlightOffIcon sx={{ width: 100, height: 100 }} />
					)}
				</Avatar>
				{renderText()}
				{/* {abonnement.subscriptionID ? (
					<Typography> Expire le {abonnement.expiration}</Typography>
				) : (
					<Typography>Credits: 5</Typography>
				)}
				
				<PortalButton {...{ portalParams }} /> */}
			</Stack>
		</Layout>
	);
}

export default PricingRecap;
