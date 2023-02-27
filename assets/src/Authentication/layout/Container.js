import React from "react";
import { Box } from "@mui/material";
import useDimensions from "../../hooks/useDimensions";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useTheme } from "@emotion/react";

const assets = [require("../../img/sport1.png")];
const aspectRatio = 1075 / 1768;
function Container({ children, footer, ...rest }) {
	const theme = useTheme();
	const { height, width } = useWindowDimensions();

	return (
		<Box {...rest} flexDirection='column' display='flex' minHeight={"100vh"}>
			<Box
				overflow='hidden'
				height={height * 0.2}
				sx={{ borderBottomLeftRadius: 50 }}
				bgcolor='primary.main'>
				<img
					src={assets[0]}
					style={{
						width,
						height: width * aspectRatio,
						borderBottomLeftRadius: 50,
					}}
				/>
			</Box>
			<Box
				overflow={"hidden"}
				position={"relative"}
				display={"flex"}
				flexDirection='column'
				bgcolor={"primary.main"}
				flex={1}>
				<img
					src={assets[0]}
					style={{
						zIndex: 0,
						position: "absolute",
						left: 0,
						top: -height * 0.2,
						// opacity: 0.5,
						width,
						height: width * aspectRatio,
					}}
				/>
				<Box
					flex={1}
					display='flex'
					flexDirection='column'
					justifyContent={"center"}
					alignItems='center'
					sx={{
						zIndex: 0,
						borderTopRightRadius: 50,
						borderBottomRightRadius: 50,
						borderBottomLeftRadius: 50,
					}}
					bgcolor='background.light'>
					{children}
				</Box>
				<Box
					display='flex'
					justifyContent='center'
					flexDirection='column'
					alignItems='center'
					zIndex={1}
					pb={theme.spacing(2)}
					bgcolor='primary.main'>
					{footer}
				</Box>
			</Box>
		</Box>
	);
}
// Debut nbreCpies (Entier)
// prices <-- 0
// SI nbreCpies <= 10
// 	price <-- nbreCpies * 0.10

// si nbreCpies >10 and nbreCpies <= 30
// 	price <-- price + 10 * 0.10
// 	price <-- price (nbreCpies - 10) * 0.9
// si nbreCpies > 30
// 	price <-- price + 10 * 0.10
// 	price <-- price + (nbreCpies - 10) * 0.9
// 	price <-- price + (nbreCpies - 30) * 0.8
// Ecrire price

export default Container;
