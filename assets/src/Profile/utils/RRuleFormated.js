import DayjsUtils from "@date-io/dayjs";
import { RRule, RRuleSet, rrulestr } from "rrule";
const weekday = require("dayjs/plugin/weekday");
const duration = require("dayjs/plugin/duration");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const weekOfYear = require("dayjs/plugin/weekOfYear");

require("dayjs/locale/fr");
const dateFns = new DayjsUtils();
dateFns.dayjs.extend(weekday);
dateFns.dayjs.extend(duration);
dateFns.dayjs.extend(isSameOrBefore);
dateFns.dayjs.extend(isSameOrAfter);
dateFns.dayjs.extend(weekOfYear);

const getOptionsRRule = (rRule) => {
	return rRule
		.replace("RRULE:", "")
		.split(";")
		.reduce((acc, str) => {
			const [option, value] = str.split("=");
			acc[option] = value;
			return acc;
		}, {});
};

const getHoraireByDay = (horaires, bounds) => {
	// let currentDate = dateFns.dayjs(currentDateString);
	// const bounds = {
	// 	from: currentDate.subtract(2, "week"),
	// 	to: currentDate.add(2, "week"),
	// };
	return horaires.reduce((acc, h, index) => {
		getHorairesFromRrule(h, bounds).forEach((d) => {
			const dateString = dateFns.dayjs(d).format("YYYY-MM-DD");
			if (!acc[dateString]) {
				acc = { ...acc, [`${dateString}`]: [] };
			}
			acc = { ...acc, [`${dateString}`]: [...acc[dateString], h] };
		});
		return acc;
	}, {});
};
const getHoraireByWeek = (horaires, bounds) => {
	// let currentDate = dateFns.dayjs(currentDateString);
	// const bounds = {
	// 	from: currentDate.subtract(2, "week"),
	// 	to: currentDate.add(2, "week"),
	// };
	/*

				// initialiser les 3 semaines {34:null, 35: null, 36: null}
	*/
	let initial_weeks = new Array(3).fill(bounds.from).reduce(
		(acc, d, i) => ({
			...acc,
			[`${d.add(i, "week").locale("fr").week()}`]: null,
		}),
		{}
	);
	return horaires.reduce((acc, h, index) => {
		const reservations =
			h.reservations?.reduce((acc2, r) => {
				const dateString = dateFns.dayjs(r.startDate).format("YYYY-MM-DD");
				if (!acc2[`${dateString}`]) {
					acc2 = { ...acc2, [`${dateString}`]: [] };
				}
				acc2[dateString].push(r);
				return acc2;
			}, {}) || {};
		console.log("Bug juste le premier jour ???");
		console.log(reservations);
		getHorairesFromRrule(h, bounds).forEach((d) => {
			const week = dateFns.dayjs(d).locale("fr").week();
			const dateString = dateFns.dayjs(d).format("YYYY-MM-DD");
			if (!acc[`${week}`]) {
				acc = { ...acc, [`${week}`]: {} };
			}

			if (!acc[`${week}`][dateString]) {
				acc[`${week}`][dateString] = [];
			}

			if (reservations[dateString]) {
				acc[`${week}`][dateString].push({
					...h,
					reservationID: reservations[dateString][0].id,
				});
			} else {
				acc[`${week}`][dateString].push(h);
			}
		});
		return acc;
	}, initial_weeks);

	// return horaires.reduce((acc, h, index) => {
	// 	getHorairesFromRrule(h, bounds).forEach((d) => {
	// 		const week = dateFns.dayjs(d).locale("fr").week();
	// 		const dateString = dateFns.dayjs(d).format("YYYY-MM-DD");
	// 		if (!acc[`${week}`]) {
	// 			acc = { ...acc, [`${week}`]: {} };
	// 		}

	// 		if (!acc[`${week}`][dateString]) {
	// 			acc[`${week}`][dateString] = [];
	// 		}
	// 		acc[`${week}`][dateString].push(h);
	// 	});
	// 	return acc;
	// }, {});
};

const getEndDate = (horaire) => {
	//WARNING endDay not endDate
	if (!horaire.rRule) return dateFns.dayjs(horaire.endDate || horaire.endDay);

	const options = getOptionsRRule(horaire.rRule);

	if (options["COUNT"] || options["UNTIL"]) {
		const dates = getHorairesFromRrule(horaire);
		return dateFns.dayjs(new Date(dates[dates.length - 1]));
	} else {
		return null;
	}
};
//{INTERVAL: '1', FREQ: 'WEEKLY', COUNT: '13', BYDAY: 'MO,TU'}
const getHorairesFromRrule = (h, bounds) => {
	const rule = RRule.fromString(
		`DTSTART;TZID=Europe/Paris:${dateFns
			.dayjs(h.startDay || h.startDate)
			.format("YYYYMMDDTHHmmss")};\n
		${h.rRule}`
	);
	if (bounds) {
		return rule.between(bounds.from.toDate(), bounds.to.toDate(), true);
	}
	return rule.all();
};
const horaireModelHelper = (h) => {
	let horaire = {
		startDay: dateFns.dayjs(h.startDate).format("YYYY-MM-DD"),
		endDay: getEndDate(h)?.format("YYYY-MM-DD"),
		startTime: dateFns.dayjs(h.startDate).format("HH:mm"),
		endTime: dateFns.dayjs(h.endDate).format("HH:mm"),
	};

	if (h.rRule) {
		horaire.rRule = h.rRule;
	}

	return horaire;
};
const RRuleFormattedText = (horaire) => {
	if (!horaire) return;
	console.log(horaire.rRule);

	dateFns.dayjs.extend(weekday);
	const options = horaire?.rRule
		.replace("RRULE:", "")
		.split(";")
		.reduce((acc, str) => {
			const [option, value] = str.split("=");
			acc[option] = value;
			return acc;
		}, {});

	console.log(options);
	console.log(dateFns.dayjs(horaire.startDate).toString());
	const startDay = dateFns.format(horaire.startDate, "DD MMMM YYYY");
	const endDay = dateFns.format(horaire.endDate, "DD MMMM YYYY");
	const startTime = dateFns.format(horaire.startDate, "HH:mm");
	const endTime = dateFns.format(horaire.endDate, "HH:mm");
	let string = "";
	let period = {
		horaire: {
			start: startTime,
			end: endTime,
		},
		start: {
			monthName: dateFns.dayjs(horaire.startDate).locale("fr").format("MMMM"),
			day_name: dateFns.dayjs(horaire.startDate).locale("fr").format("dddd"),
			day: dateFns.dayjs(horaire.startDate).format("DD"),
		},
	};

	console.log(period);
	const INTERVAL = Number(options["INTERVAL"]);
	switch (options["FREQ"]) {
		case "DAILY":
			string = INTERVAL === 1 ? `Tout les jours` : `Tt les ${INTERVAL} jours`;
			period.horaire.description =
				INTERVAL === 1 ? `Tout les jours` : `Tt les ${INTERVAL} jours`;
			period.description = `a partir du ${startDay}`;
			period.from = `a partir du ${startDay}`;
			if (options["COUNT"]) {
				const date = dateFns
					.dayjs(horaire.startDate)
					.add(INTERVAL * (options["COUNT"] - 1), "day")
					.locale("fr");

				period.end = {
					monthName: date.format("MMMM"),
					day_name: date.format("dddd"),
					day: date.format("DD"),
				};
				period.description = `${period.description} \n Jusqu'au ${date.format(
					"DD MMMM YYYY"
				)}`;
				period.to = `Jusqu'au ${date.format("DD MMMM YYYY")}`;
			} else if (options["UNTIL"]) {
				const date = dateFns.dayjs(options["UNTIL"], "YYYY-MM-DD").locale("fr");

				period.end = {
					monthName: date.format("MMMM"),
					day_name: date.format("dddd"),
					day: date.format("DD"),
				};
				period.description = `${period.description} \n Jusqu'au ${date.format(
					"DD MMMM YYYY"
				)}`;
				period.to = `Jusqu'au ${date.format("DD MMMM YYYY")}`;
			}
			console.log(period);
			break;
		case "WEEKLY":
			period.to = `Jusqu'au ${startDay}`;
			period.description = `a partir du ${startDay}`;
			period.horaire.description =
				INTERVAL === 1 ? `` : `Toutes les ${INTERVAL} semaines`;
			let weekDays = [0, 0, 0, 0, 0, 0, 0];
			if (options["BYDAY"]) {
				weekDays = options["BYDAY"]?.split(",").reduce((acc, weekDay) => {
					const index = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"].indexOf(
						weekDay
					);
					if (index >= 0) {
						acc[index] = 1;
					}
					return acc;
				}, weekDays);
			} else {
				weekDays[dateFns.dayjs(horaire.startDate).locale("fr").weekday()] = 1;
			}
			const daysName = [
				"Lundi",
				"Mardi",
				"Mercredi",
				"jeudi",
				"vendredi",
				"samedi",
				"dimanche",
			];
			const days = weekDays.reduce(
				(opts, bool, index) => {
					if (bool) {
						if (!opts.hasStarted) {
							opts.hasStarted = true;
							opts.group.push(`${daysName[index]}`);
						} else {
							opts.group[opts.group.length - 1] = `${
								opts.group[opts.group.length - 1]
							} au ${daysName[index]}`;
						}
					} else {
						opts.hasStarted = false;
					}
					return opts;
				},
				{ group: [], hasStarted: false }
			);
			period.horaire.description = days.group.join(" &  ");
			console.log("ARRAY DAY----- GGGG");
			console.log(days.group);
			console.log(weekDays);
			if (options["COUNT"]) {
				const date = dateFns
					.dayjs(horaire.startDate)
					.add(INTERVAL * 7 * (options["COUNT"] - 1), "day")
					.locale("fr");

				period.end = {
					monthName: date.format("MMMM"),
					day_name: date.format("dddd"),
					day: date.format("DD"),
				};
				period.description = `${period.description} \n Jusqu'au ${date.format(
					"DD MMMM YYYY"
				)}`;
				period.to = `Jusqu'au ${date.format("DD MMMM YYYY")}`;
			} else if (options["UNTIL"]) {
				const date = dateFns.dayjs(options["UNTIL"], "YYYY-MM-DD").locale("fr");

				period.end = {
					monthName: date.format("MMMM"),
					day_name: date.format("dddd"),
					day: date.format("DD"),
				};
				period.description = `${period.description} \n Jusqu'au ${date.format(
					"DD MMMM YYYY"
				)}`;
				period.to = `Jusqu'au ${date.format("DD MMMM YYYY")}`;
			}
			console.log(period);
			break;

		case "MONTHLY":
			period.to = `Jusqu'au ${startDay}`;
			period.description = `a partir du ${startDay}`;
			period.horaire.description =
				INTERVAL === 1
					? `Une fois Tout par Mois`
					: `Toutes les ${INTERVAL} mois`;

			if (options["BYDAY"]) {
				//TOUT LES 2 EME JEUDI DU MOIS
				var match = options["BYDAY"].match(/.([0-9])([A-Z]{2})/i);

				//	["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
				period.horaire.description = `${period.horaire.description} \n le ${match[1]} eme ${match[2]} du mois`;
			} else if (options["BYMONTHDAY"]) {
				// LE 29 eme jours DU MOIS
				period.horaire.description = `${period.horaire.description} \n le ${options["BYMONTHDAY"]} du mois`;
			}
			if (options["COUNT"]) {
				const date = dateFns
					.dayjs(horaire.startDate)
					.add(INTERVAL * (options["COUNT"] - 1), "month")
					.locale("fr");

				period.end = {
					monthName: date.format("MMMM"),
					day_name: date.format("dddd"),
					day: date.format("DD"),
				};
				period.description = `${period.description} \n Jusqu'au ${date.format(
					"DD MMMM YYYY"
				)}`;
				period.to = `Jusqu'au ${date.format("DD MMMM YYYY")}`;
			} else if (options["UNTIL"]) {
				const date = dateFns.dayjs(options["UNTIL"], "YYYY-MM-DD").locale("fr");

				period.end = {
					monthName: date.format("MMMM"),
					day_name: date.format("dddd"),
					day: date.format("DD"),
				};
				period.description = `${period.description} \n Jusqu'au ${date.format(
					"DD MMMM YYYY"
				)}`;
				period.to = `Jusqu'au ${date.format("DD MMMM YYYY")}`;
			}
			console.log(period);
			break;
		case "YEARLY":
			break;
	}
	return { startTime, endTime, string, period };
};
export {
	RRuleFormattedText,
	horaireModelHelper,
	getHoraireByDay,
	getHoraireByWeek,
};
