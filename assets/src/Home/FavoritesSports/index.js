import React, { useState } from "react";
import Box from "@mui/material/Box";
import useHeaderTitle from "../../hooks/useHeaderTitle";
import Footer from "./Footer";
import Favorite from "./Favorite";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useTheme } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/favorite";

const defaultColors = [
	"#BFEAF5",
	"#BEECC4",
	"#FFE4D9",
	"#BEECC4",
	"#D5C3BB",
	"#F3F0EF",
	"#DEEFC4",
];
const defaultAspectRatio = [1, 200 / 145, 180 / 145, 120 / 145];
const defaultFavorites = [
	{
		id: 1,
		color: "#BFEAF5",
		aspectRatio: 1,
		selected: false,
	},
	{
		id: 2,
		color: "#BEECC4",
		aspectRatio: 200 / 145,
		selected: false,
	},
	{
		id: 3,
		color: "#FFE4D9",
		aspectRatio: 180 / 145,
		selected: false,
	},
	{
		id: 4,
		color: "#BEECC4",
		aspectRatio: 120 / 145,
		selected: false,
	},
	{
		id: 5,
		color: "#D5C3BB",
		aspectRatio: 1,
		selected: false,
	},
	{
		id: 6,
		color: "#F3F0EF",
		aspectRatio: 120 / 145,
		selected: false,
	},
	{
		id: 7,
		color: "#D5C3BB",
		aspectRatio: 210 / 145,
		selected: false,
	},
	{
		id: 8,
		color: "#DEEFC4",
		aspectRatio: 160 / 145,
		selected: false,
	},
];
function index() {
	useHeaderTitle("Favorites");
	const { width: wWidth, height: wHeight } = useWindowDimensions();
	const theme = useTheme();
	const [width, setWidth] = useState(null);
	const [favorites, setFavorites] = useState(defaultFavorites);
	const [selectedFavorites, setSelectedFavorites] = useState([]);
	const { prestations } = useSelector(({ favorites }) => favorites);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.getFavorites());
	}, []);

	useEffect(() => {
		let _a = 0;
		let _c = 0;
		const selecteds = prestations
			.filter((p) => p !== null)
			.map((p, index) => {
				if (_a === defaultAspectRatio.length) _a = 0;
				if (_c === defaultColors.length) _c = 0;
				const fav = {
					id: index,
					aspectRatio: defaultAspectRatio[_a],
					color: defaultColors[_c],
					selected: false,
				};
				_c += 1;
				_a += 1;
				return fav;
			});
		console.log(selecteds);
		setFavorites(selecteds);
	}, [prestations]);
	useEffect(() => {
		setWidth((wWidth - Number(theme.spacing(3).replace(/\D/g, "")) * 3) / 2);
	}, [wWidth]);
	if (!width) return null;
	return (
		<Box sx={{ flex: 1 }}>
			{/* <ScrollView />
			<Footer /> */}
			<Box sx={{ margin: theme.spacing(0, 3) }}>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<Box sx={{ marginRight: 3 }}>
						{favorites
							.filter((_, i) => i % 2 !== 0)
							.map((favorite) => (
								<Favorite
									key={favorite.id}
									{...{ favorite }}
									width={width}
									// onPress={() =>
									// 	setSelectedFavorites((prev) => [...prev, favorite.id])
									// }
								/>
							))}
					</Box>
					<Box>
						{favorites
							.filter((_, i) => i % 2 === 0)
							.map((favorite) => (
								<Favorite
									key={favorite.id}
									{...{ favorite }}
									width={width}
								/>
							))}
					</Box>
				</Box>
				<Box height={100}></Box>
			</Box>
			<Footer
				label='Add to your favorites'
				deleteLabel='Remove All'
				onDelete={() => dispatch(actions.removeFavorites())}
				onPress={() => setFavorites((prev) => prev.filter((f) => f.selected))}
			/>
		</Box>
	);
}

export default index;
