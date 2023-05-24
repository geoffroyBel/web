import React, { useState } from "react";
import Box from "@mui/material/Box";
import useHeaderTitle from "../../hooks/useHeaderTitle";
import Footer from "./Footer";
import Favorite from "./Favorite";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useTheme } from "@mui/styles";
import { useEffect } from "react";

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
				onPress={() => setFavorites((prev) => prev.filter((f) => f.selected))}
			/>
		</Box>
	);
}

export default index;
