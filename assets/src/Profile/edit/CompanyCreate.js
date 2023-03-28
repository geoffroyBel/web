import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";
import {
	motion,
	useAnimation,
	useInView,
	useScroll,
	useTransform,
} from "framer-motion";
import Select from "../ui/Select";
import { useTheme } from "@emotion/react";
import { minWidth } from "@mui/system";
import { Button, Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { forwardRef } from "react";
import Input from "../ui/Input";
import SliderField from "../ui/SliderField";
import png from "../../img/sport1.png";
import Rounded from "../ui/Rounded";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const squareVariants = {
	onscreen: { opacity: 1, transition: { duration: 2 } },
	offscreen: { opacity: 0 },
};
const labelVariants = {
	onscreen: { x: 0, transition: { duration: 2 } },
	offscreen: { x: -1000 },
};
const Card = styled(
	forwardRef((props, ref) => {
		return (
			<Box
				component={motion.div}
				variants={squareVariants}
				transition={{ staggerChildren: 0.5 }}
				{...props}
			/>
		);
	})
)(({ theme }) => ({
	padding: "2rem",
	borderRadius: theme.borderRadius.xl,
	backgroundColor: theme.palette.primary.main,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",

	[theme.breakpoints.up("md")]: {
		width: "70%",
	},
}));

const CardWrapper = styled(
	forwardRef((props, ref) => {
		const controls = useAnimation();
		const isInView = useInView(ref, { once: false, amount: 0.5 });
		useEffect(() => {
			console.log(props.id + "-" + isInView);
			if (isInView) {
				controls.start("onscreen");
			} else {
				controls.start("offscreen");
			}
		}, [controls, isInView]);

		return (
			<Box
				component={motion.div}
				animate={controls}
				initial='offscreen'
				transition={{ staggerChildren: 0.5 }}
				{...{ ref }}
				{...props}
			/>
		);
	})
)(({ theme }) => ({
	height: "100vh",
	width: "100vw",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));
const types = [
	{
		value: "1",
		label: "Skateboard",
	},
	{
		value: "2",
		label: "Break Dance",
	},
	{
		value: "3",
		label: "Moto Cross",
	},
	{
		value: "4",
		label: "Surf",
	},
	{
		value: "4",
		label: "Kite Surf",
	},
	{
		value: "4",
		label: "Voile",
	},
];
const formats = [
	{
		value: "1",
		label: "Collectif",
	},
	{
		value: "2",
		label: "particulier",
	},
	{
		value: "3",
		label: "stage",
	},
];
const fields = [
	{
		id: "1",
		name: "sports",
		label: "Votre Sport",
		desc: "Enseignez et partagez votre savoir, cliquer sur votre sports",
		input: () => (
			<Select
				sx={{ alignSelf: "strecth" }}
				name={"sport"}
				label={"Sport"}
				data={types}
				fullWidth
			/>
		),
	},
	{
		id: "2",
		label: "Name",
		desc: "Un nom pour votre cours",
		input: () => (
			<Input
				name='name'
				label='Title'
				placeholder={"Enter yout name"}
			/>
		),
	},
	{
		id: "3",
		label: "Format de cours",
		desc: "Choisissez le format qui vous correspond",
		input: () => (
			<Select
				sx={{ alignSelf: "strecth" }}
				name={"sport"}
				label={"Sport"}
				data={formats}
				fullWidth
			/>
		),
	},
	{
		id: "4",
		label: "tarif horaire",
		desc: "Fixez votre tarif ideal, pour etre plus attractive",
		input: () => (
			<SliderField
				min={0}
				max={30}
				name={`price`}
				label={"price"}
				autoComplete={"price"}
				autoFocus
			/>
		),
	},
];

export default () => {
	const [step, setStep] = useState(0);
	const { width } = useWindowDimensions();
	const { scrollYProgress } = useScroll();
	const refs = fields.map(() => useRef(null));
	const theme = useTheme();
	const colorStep = 1 / fields.length;
	const backgorundInput = new Array(fields.length)
		.fill(0)
		.map((_, index) => index * colorStep);

	useEffect(() => {
		scrollYProgress.onChange((ee) => {
			console.log(ee * width);
		});
		console.log(scrollYProgress.get());
	}, []);
	const background = useTransform(scrollYProgress, backgorundInput, [
		`linear-gradient(180deg, ${theme.palette.primary.light}, rgba(19, 120, 236, 0.73)),url(${png})`,
		`linear-gradient(180deg, ${theme.palette.primary.main}, rgba(42, 156, 255, 0.83)),url("${png}")`,
		`linear-gradient(180deg, ${theme.palette.primary.light}, rgba(19, 120, 236, 0.73)),url(${png})`,
		`linear-gradient(180deg, ${theme.palette.primary.light}, rgba(19, 120, 236, 0.93)),url(${png})`,
		// `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
		// "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
		// "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
	]);
	const handleSubmit = () => {
		if (step < fields.length - 1) {
			const _step = step + 1;
			refs[_step].current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "start",
			});
			setStep(_step);
		}
	};
	const backgroundImage = "url(../../img/sport1.png)";

	return (
		<>
			<Box
				sx={{
					zIndex: 1,
					position: "fixed",
					padding: "0 2rem",
					top: 0,
					width: "100%",
					height: 100,
					borderBottomRightRadius: 70,
					backgroundColor: "primary.main",
				}}>
				<Box
					sx={{
						position: "relative",

						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Button
						sx={{
							color: "background.light",

							paddingLeft: 0,
							width: "auto",
						}}
						variant='text'>
						{step + 1} / {fields.length}
					</Button>
					<Button
						sx={{
							color: "background.light",

							paddingLeft: 0,
							width: "auto",
						}}
						variant='text'>
						Skip
					</Button>
				</Box>
				<Box
					sx={{
						position: "relative",
						width: 1 / 1,
						height: 5,
						backgroundColor: "primary.light",
					}}>
					<Box
						component={motion.div}
						style={{ x: 0, scaleX: scrollYProgress }}
						sx={{
							height: "100%",
							backgroundColor: "white",
							transformOrigin: "top left",
						}}></Box>
				</Box>
			</Box>
			<Box
				sx={{
					zIndex: 1,
					position: "fixed",
					top: 100,
					left: 0,
					width: 70,
					height: 70,
				}}>
				<Rounded
					width={70}
					height={70}
					backgroundColor={theme.palette.primary.main}
				/>
			</Box>
			<Formik initialValues={{ sport: 1, price: 0 }}>
				{() => (
					<motion.form
						style={{
							position: "relative",
							backgroundImage: background,
							//backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.light}, rgba(19, 120, 236, 0.73)),url(${png})`,
							//backgroundImage: `linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%),url(${png})`,
							backgroundAttachment: "fixed",
							backgroundSize: "cover",
						}}>
						{fields.map((field, index) => {
							return (
								<CardWrapper
									id={field.id}
									ref={refs[index]}
									key={index}>
									<Card>
										<Stack spacing={2}>
											<Typography
												component={motion.div}
												variants={labelVariants}
												color='text.light'
												variant='h4'>
												{field.label}
											</Typography>
											<Typography
												component={motion.div}
												variants={labelVariants}
												color='text.light'
												variant='subtitle1'>
												{field.desc}
											</Typography>
											{field.input()}
											{/* <SliderField
												min={0}
												max={30}
												name={`price`}
												label={"price"}
												autoComplete={"price"}
												autoFocus
											/>
											<Select
												sx={{ alignSelf: "strecth" }}
												name={"sport"}
												label={"Sport"}
												data={types}
												fullWidth
											/>
											<Input
												name='title'
												label='Title'
												placeholder={"Enter yout name"}
											/> */}
										</Stack>
									</Card>
								</CardWrapper>
							);
						})}
						<Box
							sx={{
								position: "fixed",
								bottom: 100,
								right: "15%",
								width: 100,
								height: 100,
								borderRadius: "50%",
								backgroundColor: "primary.main",
							}}>
							<IconButton
								onClick={handleSubmit}
								aria-label='delete'
								sx={{ width: 100, height: 100 }}
								size='xl'>
								<ArrowForwardIosIcon
									sx={{ width: 50, height: 50, color: "background.light" }}
								/>
							</IconButton>
						</Box>
					</motion.form>
				)}
			</Formik>
		</>
		// <div>CompanyCreate</div>
	);
};
