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
import { ButtonBase, CircularProgress, Paper } from "@mui/material";
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
import * as actionCompany from "../../store/actions/company";
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
import { useNavigate, useSearchParams } from "react-router-dom";

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

const STEPS = [
	[
		{
			id: 1,
			name: "business_type",
			label: "Type d'entreprise",
			description: "Choisir le type dans le menu ci dessous",
			stepLabel: "Type de companie",
			inputType: "select",
			onSubmit: null,
			validationSchema: Yup.object({
				business_type: Yup.number("type non selectionner").required(
					"selectionnez votre type de companie"
				),
			}),
		},
		{
			id: 2,
			name: "nom",
			label: "company",
			description: "Quelle est le nom de votre companie",
			stepLabel: "Nom de la companie",
			inputType: "input",
			onSubmit: null,
			validationSchema: Yup.object({
				nom: Yup.string()
					.min(2, "Le nom doit comporter au moins 2 caractères")
					.required("selectionnez votre nom de companie"),
			}),
		},

		{
			id: 3,
			name: "stripe",
			label: "Stripe",
			description:
				"Nous utilisons Stripe pour nous assurer que vous êtes payé à temps et pour garantir la sécurité de vos informations bancaires personnelles. Cliquez sur Enregistrer et continuer pour configurer vos paiements avec Stripe.",
			stepLabel: "Validation",
			inputType: null,
			validationSchema: Yup.object({}),
			onSubmit: actionCompany.createCompany,
		},
	],
];

export default () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(
		searchParams.get("success")
			? searchParams.get("success") === "true"
				? true
				: false
			: undefined
	);
	const ref = useRef();
	const refs = STEPS.reduce(
		(p, c, index) => [...p, c.map((_) => useRef(null))],
		[]
	);
	const dispatch = useDispatch();
	const options = {
		business_type: [
			{ label: "Individuel", value: 1 },
			{ label: "Company", value: 2 },
		],
	};

	const [step, setStep] = useState(0);
	const [page, setPage] = useState(0);
	const [isOpen, setIsOpen] = useState(true);
	const { user } = useSelector(({ auth }) => auth);
	const { company = null } = useSelector((state) => state.company || null);
	const {
		errors = null,
		values = null,
		submitForm = null,
	} = useSelector(({ prestations }) => prestations.errors || {});

	const prestationId = useSelector(
		({ prestations }) => prestations.prestationId
	);
	const { scrollY, scrollYProgress } = useElementScroll(ref);

	useEffect(() => {
		console.log(company);
		if (company && company.url) {
			window.location = company.url;
		}
	}, [company]);

	useEffect(() => {
		if (success !== undefined) {
			setLoading(false);
			refs[0][2].current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "start",
			});
		}
	}, [success]);

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
					if (!options[opts_name]) return null;
					return (
						<>
							<Select
								sx={{ alignSelf: "strecth" }}
								{...{ label }}
								{...{ name }}
								data={options[opts_name]}
								fullWidth
							/>
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
												onSubmit={(value) => {
													//handleSubmit();

													if (item.onSubmit) {
														setLoading(true);
														dispatch(
															item.onSubmit(
																{ ...values, prestationId, user },
																() => handleSubmit()
															)
														);
													} else {
														if (
															j == STEPS.length - 1 &&
															index === STEPS[j].length - 1
														) {
															navigate(`/home/sports/detail/${prestationId}`);
														}
														handleSubmit();
													}
												}}>
												<StepContainer
													variants={variantsStepContainer}
													item={item}
													{...{ isOpen }}
													{...{ handlePrevious }}>
													{loading && <CircularProgress size={24} />}
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
						{/* https://4cec-2001-861-3e05-3c70-b4b5-9ff5-b9ea-26d3.ngrok-free.app/api/stripe/hook */}
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
											errors={
												!success && success != undefined
													? { ...errors, stripe: true }
													: errors
											}
											values={success ? { ...values, stripe: true } : values}
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
