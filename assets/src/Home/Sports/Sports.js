import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import Box from "@mui/material/Box";
import MenuContext from "../../context/MenuContext";
import Background from "./Background";
import Categories from "./Categories";
const cards = [{ index: 3 }, { index: 2 }, { index: 1 }, { index: 0 }];
const step = 1 / (cards.length - 1);
export const Sports = () => {
	const { setHeaderTitle } = useContext(MenuContext);
	const [currentIndex, setCurrentIndex] = useState(0);
	const aIndex = useSpring(2);

	useEffect(() => setHeaderTitle("Coaches"), []);
	useEffect(() => {
		aIndex.set(currentIndex);
	}, [currentIndex]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				position: "relative",
				flex: 1,
				overflow: "hidden",
			}}>
			<Background />
			<Categories />
			<Box
				sx={{
					width: "100%",
					flex: 1,
					position: "relative",
				}}>
				{cards.map(({ index }) => {
					const position = useTransform(
						aIndex,
						(value) => index * step - value
					);
					if (currentIndex < index * step + step) {
						return (
							<Card
								key={index}
								{...{ position }}
								{...{ index }}
								{...{ aIndex }}
								{...{ step }}
								onSwipe={() => setCurrentIndex((prev) => prev + step)}
							/>
						);
					}
				})}
			</Box>
		</Box>
	);
	return (
		<div
			style={{
				position: "relative",
				flex: 1,
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "black",
				overflow: "hidden",
			}}>
			<div
				style={{
					position: "relative",
					width: "80%",
					height: "600px",
				}}>
				{cards.map(({ index }) => {
					const position = useTransform(
						aIndex,
						(value) => index * step - value
					);
					if (currentIndex < index * step + step) {
						return (
							<Card
								key={index}
								{...{ position }}
								{...{ index }}
								{...{ aIndex }}
								{...{ step }}
								onSwipe={() => setCurrentIndex((prev) => prev + step)}
							/>
						);
					}
				})}
				{/* <Card position={useMotionValue(1)} />
				<Card position={useMotionValue(0.5)} />
				<Card position={useMotionValue(0)} /> */}
			</div>
		</div>
	);
};
