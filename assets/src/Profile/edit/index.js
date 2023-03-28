import React, { useContext, useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@mui/styles/styled";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Tabs from "../Tabs";
import PersonalInfos from "./PersonalInfos";
import Company from "./Company";

const Header = styled(Box)(({ theme }) => ({
	position: "relative",
	flex: 0.15,
	minHeight: "100px",
	backgroundColor: theme.palette.background.light,
}));

const Main = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	position: "relative",
	backgroundColor: theme.palette.primary.main,
}));
const Overlay = styled("div")(({ theme }) => ({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	borderTopLeftRadius: theme.borderRadius.xl,
	backgroundColor: theme.palette.background.light,
	display: "flex",
	flexDirection: "column",
}));

const Footer = styled(Box)(({ theme }) => ({
	position: "relative",
	flex: 0.2,
	backgroundColor: "background.light",
}));
const AVATAR_SIZE = 90;
const AVATAR_PADDING = 10;
const tabs = [
	{ id: "1", label: "Company" },
	{ id: "1", label: "personnal infos" },
];
export default () => {
	const [step, setStep] = useState(0);
	return (
		<Box
			sx={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
				width: "100%",
			}}>
			<Header>
				<Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						zIndex: 20,
						//borderTopRightRadius: 70,
						borderBottomRightRadius: 70,
						backgroundColor: "primary.main",
					}}>
					<Box
						sx={{
							position: "absolute",
							left: "50%",
							top: "100%",
							transform: "translate(-50%, -50%)",
							width: AVATAR_SIZE,
							height: AVATAR_SIZE,
							borderRadius: "50%",
							backgroundColor: "primary.ultraLight",
						}}></Box>
				</Box>
			</Header>
			<Main>
				<Overlay>
					<Box mb={2}>
						<Box sx={{ height: AVATAR_SIZE * 0.5 + AVATAR_PADDING }} />
						<Typography
							display={"block"}
							align='center'
							variant='title'
							color={"primary"}
							gutterBottom={false}>
							Geoff Bellemare
						</Typography>
						<Typography
							display={"block"}
							color='text.gray'
							align='center'
							variant='body'>
							ggg@li.fr
						</Typography>
					</Box>
					<Tabs
						{...{ tabs }}
						{...{ step }}
						onClick={setStep}>
						<Company />
						<PersonalInfos />
					</Tabs>
				</Overlay>
			</Main>
			{/* <Footer></Footer> */}
		</Box>
	);
};
