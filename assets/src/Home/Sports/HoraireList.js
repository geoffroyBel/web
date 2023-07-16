import React, { useState, forwardRef, useEffect } from "react";
import {
	Container,
	Box,
	AppBar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	Toolbar,
	Typography,
	Link,
	useMediaQuery,
	IconButton,
	ButtonBase,
} from "@mui/material";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
	motion,
	useMotionValue,
	useTransform,
	useSpring,
	useTime,
} from "framer-motion";

import StarIcon from "@mui/icons-material/StarBorder";
import { makeStyles, styled, useTheme } from "@mui/styles";
import DayjsUtils from "@date-io/dayjs";
import {
	getHoraireByDay,
	getHoraireByWeek,
} from "../../Profile/utils/RRuleFormated.js";

const weekOfYear = require("dayjs/plugin/weekOfYear");
require("dayjs/locale/fr");

const dateFns = new DayjsUtils();
dateFns.dayjs.extend(weekOfYear);
const Layout = styled(Container)(({ theme }) => ({
	paddingBottom: theme.spacing(5),
	cursor: "grab",
	overflow: "hidden",
}));
const Wrapper = styled(Box)(({ theme, width = 0 }) => ({
	position: "relative",
	width,
	display: "flex",
	flexDirection: "row",
}));
const Header = styled(Box)(({ theme }) => ({
	position: "relative",
	flex: 1,
	width: "100%",
	display: "flex",
	height: 40,
	flexDirection: "row",
	backgroundColor: theme.palette.secondary.light,
}));
const DayButton = styled(ButtonBase)(({ theme }) => ({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
}));
const Cell = styled(Box)(({ theme, isLast }) => {
	return {
		flex: 1,
		//height: 100,
		//borderRight: isLast ? "none" : "solid",
		borderRightWidth: 0.5,
		zIndex: 1,
	};
});
const Day = styled(Box)(({ theme, width = 0, left = 0 }) => ({
	//flex: 1,
	left: left,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	position: "absolute",
	height: 40,
	width,
}));
const DayCursor = styled(Box)(({ theme, width = 0, left = 0 }) => ({
	//flex: 1,

	display: "flex",
	position: "absolute",
	backgroundColor: theme.palette.secondary.main,
	left: 0,
	bottom: 0,
	height: 2,
	zIndex: 0,
	width,
}));

const useStyles = makeStyles((theme) => ({
	"@global": {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: "none",
		},
	},
}));
const DayHeader = ({ x, index, width, dateString, isActive }) => {
	// const _x = useTransform(
	// 	x,
	// 	[(index + 1) * -width, index * -width, (index - 1) * -width],
	// 	[width, 0, -width],
	// 	{ clamp: true }
	// );
	const scale = useTransform(
		x,
		[(index + 1) * -width, index * -width, (index - 1) * -width],
		[0, 1, 0],
		{ clamp: true }
	);

	return (
		<Day
			component={motion.div}
			style={{
				//x: _x,
				scale,
				opacity: scale,
			}}
			{...{ width }}
			//left={index * width}
		>
			{isActive && (
				<Typography
					letterSpacing={1}
					fontWeight='Light'
					color={"secondary.main"}
					variant='h5'>
					{dateFns.dayjs(dateString).locale("fr").format("dddd DD MMMM")}
				</Typography>
			)}
		</Day>
	);
};
export default forwardRef(
	(
		{
			abonnement = null,
			prestation,
			date,
			horaires: horairesProps,
			handleAddReservation,
			handleRemoveReservation,
		},
		ref
	) => {
		const theme = useTheme();
		const classes = useStyles();
		const [currentDate, setCurrentDate] = useState(date);
		const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
		const [options, setOptions] = useState({
			page_length: 3,
			days_per_page: 7,
			days_count: 3 * 7,
		});
		const [horaires, setHoraires] = useState([]);
		const [weeks, setWeeks] = useState([]);
		const [data, setData] = useState([]);
		const [width, setWidth] = useState(0);
		const [dragConstraints, setDragConstraints] = useState({
			right: 0,
			left: -600,
		});
		const [wrapperWidth, setWrapperWidth] = useState(0);
		// const [currentDate, setCurrentDate] = useState("2022-12-05");
		const cells = ["1", "2", "3"];
		const [input, setInput] = useState([
			0, 0 /*,
		-width / options.days_per_page,
		(-width / options.days_per_page) * 2,*/,
		]);
		const [output, setOutput] = useState([0, 0 /*, -1235, -1235 * 2*/]);
		const [outputCursorOpacity, setOutputCursorOpacity] = useState([0, 0]);

		const [outputCursor, setOutputCursor] = useState([
			0, 0 /*, -1235, -1235 * 2*/,
		]);
		let x = useMotionValue(0);
		let x_day = useMotionValue(0);
		x = useTransform(x_day, input, output, { clamp: true });
		let xCursor = useTransform(x_day, input, outputCursor, { clamp: true });
		let opacity = useTransform(x_day, input, outputCursorOpacity, {
			clamp: true,
		});
		useEffect(() => {
			if (prestation && horairesProps) {
				const date = dateFns.dayjs(currentDate).locale("fr");
				const range = {
					from: date.subtract(date.weekday(), "day").subtract(7, "day"),
					to: date
						.subtract(date.weekday(), "day")
						.subtract(7, "day")
						.add(options.days_count, "day"),
				};

				const _weeks = getHoraireByWeek(horairesProps, range);

				// const _weeks = new Array(3).fill(range.from).reduce((acc, d, i) => {
				// 	const week_of_year = d.add(i, "week").locale("fr").week();
				// 	if (!acc[`${week_of_year}`]) {
				// 		acc[`${week_of_year}`] = null;
				// 	}
				// 	if (w[`${week_of_year}`]) {
				// 		acc[`${week_of_year}`] = w[`${week_of_year}`];
				// 	}
				// 	return acc;
				// }, {});
				const _horaires = Object.entries(_weeks).reduce(
					(acc, [weekOfYear, week]) => {
						if (!week) {
							const key = dateFns
								.dayjs()
								.locale("fr")
								.week(weekOfYear)
								.weekday(0)

								.format("YYYY-MM-DD");
							acc[key] = null;
							return acc;
						}

						Object.entries(week).forEach(([key, day]) => {
							acc[key] = day;
						});
						return acc;
					},
					{}
				);

				const h_entries = sortHoraires(Object.entries(_horaires));

				setInput(
					h_entries.map(([_, h], i) => {
						return i * -width;
					})
				);
				//
				let diff = 0;
				let currentWeek = dateFns.dayjs(h_entries[0][0]).locale("fr").week();
				setOutput(
					h_entries.map(([dateString, h], i) => {
						const diff_week =
							currentWeek - dateFns.dayjs(dateString).locale("fr").week();

						return width * diff_week;
					})
				);
				//
				setOutputCursorOpacity(
					h_entries.map(([dateString, day], i) => {
						if (!day) {
							return 0;
						}
						return 1;
					})
				);
				//
				setOutputCursor(
					h_entries.map(([dateString, h], i) => {
						const dt1 = dateFns.dayjs(dateString).locale("fr");

						if (i > 0) {
							//const dt1 = dateFns.dayjs(dateString);

							diff += dt1.diff(h_entries[i - 1][0], "day") - 1;
							return (width / options.days_per_page) * (i + diff);
						}
						diff += dt1.weekday();
						return (width / options.days_per_page) * dt1.weekday();
					})
				);

				setWeeks(_weeks);
				setHoraires(_horaires);
				setData(
					new Array(options.days_count).fill(0).reduce((acc, d, index) => {
						const key = range.from.add(index, "day").format("YYYY-MM-DD");
						if (_horaires[key]) {
							acc[key] = _horaires[key];
						} else {
							acc[key] = [];
						}
						return acc;
					}, {})
				);
			}
		}, [prestation, horairesProps, currentDate, options, width]);

		useEffect(() => {
			const _weeks = Object.entries(weeks);
			if (_weeks.length) {
				const [weekOfYear, weekDays] = _weeks[1];
				const [_, prevWeekDays] = _weeks[0];
				const left_cell_length = prevWeekDays
					? Object.values(prevWeekDays).length
					: 1;
				if (weekDays) {
					const index = sortHoraires(Object.keys(weekDays)).indexOf(
						currentDate
					);
					const w = index >= 0 ? index * -width : 0;
					x_day.set(-width * left_cell_length + w);
				} else {
					x_day.set(-width * left_cell_length);
				}
				// const index = Object.keys(_weeks[1][1]).indexOf(currentDate);
				// const w = index >= 0 ? index * -width : 0;
				// x_day.set(-width * Object.values(weeks[0]).length + w);
			}
		}, [weeks, currentDate]);
		// useEffect(() => {
		// 	if (matches) {
		// 		setOptions({
		// 			...options,
		// 			days_per_page: 5,
		// 			days_count: 5 * 7,
		// 		});
		// 	}
		// }, [matches]);

		useEffect(
			() =>
				x_day.onChange((latest) => {
					if (dragConstraints.left == latest) {
						console.log("Next");
						const weeksEntries = Object.entries(weeks);
						const [weekOfYear, weekDays] =
							weeksEntries[weeksEntries.length - 1];
						let dateString;
						if (weekDays) {
							const keys = sortHoraires(Object.keys(weekDays));
							dateString = keys[keys.length - 1];
						} else {
							dateString = dateFns
								.dayjs()
								.locale("fr")
								.week(weekOfYear)
								.weekday(6)
								.format("YYYY-MM-DD");
						}
						setCurrentDate(dateString);
					} else if (latest == 0) {
						const weeksEntries = Object.entries(weeks);
						const [weekOfYear, weekDays] = weeksEntries[0];

						const dateString = weekDays
							? sortHoraires(Object.keys(weekDays))[0]
							: dateFns
									.dayjs()
									.locale("fr")
									.week(weekOfYear)
									.weekday(6)
									.format("YYYY-MM-DD");

						setCurrentDate(dateString);
						console.log("previous");
						console.log(dateString);
					}
				}),
			[horaires, width, dragConstraints]
		);

		useEffect(() => {
			if (ref.current) {
				setWidth(ref.current.offsetWidth);
				setDragConstraints({
					right: 0,
					left:
						ref.current.offsetWidth *
						(Object.entries(horaires).length - 1) *
						-1,
				});
				setWrapperWidth(width * cells.length);
			}
		}, [ref.current, horaires]);
		const sortHoraires = (array) => {
			return array.sort(function (a, b) {
				if (typeof a === "object") {
					return (
						dateFns.dayjs(a[0]).locale("fr").valueOf() -
						dateFns.dayjs(b[0]).locale("fr").valueOf()
					);
				} else {
					return (
						dateFns.dayjs(a).locale("fr").valueOf() -
						dateFns.dayjs(b).locale("fr").valueOf()
					);
				}
			});
		};
		const handleDragEnd = (evt) => {
			console.log(x.getVelocity());
			x.set(0);
		};
		const renderListCell = () => {
			const _data = Object.entries(horaires).sort(function (a, b) {
				return (
					dateFns.dayjs(a[0]).locale("fr").valueOf() -
					dateFns.dayjs(b[0]).locale("fr").valueOf()
				);
			});

			return _data.map(([key, _horaires], index) => {
				return (
					<Cell
						key={key}
						component={motion.div}>
						{_horaires ? (
							_horaires.map((h, index) => {
								const date = dateFns.dayjs(key).locale("fr");
								const startTime = dateFns.dayjs(h.startDate).format("HH:mm");
								const endTime = dateFns.dayjs(h.endDate).format("HH:mm");
								const startDate = dateFns
									.dayjs(`${key}T${startTime}:00`)
									.format("YYYY-MM-DDTHH:mm:ssZ");
								const endDate = dateFns
									.dayjs(`${key}T${endTime}:00`)
									.format("YYYY-MM-DDTHH:mm:ssZ");
								return (
									<Card
										key={index}
										sx={{ flex: 1, margin: 1 }}>
										<CardHeader
											avatar={
												<IconButton aria-label='settings'>
													<CalendarMonthIcon />
												</IconButton>
											}
											title={
												<Box
													sx={{
														display: "flex",
														flexDirection: "column",
														textTransform: "capitalize",
														color: "textPrimary",
													}}>
													<div>{date.format("dddd DD MMMM")}</div>
												</Box>
											}
											// subheader={
											// 	<Box
											// 		sx={{
											// 			display: "flex",
											// 			flexDirection: "column",
											// 			textTransform: "capitalize",
											// 		}}>
											// 		<div>gggg</div>
											// 	</Box>
											// }
										/>
										<CardContent>
											<Box
												sx={{
													display: "flex",
													flexDirection: "column",
													justifyContent: "center",
													alignItems: "center",
												}}>
												{/* <Typography variant='h6' color='textSecondary'>
											Mardi
										</Typography> */}
												<Typography
													component='h2'
													variant='h3'
													color='textPrimary'>
													{startTime} - {endTime}
												</Typography>
											</Box>
										</CardContent>
										<CardActions>
											<Button
												onClick={() => {
													if (!abonnement) {
														alert("No ABT");
														return;
													}
													const reservation = {
														horaireId: h.id,
														abonnementId: abonnement.id,
														startDate,
														endDate,
														id: 233 || null,
													};

													if (h.reservationID) {
														setCurrentDate(key);
														console.log(h);
														handleRemoveReservation(h.reservationID);
													} else {
														setCurrentDate(key);

														handleAddReservation(reservation);
													}
												}}
												fullWidth
												color='primary'>
												{h.reservationID ? "Annuler" : "Reserver"}
											</Button>
										</CardActions>
									</Card>
								);
							})
						) : (
							<Card
								key={index}
								sx={{ flex: 1, margin: 1 }}>
								<CardContent>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
										}}>
										{/* <Typography variant='h6' color='textSecondary'>
											Mardi
										</Typography> */}
										<Typography
											component='h2'
											variant='h3'
											color='textPrimary'>
											No Stuff
										</Typography>
									</Box>
								</CardContent>
							</Card>
						)}
					</Cell>
				);
			});
			// return ;
		};
		const spring = useSpring(0);
		useEffect(() => {
			function updateOpacity() {
				x_day.set(spring.get());
			}
			const unsubscribeSpring = spring.onChange(updateOpacity);
			// spring.onChange((latest) => {
			// 	x_day.set(latest);
			// });
		}, [spring]);
		const renderCell = () => {
			const _data = Object.entries(data);
			return _data.map(([key, _horaires], index) => {
				const date = dateFns.dayjs(key).locale("fr");
				return (
					<DayButton
						sx={{
							flex: 1,
							overflow: "hidden",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							opacity: _horaires.length ? 1 : 0.5,
						}}
						onClick={() => {
							const index = Object.keys(horaires).indexOf(key);
							if (index >= 0) {
								//x_day = useSpring(-1235 * index, { damping: 300, stiffness: 200 });
								spring.set(-width * index);
							}
						}}
						key={key}
						disabled={_horaires.length ? false : true}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								flex: 1,
								width: "100%",
							}}>
							<Typography
								fontWeight={_horaires.length ? "Bold" : "Light"}
								letterSpacing={1}
								textTransform='capitalize'
								variant='body2'
								color='textSecondary'>
								{matches
									? date.format("dd").substring(0, 1)
									: date.format("ddd")}
							</Typography>
							<Typography
								fontWeight={_horaires.length ? "Bold" : "Light"}
								component='h2'
								variant={_horaires.length ? "h5" : "h5"}
								color='textPrimary'
								gutterBottom>
								{date.format("DD")}
							</Typography>
						</Box>
					</DayButton>
				);
			});
			return;
		};
		const snap = (target) => {
			// let index = Math.round(target / width) * -1;
			// const entries = Object.entries(data);
			// let horaires = entries[index][1];
			// let max = 0;
			// while (horaires.length === 0 && max < entries.length) {
			// 	index++;
			// 	max++;
			// 	horaires = entries[index][1];
			// }
			// // console.log(index);
			// // console.log(selectedDate);
			// return index * -1 * width;
			return Math.round(target / width) * width;
		};

		return (
			<Layout
				component={motion.div}
				{...{ ref }}
				maxWidth={false}
				disableGutters>
				<Wrapper
					width={Object.keys(data).length * (width / options.days_per_page)}
					//{...{ dragConstraints }}
					dragTransition={{
						power: 0.3,
						timeConstant: 200,
						// Snap calculated target to nearest 50 pixels
						modifyTarget: (target) =>
							Math.round(target / (width / options.days_per_page)) *
							(width / options.days_per_page),
					}}
					drag={"x"}
					style={{ x: x }}
					component={motion.div}>
					{renderCell()}
					<DayCursor
						style={{ x: xCursor, scaleX: opacity }}
						component={motion.div}
						width={width / options.days_per_page}
					/>
				</Wrapper>
				<Header>
					{Object.entries(horaires).map(([dateString, day], i) => {
						const index = i;
						return (
							<DayHeader
								{...{ dateString }}
								key={i}
								x={x_day}
								index={i}
								width={width}
								isActive={day ? true : false}></DayHeader>
						);
						// const jj = useTransform(
						// 	useMotionValue(6),
						// 	[(index + 1) * -width, index * -width, (index - 1) * -width],
						// 	[-width, 0, width],
						// 	{ clamp: true }
						// );
						//console.log(_x.current);
						// return (
						// 	<Day
						// 		component={motion.div}
						// 		// style={{
						// 		// 	x: useTransform(
						// 		// 		x_day,
						// 		// 		[0,0],
						// 		// 		[0,0],
						// 		// 		{ clamp: true }
						// 		// 	),
						// 		// }}
						// 		{...{ width }}
						// 		left={index * width}>
						// 		hhhhhh
						// 	</Day>
						// );
					})}
				</Header>
				<Wrapper
					width={Object.entries(horaires).length * width}
					{...{ dragConstraints }}
					// ={{
					// 	right: 0,
					// 	left: width * (Object.entries(horaires).length - 1) * -1,
					// }}
					//onPanStart={() => spring.set(0, true)}
					dragTransition={{
						power: 0.3,
						timeConstant: 200,
						// Snap calculated target to nearest 50 pixels
						modifyTarget: snap,
					}}
					drag={"x"}
					style={{ x: x_day }}
					component={motion.div}>
					{renderListCell()}
					{/* {new Array(options.days_count).fill(0).map((c, index) => {
					return (
						<Cell
							key={index}
							component={motion.div}
							isLast={options.days_count - 1 === index}>
							{renderListCell()}
						</Cell>
					);
				})} */}
				</Wrapper>
			</Layout>
		);
	}
);
