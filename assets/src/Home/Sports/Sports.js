import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	useCallback,
} from "react";
import Card from "./Card";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import Box from "@mui/material/Box";
import MenuContext from "../../context/MenuContext";
import Background from "./Background";
import Categories from "./Categories";
import * as actions from "../../store/actions/prestation";
import * as actionFavorites from "../../store/actions/favorite";
import { useDispatch, useSelector } from "react-redux";
import useHeaderTitle from "../../hooks/useHeaderTitle";
import Swipeable from "./Swipeable";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const cards = [{ index: 3 }, { index: 2 }, { index: 1 }, { index: 0 }];
const step = 1 / (cards.length - 1);
export const Sports = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	const topCard = useRef(null);
	const dispatch = useDispatch();
	useHeaderTitle("Coaches");
	const prestations = useSelector(
		({ prestations }) => prestations.availablePrestations
	);
	const { user } = useSelector(({ auth }) => auth);
	const [slides, setSlides] = useState([
		{ index: 3 },
		{ index: 2 },
		{ index: 1 },
		{ index: 0 },
	]);
	const [init, setInit] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [currentIndex, setCurrentIndex] = useState(0);
	const aIndex = useSpring(2);
	const parent_scale = useMotionValue(0);

	useEffect(() => {
		alert(currentPage);
		dispatch(actions.fetchPrestations(currentPage));
	}, [currentPage]);

	useEffect(() => {
		if (selectedCategory) {
			//setCurrentPage(1);
			setCurrentIndex(0);
			setInit(true);
			dispatch(actions.fetchPrestations(1, selectedCategory));
		}
	}, [selectedCategory]);

	useEffect(() => {
		if (!prestations.length) return;
		console.log("init", init);
		let _slides = [];
		if (init) {
			console.log("initialisation");
			let index = parseInt(currentIndex / step);
			for (let i = 3; i >= 0; i--) {
				_slides.push({ index: i, item: prestations[index] });
				index++;
			}
			setSlides(_slides);
			setInit(false);
		} else {
			console.log("pile element sup");
			_slides = [...slides];
			console.log(slides[3].index);
			const current = _slides.pop();
			// console.log(slides.pop().index);
			// console.log(current.index);
			current.index += 4;
			current.item = prestations[current.index];
			_slides = [current, ..._slides];
			setSlides(_slides);
			setCurrentIndex((prev) => prev + step);
			// console.log(prestations);
		}
	}, [prestations]);

	useEffect(() => {
		aIndex.set(currentIndex);

		console.log("currentIndex:", currentIndex);
	}, [currentIndex]);
	const onSwipe = useCallback(
		(shouldAddToFavorites = false) => {
			console.log("new next index", slides[3].index);
			if (shouldAddToFavorites)
				dispatch(actionFavorites.addFavorite(slides[slides.length - 1].item));
			if (!prestations[parseInt(currentIndex / step) + 4]) {
				setCurrentPage((prev) => prev + 1);
			} else {
				const _data = [...slides];
				const current = _data.pop();
				current.index += slides.length;
				current.item = prestations[current.index];
				console.log([current, ..._data]);
				console.log("next -----", current.index);
				setCurrentIndex((prev) => prev + step);
				setSlides([current, ..._data]);
			}
			console.log("c quoi le delire");
			// setSlides([current, ..._data]);
			// setCurrentIndex((prev) => prev + step);
		},
		[slides]
	);

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
			<Categories handleSelect={setSelectedCategory} />
			<Box
				sx={{
					width: "100%",
					flex: 1,
					position: "relative",
				}}>
				{slides.length > 0 &&
					slides.map(({ index, item }, i) => {
						const onTop = i === slides.length - 1;
						const ref = onTop ? topCard : null;
						const position = useTransform(
							aIndex,
							(value) => index * step - value
						);
						if (currentIndex < index * step + step) {
							return (
								<Swipeable
									ref={ref}
									key={index}
									{...{ user }}
									{...{ position }}
									{...{ index }}
									{...{ aIndex }}
									{...{ step }}
									{...{ onSwipe }}
									{...{ item }}
									{...{ parent_scale }}
								/>
							);
						}
					})}
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					paddingBottom: "20px",
					zIndex: 99,
				}}>
				<Box
					sx={{
						width: 345,
						display: "flex",
						justifyContent: "space-around",
					}}>
					<IconButton
						color='error'
						size='large'
						onClick={() => {
							topCard.current?.swipeLeft();
						}}
						flex={1}
						sx={{
							backgroundColor: "white",
							"&:hover, &.Mui-focusVisible": {
								backgroundColor: "primary.ultraLight",
							},
						}}
						aria-label='delete'>
						<CloseIcon fontSize='inherit' />
					</IconButton>
					<IconButton
						color='success'
						size='large'
						onClick={() => {
							topCard.current?.swipeRight();
						}}
						flex={1}
						sx={{
							backgroundColor: "white",
							"&:hover, &.Mui-focusVisible": {
								backgroundColor: "primary.ultraLight",
							},
						}}
						aria-label='delete'>
						<CheckIcon fontSize='inherit' />
					</IconButton>
				</Box>
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
