import React from "react";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import PlusIcon from "../assets/PlusIcon";
import { useTheme } from "@emotion/react";
import styled from "@mui/styles/styled";

const IconContainer = styled("div")(({ theme, width }) => ({
	width,
	height: width,
	borderRadius: "50%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: theme.palette.primary.main,
	margin: theme.spacing(0, 1),
}));

const LinkButton = () => {
	const theme = useTheme();
	return (
		<ButtonBase>
			<Typography
				sx={{
					color: theme.palette.primary.main,
					marginLeft: "auto",
					textAlign: "right",
				}}
				variant='body'>
				Ajouter discipline
			</Typography>
			<IconContainer width={20}>
				<PlusIcon
					size={20}
					color='white'
				/>
			</IconContainer>
		</ButtonBase>
	);
};

export default LinkButton;
