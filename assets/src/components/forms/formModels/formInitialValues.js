import PrestationFormModel from "./PrestationFormModel";
import CompanyFormModel from "./CompanyFormModel";
const {
	formField: { horaire, price, description, quantity, name, sport, type },
} = PrestationFormModel;
const {
	formField: { firstName, lastName, email, businessType },
} = CompanyFormModel;

export default {
	[price.name]: [
		{ name: "La Séance", checked: true, price: 20, quantity: 1, remise: 0 },
		{ name: "Pack X5", checked: false, price: 10, quantity: 5, remise: 10 },
		{ name: "Pack X10", checked: false, price: 10, quantity: 10, remise: 15 },
	],
	[`tarifs`]: [],
	[`prices`]: [],
	[horaire.name]: {
		startTime: new Date(),
		endTime: new Date(),
		startDay: new Date(),
		endDay: new Date(),

		recurrency: [true, false, true, false, false, false, false],
	},
	horaires: [],
	[quantity.name]: 0,
	[description.name]: "Cours pour Adulte",
	[name.name]: "veteran",
	[sport.name]: "2",
	[type.name]: 1,

	[firstName.name]: "rasta",
	[lastName.name]: "Kong",
	[email.name]: "rastakongoner@gmail.com",
	[businessType.name]: "company",
};
