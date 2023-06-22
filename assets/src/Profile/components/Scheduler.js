import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import {
	AppointmentForm,
	EditRecurrenceMenu,
	AllDayPanel,
	ConfirmationDialog,
	Appointments,
	AppointmentTooltip,
	Scheduler,
	WeekView,
	Resources,
	Toolbar,
	TodayButton,
	DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Room from "@mui/icons-material/Room";
import Modal from "@mui/material/Modal";
import {
	Box,
	Button,
	ButtonBase,
	Grid,
	Container,
	Typography,
} from "@mui/material";
import DayjsUtils from "@date-io/dayjs";
import BaseModal from "./BaseModal";
const dateFns = new DayjsUtils();
//import appointments from "../../../demo-data/today-appointments";

const PREFIX = "Demo";

const classes = {
	icon: `${PREFIX}-icon`,
	textCenter: `${PREFIX}-textCenter`,
	firstRoom: `${PREFIX}-firstRoom`,
	secondRoom: `${PREFIX}-secondRoom`,
	thirdRoom: `${PREFIX}-thirdRoom`,
	header: `${PREFIX}-header`,
	commandButton: `${PREFIX}-commandButton`,
	button: `${PREFIX}-button`,
};
const Layout = styled(Container)(({ theme }) => ({
	// overflow: "scroll",
	paddingBottom: theme.spacing(5),
}));
const TopLayout = styled(Container)(({ theme }) => ({
	padding: theme.spacing(5, 0, 5),
}));

const StyledGrid = styled(Grid)(() => ({
	[`&.${classes.textCenter}`]: {
		textAlign: "center",
	},
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
	[`&.${classes.icon}`]: {
		color: palette.action.active,
	},
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
	[`&.${classes.button}`]: {
		color: theme.palette.background.default,
		padding: 0,
	},
}));
const ReserveButton = styled(Button)(({ theme }) => ({
	"&.MuiButton-root": {
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));
const StyledButton = styled(ButtonBase)(({ theme }) => ({
	position: "relative",
	height: "100%",
}));
{
	/*  <Modal open={visible}></Modal> */
}
const FormOverlay = React.forwardRef((props) => {
	console.log(props);
	const { visible, children } = props;
	return (
		<Paper
			SX={
				{
					// margin: "0 auto",
					// transform: "translateY(20%)",
					// msTransform: "translateY(20%)",
				}
			}>
			{children}
		</Paper>
	);
});
const Appointment = ({
	children,
	data,
	onClick,
	toggleVisibility,
	onAppointmentMetaChange,
	...restProps
}) => {
	return (
		<Appointments.Appointment {...restProps}>
			<StyledButton
				onClick={({ target }) => {
					toggleVisibility();
					onAppointmentMetaChange({
						target: target.parentElement.parentElement,
						data,
					});
				}}>
				{children}
			</StyledButton>
		</Appointments.Appointment>
	);
};

const Content = (props) => {
	const { children, appointmentData, ...restProps } = props;

	return (
		<AppointmentTooltip.Content
			{...restProps}
			appointmentData={appointmentData}>
			<Grid
				container
				alignItems='center'>
				<StyledGrid
					item
					xs={2}
					className={classes.textCenter}>
					<StyledRoom className={classes.icon} />
				</StyledGrid>
				<Grid
					item
					xs={10}>
					<span>{appointmentData.location}</span>
				</Grid>
				<Grid
					display={"flex"}
					justifyContent={"flex-end"}
					item
					xs={12}>
					<ReserveButton variant='contained'>
						{appointmentData?.reserved ? "Annuler" : "Reserver"}
					</ReserveButton>
					{/* <Button sx={{ marginRight: 2, marginBottom: 2 }} variant='contained'>
					Reserver
				</Button> */}
				</Grid>
			</Grid>
		</AppointmentTooltip.Content>
	);
};

const Overlay = (props) => {
	console.log("-----overlay props");
	console.log(props);
	return <AppointmentForm.Overlay {...props} />;

	return null;
};
const RecurrenceLayout = (props) => {
	console.log(props);
	return <AppointmentForm.RecurrenceLayout {...props} />;

	return null;
};
const ApointmentLayout = (props) => {
	return (
		<AppointmentForm.Layout
			{...props}
			style={{
				width: "80%",
			}}
		/>
	);
};

const BoolEditor = (props) => {
	console.log(props);
	switch (props.label) {
		case "All Day":
			return (
				<AppointmentForm.BooleanEditor
					{...props}
					label='Toutes la journée'
				/>
			);
		case "Repeat":
			return (
				<AppointmentForm.BooleanEditor
					{...props}
					label='Récurrent'
				/>
			);
		default:
			return <AppointmentForm.BooleanEditor {...props} />;
	}

	//return null;
};
const LabelComponent = (props) => {
	if (props.text === "Details") {
		return null;
		// return (
		// 	<AppointmentForm.Label
		// 		{...props}
		// 		text='Precio Modulo'
		// 	/>
		// );
	} else if (props.text === "More Information") {
		return null;
	} else {
		//if (props.text === "-")
		return <AppointmentForm.Label {...props} />;
	}
};
const SelectComponent = (props) => {
	console.log("---------selectprops");
	console.log(props);
	// if (props.type === "titleTextEditor") {
	// 	return (
	// 		<AppointmentForm.TextEditor
	// 			{...props}
	// 			type='numberEditor'
	// 			placeholder='Precio'
	// 		/>
	// 	);
	// }
	return null;
	return <AppointmentForm.Select {...props} />;
};

AppointmentForm.ResourceEditorProps;
const InputComponent = (props) => {
	// if (props.type === "titleTextEditor") {
	// 	return (
	// 		<AppointmentForm.TextEditor
	// 			{...props}
	// 			type='numberEditor'
	// 			placeholder='Precio'
	// 		/>
	// 	);
	// }
	switch (props.type) {
		case "titleTextEditor":
		case "multilineTextEditor":
			return null;
	}
	return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
	return (
		<AppointmentForm.BasicLayout
			appointmentData={appointmentData}
			onFieldChange={onFieldChange}
			{...restProps}
			selectComponent={SelectComponent}></AppointmentForm.BasicLayout>
	);
};
const TimeTableCell = ({ onDoubleClick, ...restProps }) => {
	return (
		<WeekView.TimeTableCell
			onClick={onDoubleClick}
			{...restProps}
		/>
	);
};
const WeekLayout = (props) => {
	console.log("---------------WEEKLAYOUT");
	console.log(props);
	return (
		<>
			<WeekView.Layout {...props} />
		</>
	);
};
const SchedulerView = withStyles(null, { withTheme: true })(
	class Demo extends React.PureComponent {
		constructor(props) {
			super(props);
			this.ref = React.createRef();
			this.state = {
				mainResourceName: "reserved",
				resources: [
					{
						fieldName: "reserved",
						title: "Reservation",
						instances: [
							{
								id: "reservation",
								text: "Reservation",
								color: props.theme.palette.secondary.main,
							},
						],
					},
				],
				currentDate: dateFns.dayjs().format("YYYY-MM-DD"),
				data: [
					// {
					// 	id: "hdgdhd",
					// 	startDate: "2018-10-30T09:45",
					// 	endDate: "2018-10-30T11:00",
					// 	title: "Meeting",
					// 	rRule: "FREQ=WEEKLY;UNTIL=20191007T000000Z;WKST=MO;BYDAY=TU,TH",
					// },
					// {
					// 	startDate: "2018-11-01T12:00",
					// 	endDate: "2018-11-01T13:30",
					// 	title: "Go to a gym",
					// 	rRule: "FREQ=DAILY;COUNT=3",
					// },
					// {
					// 	id: "jhg",
					// 	startDate: "2018-10-29T13:00",
					// 	endDate: "2018-10-29T14:00",
					// 	title: "Go to a hhhhh",
					// },
				],
				visible: false,
				appointmentMeta: {
					target: null,
					data: {},
				},
				addedAppointment: {},
				appointmentChanges: {},
				editingAppointment: undefined,
			};

			this.toggleVisibility = () => {
				const { visible: tooltipVisibility, appointmentMeta } = this.state;
				this.setState({ visible: !tooltipVisibility });
			};
			this.onAppointmentMetaChange = ({ data, target }) => {
				this.setState({ appointmentMeta: { data, target } });
			};
			this.handleReservation = this.handleReservation.bind(this);
			this.myAppointment = this.myAppointment.bind(this);
			this.myTooltipContent = this.myTooltipContent.bind(this);
			this.currentDateChange = (currentDate) => {
				this.setState({ currentDate });
			};
			this.commitChanges = this.commitChanges.bind(this);
			this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
			this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
			this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
			this.handleClick = this.handleClick.bind(this);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.horaires !== this.props.horaires) {
				if (!this.props.horaires.length) return;
				//const currentDate = this.props.horaires[0].startDate;
				const data = this.props.horaires;
				this.setState({
					data,
					//currentDate,
				});
			}

			if (this.state.currentDate !== this.props.currentDate) {
				if (!this.props.currentDate) return;
				const currentDate = this.props.currentDate;

				this.setState({
					currentDate,
				});
			}
		}
		handleClick = () => {
			// Call the function in the child component

			this.ref.current.openModal();
		};
		handleReservation = (h_id, startDate, endDate) => {
			const { data } = this.state;
			const {
				handleAddReservation = () => {},
				handleRemoveReservation = () => {},
			} = this.props;
			const selected_horaire = data.find((el) => el.id === h_id);

			if (selected_horaire) {
				const reservation = {
					startDate: dateFns.format(startDate, "YYYY-MM-DDTHH:mm:ssZ"),
					endDate: dateFns.format(endDate, "YYYY-MM-DDTHH:mm:ssZ"),
					horaireID: selected_horaire.id,
					id: selected_horaire.reservationID,
				};
				if (selected_horaire.reserved) {
					handleRemoveReservation(reservation);
				} else {
					handleAddReservation(reservation);
				}
			}
			this.toggleVisibility();
		};

		changeAddedAppointment(addedAppointment) {
			this.setState({ addedAppointment });
		}

		changeAppointmentChanges(appointmentChanges) {
			this.setState({ appointmentChanges });
		}

		changeEditingAppointment(editingAppointment) {
			this.setState({ editingAppointment });
		}

		commitChanges({ added, changed, deleted }) {
			this.setState((state) => {
				let { data } = state;
				if (added) {
					const startingAddedId =
						data.length > 0 ? data[data.length - 1].id + 1 : 0;
					data = [...data, { id: startingAddedId, ...added }];
					this.props.onCreate(added);
				}
				if (changed) {
					data = data.map((appointment) =>
						changed[appointment.id]
							? { ...appointment, ...changed[appointment.id] }
							: appointment
					);
				}
				if (deleted !== undefined) {
					data = data.filter((appointment) => appointment.id !== deleted);
				}
				return { data };
			});
		}

		myAppointment(props) {
			return (
				<Appointment
					{...props}
					toggleVisibility={this.toggleVisibility}
					onAppointmentMetaChange={this.onAppointmentMetaChange}
				/>
			);
		}
		myTooltipContent(props) {
			const {
				appointmentMeta: {
					data: { id, startDate, endDate },
				},
			} = this.state;
			return (
				<Content
					{...props}
					onClick={() => {
						this.handleReservation(id, startDate, endDate);
					}}
				/>
			);
		}

		render() {
			const { innerRef, title, description } = this.props;
			const {
				data,
				appointmentMeta,
				visible,
				currentDate,
				resources,
				addedAppointment,
				appointmentChanges,
				editingAppointment,
			} = this.state;
			{
				/* <TodayButton /> */
			}
			return (
				<>
					<BaseModal>
						<Typography
							id='modal-modal-title'
							variant='h6'
							component='h2'
							sx={{ color: "white", textTransform: "capitalize" }}>
							Etape 2: Horaires
						</Typography>
						<Typography
							id='modal-modal-description'
							sx={{ mt: 2, color: "white" }}>
							Cliquez sur l'agenda pour ajouter un nouveau créneau
						</Typography>
					</BaseModal>
					{/* <Box sx={{ width: "100%", height: 500, backgroundColor: "orange" }}>
						hhh
					</Box> */}
					<Scheduler
						ref={this.ref}
						onAppointmentFormOpening={this.onAppointmentFormOpening}
						firstDayOfWeek={1}
						height={450}
						data={data}>
						<ViewState
							currentDate={currentDate}
							onCurrentDateChange={this.currentDateChange}
						/>
						<EditingState
							onCommitChanges={this.commitChanges}
							addedAppointment={addedAppointment}
							onAddedAppointmentChange={this.changeAddedAppointment}
							appointmentChanges={appointmentChanges}
							onAppointmentChangesChange={this.changeAppointmentChanges}
							editingAppointment={editingAppointment}
							onEditingAppointmentChange={this.changeEditingAppointment}
						/>
						<Toolbar />
						<DateNavigator />

						<WeekView
							startDayHour={9}
							endDayHour={19}
							timeTableCellComponent={TimeTableCell}
							layoutComponent={WeekLayout}
						/>

						<Appointments appointmentComponent={this.myAppointment} />

						<AppointmentTooltip
							showOpenButton
							showCloseButton
							visible={visible}
							onVisibilityChange={this.toggleVisibility}
							appointmentMeta={appointmentMeta}
							onAppointmentMetaChange={this.onAppointmentMetaChange}
							contentComponent={this.myTooltipContent}
						/>
						<AppointmentForm
							booleanEditorComponent={BoolEditor}
							basicLayoutComponent={BasicLayout}
							labelComponent={LabelComponent}
							textEditorComponent={InputComponent}
							recurrenceLayoutComponent={RecurrenceLayout}
							layoutComponent={ApointmentLayout}
							resourceEditorComponent={SelectComponent}
						/>

						<Resources
							data={resources}
							mainResourceName='reserved'
						/>
					</Scheduler>
				</>
			);
			return (
				<Layout
					ref={innerRef}
					maxWidth={false}
					disableGutters>
					{title && (
						<TopLayout maxWidth={"sm"}>
							<Typography
								component='h1'
								variant='h2'
								align='center'
								color='textPrimary'
								gutterBottom>
								{title}
							</Typography>

							{description && (
								<Typography
									variant='h5'
									align='center'
									color='textSecondary'
									component='p'>
									{description}
								</Typography>
							)}
						</TopLayout>
					)}
					<Container
						maxWidth='false'
						disableGutters
						sx={
							{
								// height: "100vh",
								// overflow: "scroll",
							}
						}>
						<Paper>
							<Scheduler
								onAppointmentFormOpening={this.onAppointmentFormOpening}
								firstDayOfWeek={1}
								height={660}
								data={data}>
								<ViewState
									currentDate={currentDate}
									onCurrentDateChange={this.currentDateChange}
								/>
								<EditingState
									onCommitChanges={this.commitChanges}
									addedAppointment={addedAppointment}
									onAddedAppointmentChange={this.changeAddedAppointment}
									appointmentChanges={appointmentChanges}
									onAppointmentChangesChange={this.changeAppointmentChanges}
									editingAppointment={editingAppointment}
									onEditingAppointmentChange={this.changeEditingAppointment}
								/>
								<Toolbar />
								<DateNavigator />
								<TodayButton />
								<WeekView
									startDayHour={9}
									endDayHour={19}
								/>

								<Appointments appointmentComponent={this.myAppointment} />

								<AppointmentTooltip
									showOpenButton
									showCloseButton
									visible={visible}
									onVisibilityChange={this.toggleVisibility}
									appointmentMeta={appointmentMeta}
									onAppointmentMetaChange={this.onAppointmentMetaChange}
									contentComponent={this.myTooltipContent}
								/>
								<AppointmentForm
									booleanEditorComponent={BoolEditor}
									basicLayoutComponent={BasicLayout}
									labelComponent={LabelComponent}
									textEditorComponent={InputComponent}
									recurrenceLayoutComponent={RecurrenceLayout}
									layoutComponent={ApointmentLayout}
								/>

								<Resources
									data={resources}
									mainResourceName='reserved'
								/>
							</Scheduler>
						</Paper>
					</Container>
				</Layout>
			);
		}
	}
);
{
	/*  overlayComponent={FormOverlay}*/
}
export default React.forwardRef((props, ref) => {
	return (
		<SchedulerView
			innerRef={ref}
			{...props}
		/>
	);
});
