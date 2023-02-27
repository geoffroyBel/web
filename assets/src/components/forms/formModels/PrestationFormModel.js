export default {
	formId: "prestationForm",
	formField: {
		name: {
			name: "name",
			label: "Name",
			requiredErrorMsg: "a name for your prestation is required",
		},
		price: {
			name: "price",
			label: "Price",
			requiredErrorMsg: "a Price for your prestation is required",
		},
		description: {
			name: "description",
			label: "Brief Description",
			requiredErrorMsg: "You should provide a description",
		},
		quantity: {
			name: "quantity",
			number: 35,
			label: "Max pers",
			requiredErrorMsg: "a Max pers for your prestation is required",
		},
		recurrency: {
			name: "recurrency",
			label: "Récurrence",
			requiredErrorMsg: "Un Jour oubrable doit etre selectionner",
		},
		horaire: {
			name: "horaire",
			label: "Horaire",
			requiredErrorMsg: "Un Jour oubrable doit etre selectionner",
		},
		sport: {
			name: "sport",
			label: "Type de Sport",
			requiredErrorMsg: "a sport is required",
		},
		type: {
			name: "type",
			label: "Type de Prestation",
			requiredErrorMsg: "a Type is required",
		},
		firstName: {
			name: "firstName",
			label: "First name*",
			requiredErrorMsg: "First name is required",
		},
		lastName: {
			name: "lastName",
			label: "Last name*",
			requiredErrorMsg: "Last name is required",
		},
		address1: {
			name: "address1",
			label: "Address Line 1*",
			requiredErrorMsg: "Address Line 1 is required",
		},
		address2: {
			name: "address2",
			label: "Address Line 2",
		},
		city: {
			name: "city",
			label: "City*",
			requiredErrorMsg: "City is required",
		},
		state: {
			name: "state",
			label: "State/Province/Region",
		},
		zipcode: {
			name: "zipcode",
			label: "Zipcode*",
			requiredErrorMsg: "Zipcode is required",
			invalidErrorMsg: "Zipcode is not valid (e.g. 70000)",
		},
		country: {
			name: "country",
			label: "Country*",
			requiredErrorMsg: "Country is required",
		},
		useAddressForPaymentDetails: {
			name: "useAddressForPaymentDetails",
			label: "Use this address for payment details",
		},
		nameOnCard: {
			name: "nameOnCard",
			label: "Name on card*",
			requiredErrorMsg: "Name on card is required",
		},
		cardNumber: {
			name: "cardNumber",
			label: "Card number*",
			requiredErrorMsg: "Card number is required",
			invalidErrorMsg: "Card number is not valid (e.g. 4111111111111)",
		},
		expiryDate: {
			name: "expiryDate",
			label: "Expiry date*",
			requiredErrorMsg: "Expiry date is required",
			invalidErrorMsg: "Expiry date is not valid",
		},
		cvv: {
			name: "cvv",
			label: "CVV*",
			requiredErrorMsg: "CVV is required",
			invalidErrorMsg: "CVV is invalid (e.g. 357)",
		},
	},
};
