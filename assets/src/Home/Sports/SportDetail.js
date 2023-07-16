import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import * as actionPrestations from "../../store/actions/prestation";
import { useDispatch, useSelector } from "react-redux";
import HoraireList from "./HoraireList";
import { getCurrentDate } from "../../Profile/utils/RRuleFormated";
import Pricing from "./Pricing";
import * as actionReservation from "../../store/actions/reservation";
import { useCallback } from "react";

const SportDetail = () => {
	const horaireRef = useRef(null);
	const { id } = useParams({ id });
	const [pricingTabValue, setPricingTabValue] = useState(0);
	const pricingRef = useRef(null);
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();

	const { prestation, horaires, abonnement } = useSelector(
		({
			prestations: { prestation, horaires },
			reservations: { abonnements, userReservationsByPID },
		}) => ({
			prestation,
			abonnement:
				abonnements.find(
					(a) => a.prestation.id === Number(id) && a.id === 35
				) || null,
			horaires:
				!userReservationsByPID || !prestation || !horaires
					? null
					: horaires.map((h) => {
							if (
								userReservationsByPID[prestation.id] &&
								userReservationsByPID[prestation.id][h.id]
							) {
								return {
									...h,
									reservations: userReservationsByPID[prestation.id][h.id],
								};
							}
							return h;
					  }),
		})
	);

	// const { abonnement, userReservationsByPID } = useSelector(
	// 	({ reservations: { abonnements, userReservationsByPID } }) => ({
	// 		abonnement:
	// 			abonnements.find(
	// 				(a) => a.prestation.id === Number(id) && a.id === 35
	// 			) || null,
	// 		userReservationsByPID,
	// 	})
	// );

	const { user } = useSelector(({ auth }) => auth);

	useEffect(() => {
		console.log("en theorie il est vide ou error");
		console.log(horaires);
	}, [horaires]);
	// useEffect(() => {
	// 	console.log("-----------userReservationsByPID-----------------");
	// 	console.log(userReservationsByPID);
	// }, [userReservationsByPID]);
	// const {

	// 	_horaires = [],

	// } = useSelector(
	// 	({
	// 		prestations: { availablePrestations },
	// 		reservation: { reservations, userReservationsByPID },
	// 	}) => ({
	// 		prestation: availablePrestations[id],
	// 		horaires: availablePrestations[id]?.horaires.reduce((acc, h) => {
	// 			const horaire = {
	// 				id: h.id,
	// 				startDate: `${h.startDay}T${h.startTime}:00`,
	// 				endDate: `${h.startDay}T${h.endTime}:00`,
	// 				rRule: h.rRule,
	// 				exDate: h.exDate,
	// 				title: "Go to a gym",
	// 			};
	// 			if (userReservationsByPID[id]) {
	// 				if (userReservationsByPID[id][h.id]) {
	// 					horaire.reservations = userReservationsByPID[id][h.id];
	// 				}
	// 			}
	// 			return [...acc, horaire];
	// 		}, []),
	// 	}))

	//userReservationsByPID
	//const [abonnement, setAbonnement] = useState(null);
	const [currentDate, setCurrentDate] = useState(getCurrentDate());
	let [success, setSuccess] = useState(searchParams.get("success") || null);
	useEffect(() => {
		if (id) {
			dispatch(actionPrestations.fetchPrestationsById(id));
		}
	}, [id]);

	useEffect(() => {
		console.log("------------------SEARCHPARAMS");
		console.log(success);
		if (success === null) {
			setPricingTabValue(0);
		} else {
			setPricingTabValue(1);
		}
	}, [success]);

	// useEffect(() => {
	// 	if (user?.abonnements) {
	// 		alert("hhhh");
	// 		console.log("relou");

	// 		setAbonnement(
	// 			user?.abonnements?.find(
	// 				(a) => a.prestation.id === Number(id) && a.id === 35
	// 			) || null
	// 		);
	// 	}
	// }, [user]);

	const handleAddReservation = useCallback(
		(values) => {
			dispatch(actionReservation.createReservation(values, user, prestation));
		},
		[user, prestation]
	);
	const handleRemoveReservation = (id) => {
		dispatch(actionReservation.removeReservation(id, abonnement));
	};
	return (
		<>
			<HoraireList
				ref={horaireRef}
				{...{ abonnement }}
				{...{ horaires }}
				date={currentDate}
				{...{ prestation }}
				{...{ handleAddReservation }}
				{...{ handleRemoveReservation }}
			/>
			{user && (
				<Pricing
					{...{ abonnement }}
					onClickTab={setPricingTabValue}
					tab={pricingTabValue}
					{...{ user }}
					{...{ prestation }}
					ref={pricingRef}
				/>
			)}
		</>
	);
};

export default SportDetail;
