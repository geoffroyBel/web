import React, { useCallback, useEffect, useRef, useState } from "react";
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
	AnimatePresence,
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
import { useDispatch, useSelector } from "react-redux";
import TextAreaField from "../ui/TextAreaField";
import SchedulerField from "../ui/SchedulerField";
import * as actionCategories from "../../store/actions/category";
import * as actionPrestations from "../../store/actions/prestation";
import * as actionHoraires from "../../store/actions/horaire";
import * as actionTarifs from "../../store/actions/tarif";
import StepContainer from "./StepContainer";
import Header from "./Header";
import useFetchCatgoriesTypes from "../../hooks/useFetchPrestationsOptions";
import useFetchPrestationsOptions from "../../hooks/useFetchPrestationsOptions";
import PriceEdit from "./PriceEdit";
import RadioGroupComponent from "../ui/RadioGroupComponent";
import TextField from "../ui/TextField";
import ImageProfileField from "../../Authentication/components/form/ImageProfileField";
import ImageField from "../ui/ImageField";

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
const ButtonAction = styled((props) => (
	<Button
		fullWidth={false}
		{...props}
	/>
))(({ theme }) => ({
	borderRadius: 5,
	padding: theme.spacing(1.5, 3),
}));
// const fields = [
// 	{
// 		id: "1",
// 		name: "sports",
// 		label: "Votre Sport",
// 		desc: "Enseignez et partagez votre savoir, cliquer sur votre sports",
// 		input: () => (
// 			<Select
// 				sx={{ alignSelf: "strecth" }}
// 				name={"sport"}
// 				label={"Sports"}
// 				data={sports}
// 				fullWidth
// 			/>
// 		),
// 	},
// 	{
// 		id: "2",
// 		label: "Name",
// 		desc: "Un nom pour votre cours",
// 		input: () => (
// 			<Select
// 				sx={{ alignSelf: "strecth" }}
// 				name={"type"}
// 				label={"Types"}
// 				data={types}
// 				fullWidth
// 			/>
// 		),
// 	},
// 	{
// 		id: "3",
// 		label: "Format de cours",
// 		desc: "Choisissez le format qui vous correspond",
// 		input: () => (
// 			<Select
// 				sx={{ alignSelf: "strecth" }}
// 				name={"sport"}
// 				label={"Sport"}
// 				data={formats}
// 				fullWidth
// 			/>
// 		),
// 	},
// 	{
// 		id: "4",
// 		label: "tarif horaire",
// 		desc: "Fixez votre tarif ideal, pour etre plus attractive",
// 		input: () => (
// 			<SliderField
// 				min={0}
// 				max={30}
// 				name={`price`}
// 				label={"price"}
// 				autoComplete={"price"}
// 				autoFocus
// 			/>
// 		),
// 	},
// ];
const STEPS = [
	[
		{
			id: 1,
			name: "image",
			label: "Uploader une image",
			description: "cette image illustrera ce service",
			stepLabel: "Image non obligatoire",
			inputType: "image",
			onSubmit: null,
			validationSchema: Yup.object({}),
		},

		{
			id: 2,
			name: "type",
			label: "Choisir le type de service",
			description:
				"Selectectionner dans le menu ci dessous le votre type de service",
			stepLabel: "Type de Prestation",
			inputType: "select",
			onSubmit: null,
			validationSchema: Yup.object({
				type: Yup.number("type non selectionner").required(
					"selectionnez votre type de service"
				),
			}),
		},
		{
			id: 3,
			name: "sport",
			label: "Choisir une discipline sportive",
			description: "Selectectionner dans le menu la sport enseigné",
			stepLabel: "Choix du sport",
			inputType: "select",
			onSubmit: null,
			validationSchema: Yup.object({
				sport: Yup.number("sport non selectionner").required(
					"selectionnez votre sport"
				),
			}),
		},

		{
			id: 4,
			name: "description",
			label: "Description de votre prestation",
			description:
				"ce texte sera destiné a informé vos clients et utilisateur de l aplication",
			stepLabel: "description",
			inputType: "textArea",
			onSubmit: actionPrestations.createPrestation,
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
			name: "horaires",
			label: "",
			description: "",
			stepLabel: "description",
			inputType: "schedulerField",
			fullWidth: true,
			onSubmit: actionHoraires.createHoraire,
			//input: () => <SchedulerField name={"horaires"} />,
			validationSchema: Yup.object({}),
		},
	],
	[
		{
			id: 0,
			name: "tarifs",
			fieldName: "tarifs",
			label: "Choisir le type de tarif",
			description:
				"Deux type de tarifs vous sont proposés: forfait de plusieurs entrées ou par abonnements",
			stepLabel: "Type de tarif",
			inputType: "radioGroup",
			//input: () => <SchedulerField name={"horaires"} />,
			validationSchema: Yup.object({
				// tarif: Yup.array().max(1).required("ola"),
				// credits: Yup.number().when("tarif", {
				// 	is: (value) => {
				// 		return Number(value[0].type) === 2;
				// 	},
				// 	then: Yup.number().required("Entrez le nombre d'entrées!"),
				// 	otherwise: Yup.number().notRequired(),
				// }),
				// souscription: Yup.number().when("tarif", {
				// 	is: (value) => {
				// 		return Number(value[0].type) === 3;
				// 	},
				// 	then: Yup.number().required("Choisir frequence de payments"),
				// 	otherwise: Yup.number().notRequired(),
				// }),
				// credits: Yup.number().ensure().when("tarif[0].type", {
				// 	is: "",
				// 	then: Yup.number().required(),
				// }),
			}),
		},
		// {
		// 	id: 2,
		// 	name: "amount",
		// 	label: "Tarif Horaire",
		// 	description: "Faites glisser le curseur sur votre tarif horaire",
		// 	stepLabel: "Tarif en euros",
		// 	inputType: "slider",
		// 	//input: () => <SchedulerField name={"horaires"} />,
		// 	validationSchema: Yup.object({
		// 		amount: Yup.number().test(
		// 			"is-jimmy",
		// 			"${path} is not Jimmy",
		// 			(value, context) => Number(value) > 0
		// 		),
		// 	}),
		// },
		// {
		// 	id: 3,
		// 	name: "name_tarif",
		// 	label: "Nom tarif",
		// 	description:
		// 		"Entrer le nom de votre tarif ex: (abonnement, group forfait...)",
		// 	stepLabel: "Nommez votre tarif",
		// 	inputType: "input",
		// 	onSubmit: actionTarifs.createTarif,
		// 	//input: () => <SchedulerField name={"horaires"} />,
		// 	validationSchema: Yup.object({}),
		// },
	],
];

export default () => {
	const ref = useRef();
	const refs = STEPS.reduce(
		(p, c, index) => [...p, c.map((_) => useRef(null))],
		[]
	);
	const dispatch = useDispatch();
	const options = useFetchPrestationsOptions();
	const [step, setStep] = useState(0);
	const [page, setPage] = useState(0);
	const [isOpen, setIsOpen] = useState(true);
	const { user } = useSelector(({ auth }) => auth);
	const {
		errors = null,
		values = null,
		submitForm = null,
	} = useSelector(({ prestations }) => prestations.errors || {});

	const prestationId = useSelector(
		({ prestations }) => prestations.prestationId
	);
	const { scrollY, scrollYProgress } = useElementScroll(ref);

	// const { categories: sports, types } = useSelector(({ prestations }) => ({
	// 	categories: prestations.categories.map((c) => ({
	// 		value: c.id,
	// 		label: c.title,
	// 	})),
	// 	types: prestations.types.map((c) => ({ value: c.id, label: c.name })),
	// }));
	// const background = useTransform(scrollYProgress, backgorundInput, [
	// 	`linear-gradient(180deg, ${theme.palette.primary.light}, rgba(19, 120, 236, 0.73)),url(${png})`,
	// 	`linear-gradient(180deg, ${theme.palette.primary.main}, rgba(42, 156, 255, 0.83)),url("${png}")`,
	// 	`linear-gradient(180deg, ${theme.palette.primary.light}, rgba(19, 120, 236, 0.73)),url(${png})`,
	// 	`linear-gradient(180deg, ${theme.palette.primary.light}, rgba(19, 120, 236, 0.93)),url(${png})`,
	// ]);
	// const colorStep = 1 / fields.length;
	// const backgorundInput = new Array(fields.length)
	// 	.fill(0)
	// 	.map((_, index) => index * colorStep);
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
		} else if (step === STEPS[page].length - 1 && page < STEPS.length - 1) {
			const new_step = 0;
			const new_page = page + 1;

			setPage(new_page);
			setStep(new_step);

			if (STEPS[new_page][new_step].fullWidth) {
				setIsOpen(false);
			} else {
				setIsOpen(true);
			}
			refs[new_page][new_step].current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "start",
			});
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
			refs[page][_step].current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "start",
			});
			setStep(_step);
		} else if (step === 0 && page >= 1) {
			const _page = page - 1;
			const _step = 0;
			if (!isOpen) setIsOpen(true);
			console.log(_page + ":-----:" + _step);

			setStep(_step);
			setPage(_page);
		}
	};

	const renderInput = useCallback(
		({ inputType, label, name: _name, fieldName }) => {
			const opts_name = _name;
			const name = fieldName || _name;
			switch (inputType) {
				case "image":
					return (
						<ImageField
							{...{ label }}
							{...{ name }}
							id='image_prestation'
						/>
					);
				case "textArea":
					return (
						<TextAreaField
							sx={{ alignSelf: "strecth" }}
							{...{ label }}
							{...{ name }}
							fullWidth
						/>
					);

				case "select":
					//const options = name == "sport" ? sports : types;
					// if (name === "tarif")
					// 	return (
					// 		<PriceEdit
					// 			{...{ label }}
					// 			{...{ name }}
					// 			options={options[name]}
					// 		/>
					// 	);
					return (
						<>
							<Select
								sx={{ alignSelf: "strecth" }}
								{...{ label }}
								{...{ name }}
								data={options[opts_name]}
								fullWidth
							/>
							<LinkButton />
						</>
					);
				case "radioGroup":
					return (
						<RadioGroupComponent
							{...{ label }}
							{...{ name }}
							options={options[opts_name]}
						/>
					);
				case "schedulerField":
					return (
						<SchedulerField
							{...{ label }}
							{...{ name }}
						/>
					);
				case "slider":
					return (
						<SliderField
							min={0}
							max={30}
							{...{ name }}
							{...{ label }}
							autoComplete={label}
							autoFocus
						/>
					);
				case "input":
					return (
						<TextField
							{...{ name }}
							{...{ label }}
						/>
					);
			}
		},
		[options]
	);
	const backgroundImage = "url(../../img/sport1.png)";
	return (
		<>
			<Header
				steps={STEPS}
				{...{ page }}
				{...{ step }}
				{...{ scrollYProgress }}
			/>

			<Layout ref={ref}>
				<Container>
					<Main
						animate={isOpen ? "open" : "closed"}
						variants={variantsMain}>
						<Form
							step={step}
							page={page}
							initialValues={{ price: 0, tarifs: [] }}
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
													//handleSubmit();
													if (item.onSubmit) {
														dispatch(
															item.onSubmit(
																{ ...values, prestationId, user },
																() => handleSubmit()
															)
														);
													} else {
														handleSubmit();
													}
												}}>
												<StepContainer
													variants={variantsStepContainer}
													item={item}
													{...{ isOpen }}
													{...{ handlePrevious }}>
													{renderInput({ ...item })}
												</StepContainer>
												{/* <StepContainer animate={isOpen ? "open" : "closed"}>
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
												</StepContainer> */}
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
						<AnimatePresence exitBeforeEnter>
							{STEPS.map((steps, i) => {
								return (
									i === page && (
										<Stepper
											key={i}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											y={scrollY}
											{...{ steps }}
											errors={errors}
											values={values}
										/>
									)
								);
							})}
						</AnimatePresence>
					</Aside>
				</Container>
				<Box
					sx={{
						position: "fixed",
						bottom: 0,
						left: 0,
						width: "100vw",
						display: "flex",
						justifyContent: "center",
						padding: 3,
					}}>
					<ButtonAction
						onClick={handlePrevious}
						variant='outlined'
						sx={{ padding: 2 }}>
						Retour
					</ButtonAction>
					<ButtonAction
						onClick={submitForm}
						variant='contained'
						sx={{ padding: 2, margin: "0 10px" }}>
						Suivant
					</ButtonAction>
				</Box>
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
