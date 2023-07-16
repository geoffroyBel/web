import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "./Card";
import PaginationControlled from "./Paginate";
import * as reservationActions from "../../store/actions/reservation";
import { useDispatch, useSelector } from "react-redux";
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
	const [page, setPage] = React.useState(1);
	const dispatch = useDispatch();
	const { userReservationsByPage, totalPage } = useSelector(
		({ reservations }) => reservations
	);
	useEffect(() => {
		if (!page) return;
		dispatch(reservationActions.fetchReservationByPage(page));
	}, [page]);

	useEffect(() => {
		console.log("alllloooooo-------");
		console.log(userReservationsByPage);
		//dispatch(reservationActions.fetchReservationByPage(page));
	}, [userReservationsByPage]);
	return (
		<>
			<Box sx={{ flexGrow: 1, padding: 2 }}>
				<Grid
					rowSpacing={{ xs: 1, sm: 2, md: 3 }}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					direction='row'
					justifyContent='center'
					alignItems='center'
					container>
					{userReservationsByPage[page - 1] &&
						userReservationsByPage[page - 1].map((_, index) => (
							<Grid
								item
								// xs={2}
								//sm={3}
								// md={4}
								key={index}>
								<Card />
							</Grid>
						))}
				</Grid>
			</Box>
			<PaginationControlled
				{...{ totalPage }}
				{...{ page }}
				{...{ setPage }}
				sx={{ margin: "2rem auto" }}
			/>
		</>
	);
}
