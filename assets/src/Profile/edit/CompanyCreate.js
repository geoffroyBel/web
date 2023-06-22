import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormikContext } from "formik";
import Box from "@mui/material/Box";
import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";
import {
	motion,
	useAnimation,
	useInView,
	useScroll,
	useTransform,
	useElementScroll,
} from "framer-motion";
import Select from "../ui/Select";
import { useTheme } from "@emotion/react";
import { minWidth } from "@mui/system";
import { ButtonBase, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { forwardRef } from "react";
import Input from "../ui/Input";
import SliderField from "../ui/SliderField";
import png from "../../img/sport1.png";
import Rounded from "../ui/Rounded";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import StepperBtn from "../components/StepperBtn";
import Stepper from "../components/Stepper";
import LinkButton from "../components/LinkButton";
import Form from "../components/Form";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import TextAreaField from "../ui/TextAreaField";
import SchedulerField from "../ui/SchedulerField";

const variantsMain = {
	open: { width: "60%" },
	closed: { width: "100%" },
};
const variantsAside = {
	open: { width: "30%", opacity: 1 },
	closed: { width: "0%", opacity: 0 },
};
const variantsStepContainer = {
	open: { width: 380 },
	closed: { width: "100%" },
};

const LAYOUT_W_POURCENT = 0.9;

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));
const Layout = styled("div")(({ theme }) => ({
	scrollSnapType: "y mandatory",
	overflowY: "scroll",
}));
const Container = styled("div")(({ theme }) => ({
	position: "relative",
	margin: "0 auto",
	display: "flex",
	flexDirection: "row",
	[theme.breakpoints.down("sm")]: {
		width: "90%",
	},
	[theme.breakpoints.up("sm")]: {
		width: "80%",
	},
}));
const Main = styled(motion.div)(({ theme }) => ({
	position: "relative",
	height: "100vh",
	width: "60%",
	// backgroundColor: "yellow",
}));
const Aside = styled(motion.div)(({ theme }) => ({
	[theme.breakpoints.down("sm")]: {
		display: "none",
	},
	position: "fixed",
	width: "30%",
	height: "100vh",
	top: 0,
	right: "calc(10%)",
	zIndex: 0,
}));
const Section = styled("section")(({ theme }) => ({
	width: "100%",
	// height: "100vh",
	scrollSnapAlign: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	// backgroundColor: "blue",
}));
const StepContainer = styled((props) => {
	return (
		<motion.div
			variants={variantsStepContainer}
			{...props}
		/>
	);
})(() => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	minHeight: "100vh",
	// backgroundColor: "orange",
}));
const StepActionContainer = styled("div")(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	flexDirection: "row",
}));
const ButtonAction = styled((props) => (
	<Button
		fullWidth={false}
		{...props}
	/>
))(({ theme }) => ({
	borderRadius: 5,
	padding: theme.spacing(1.5, 3),
}));

const Step = () => {};
const SectionAside = styled("section")(({ theme }) => ({
	width: "100%",
	height: "100vh",
	border: "solid 2px #ff9900",
	backgroundColor: "red",
	scrollSnapAlign: "center",
	position: "fluid",
	top: 0,
	left: 0,
}));
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
const sports = [
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
const types = [
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
				label={"Sports"}
				data={sports}
				fullWidth
			/>
		),
	},
	{
		id: "2",
		label: "Name",
		desc: "Un nom pour votre cours",
		input: () => (
			<Select
				sx={{ alignSelf: "strecth" }}
				name={"type"}
				label={"Types"}
				data={types}
				fullWidth
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
const STEPS = [
	[
		{
			id: 1,
			name: "sport",
			label: "Choisir une discipline sportive",
			description: "Selectectionner dans le menu la sport enseigné",
			stepLabel: "Choix du sport",
			input: () => (
				<>
					<Select
						sx={{ alignSelf: "strecth" }}
						name={"sport"}
						label={"Sport"}
						data={sports}
						fullWidth
					/>
					<LinkButton />
				</>
			),
			validationSchema: Yup.object({
				sport: Yup.number("sport non selectionner").required(
					"selectionnez votre sport"
				),
			}),
		},
		{
			id: 2,
			name: "type",
			label: "Choisir le type de service",
			description:
				"Selectectionner dans le menu ci dessous le votre type de service",
			stepLabel: "Type de Prestation",
			input: () => (
				<>
					<Select
						sx={{ alignSelf: "strecth" }}
						name={"type"}
						label={"Types"}
						data={types}
						fullWidth
					/>
					<LinkButton />
				</>
			),
			validationSchema: Yup.object({
				type: Yup.number("type non selectionner").required(
					"selectionnez votre type de service"
				),
			}),
		},
		{
			id: 3,
			name: "description",
			label: "Description de votre prestation",
			description:
				"ce texte sera destiné a informé vos clients et utilisateur de l aplication",
			stepLabel: "description",
			input: () => (
				<TextAreaField
					sx={{ alignSelf: "strecth" }}
					name={"description"}
					label={"Description"}
					fullWidth
				/>
			),
			validationSchema: Yup.object({
				type: Yup.number("type non selectionner").required(
					"selectionnez votre type de service"
				),
			}),
		},
	],
	[
		{
			id: 0,
			name: "description",
			label: "",
			description: "",
			stepLabel: "description",
			input: () => <SchedulerField name={"horaires"} />,
			validationSchema: Yup.object({}),
		},
	],
];
export default () => {
	const [step, setStep] = useState(0);
	const [page, setPage] = useState(0);
	const [isOpen, setIsOpen] = useState(true);
	const { errors = null, values = null } = useSelector(
		({ prestations }) => prestations.errors || {}
	);
	const { width } = useWindowDimensions();
	// const { scrollYProgress } = useScroll();
	const ref = useRef();
	const { scrollY, scrollYProgress } = useElementScroll(ref);
	// const refs = STEPS.map(() => useRef(null));

	const refs = STEPS.reduce(
		(p, c, index) => [...p, c.map((_) => useRef(null))],
		[]
	);
	const theme = useTheme();
	const colorStep = 1 / fields.length;
	const backgorundInput = new Array(fields.length)
		.fill(0)
		.map((_, index) => index * colorStep);

	useEffect(() => {
		console.log("relooooooooo");
		console.log(errors);
		// scrollYProgress.onChange((ee) => {
		// 	console.log(ee);
		// });
		// console.log(scrollYProgress.get());
	}, [errors]);
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
		console.log("declencheeur -----");
		if (step < STEPS[page].length - 1 && STEPS[page].length > 1) {
			const new_step = step + 1;
			setStep(new_step);
			refs[page][new_step].current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "start",
			});
		} else if (step === STEPS[page].length - 1 && STEPS.length > 1) {
			setIsOpen(false);
			const new_step = 0;
			const new_page = page + 1;
			setPage(1);
			setStep(new_step);
			refs[page][new_step].current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "start",
			});
		} else {
			childrens[step].props.onSubmit(values);
		}

		// if (step < STEPS[page].length - 1) {
		// 	const _step = step + 1;
		// 	refs[page][_step].current.scrollIntoView({
		// 		behavior: "smooth",
		// 		block: "center",
		// 		inline: "start",
		// 	});
		// 	setStep(_step);
		// }
	};
	const handlePrevious = () => {
		if (step > 0) {
			const _step = step - 1;
			refs[0][_step].current.scrollIntoView({
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

			<Layout ref={ref}>
				<Container>
					<Main
						animate={isOpen ? "open" : "closed"}
						variants={variantsMain}>
						<Form
							step={step}
							page={page}
							initialValues={{ price: 0 }}
							{...{ setPage }}
							{...{ setStep }}>
							{/* <SchedulerField name={"horaires"} /> */}
							{STEPS.map((page, j) => {
								return (
									<div key={j}>
										{page.map((item, index) => (
											<Section
												ref={refs[j][index]}
												key={`hh-${index}`}
												validationSchema={item.validationSchema}
												onSubmit={(values) => {
													handleSubmit();
												}}>
												<StepContainer animate={isOpen ? "open" : "closed"}>
													<Stack spacing={5}>
														<span>
															<Typography
																display='block'
																mb={1}
																variant='title'>
																{item.label}
															</Typography>
															<Typography variant='body'>
																{item.description}
															</Typography>
														</span>
														{item.input()}

														<StepActionContainer>
															<ButtonAction
																onClick={handlePrevious}
																variant='outlined'>
																Retour
															</ButtonAction>

															<ButtonAction
																type='submit'
																variant='contained'>
																Suivant
															</ButtonAction>
														</StepActionContainer>
													</Stack>
												</StepContainer>
											</Section>
										))}
									</div>
								);
							})}
							{/* {STEPS.map((item, index) => {
								return (
									<Section
										ref={refs[index]}
										key={`hh-${index}`}
										validationSchema={item.validationSchema}
										onSubmit={(values) => {
											console.log(values);
											handleSubmit();
										}}>
										<StepContainer>
											<Stack spacing={5}>
												<span>
													<Typography
														display='block'
														mb={1}
														variant='title'>
														{item.label}
													</Typography>
													<Typography variant='body'>
														{item.description}
													</Typography>
												</span>
												{item.input()}

												<StepActionContainer>
													<ButtonAction
														onClick={handlePrevious}
														variant='outlined'>
														Retour
													</ButtonAction>

													<ButtonAction
														type='submit'
														variant='contained'>
														Suivant
													</ButtonAction>
												</StepActionContainer>
											</Stack>
										</StepContainer>
									</Section>
								);
							})} */}
						</Form>
						{/* <Formik
							onSubmit={async (values, helpers) => {
								console.log(values);
							}}
							initialValues={{ sport: 1, price: 0 }}>
							{() => (
								<Form
									autoComplete='off'
									style={{
										// position: "relative",
										// backgroundImage: background,
										//backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.light}, rgba(19, 120, 236, 0.73)),url(${png})`,
										//backgroundImage: `linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%),url(${png})`,
										backgroundAttachment: "fixed",
										backgroundSize: "cover",
									}}>
									{STEPS.map((item) => (
										<Section key={item.id}>
											<StepContainer>
												<Stack spacing={5}>
													<span>
														<Typography
															display='block'
															mb={1}
															variant='title'>
															{item.label}
														</Typography>
														<Typography variant='body'>
															{item.description}
														</Typography>
													</span>

													<Select
														sx={{ alignSelf: "strecth" }}
														name={"sport"}
														label={"Sport"}
														data={types}
														fullWidth
													/>
													<LinkButton />
													<StepActionContainer>
														<ButtonAction variant='outlined'>
															Retour
														</ButtonAction>

														<ButtonAction variant='contained'>
															Suivant
														</ButtonAction>
													</StepActionContainer>
													<Button
														// disabled={childrens[step].props.fields.some(
														// 	(name) => values[name] == ""
														// )}
														fullWidth
														type='submit'
														color='primary'
														variant='contained'>
														Submit
													</Button>
												</Stack>
											</StepContainer>
										</Section>
									))}
								</Form>
							)}
						</Formik> */}
					</Main>
					<Aside
						animate={isOpen ? "open" : "closed"}
						variants={variantsAside}>
						<Stepper
							y={scrollY}
							steps={STEPS[0]}
							errors={errors}
							values={values}
						/>
					</Aside>
				</Container>
			</Layout>

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
			{/* <Formik initialValues={{ sport: 1, price: 0 }}>
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
			</Formik> */}
		</>
		// <div>CompanyCreate</div>
	);
};
