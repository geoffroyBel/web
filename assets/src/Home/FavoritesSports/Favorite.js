import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { styled } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/favorite";
const Button = styled(ButtonBase)(({ theme }) => ({
	position: "relative",
	borderRadius: 50,
	// height: 200,
	// [theme.breakpoints.down("sm")]: {
	// 	width: "100% !important", // Overrides inline-style
	// 	height: 100,
	// },
	// "&:hover, &.Mui-focusVisible": {
	// 	zIndex: 1,
	// 	"& .MuiImageBackdrop-root": {
	// 		opacity: 0.15,
	// 	},
	// 	"& .MuiImageMarked-root": {
	// 		opacity: 0,
	// 	},
	"& .MuiTypography-root": {
		border: "4px solid currentColor",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	// },
}));
const Favorite = ({ favorite, width }) => {
	const [selected, setSelected] = useState(false);
	const { color, aspectRatio, id } = favorite;
	const { prestations } = useSelector(({ favorites }) => favorites);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.getFavorites());
	}, []);
	useEffect(() => {
		console.log("---------fav");
		console.log(prestations);
	}, [prestations]);
	return (
		<Button
			onClick={() => {
				setSelected((prev) => !prev);
				favorite.selected = !favorite.selected;
			}}>
			<Box
				sx={{
					borderRadius: 10,
					marginBottom: 2,
					backgroundColor: color,
					width,
					height: width * aspectRatio,
					display: "flex",
					justifyContent: "flex-end",
					padding: 2,
				}}>
				{selected && (
					<TaskAltIcon
						sx={{
							fontSize: 40,
							color: "success.main",
							width: 40,
							height: 40,
						}}
					/>
				)}
			</Box>
		</Button>
	);
};

export default Favorite;
