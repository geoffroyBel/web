export default {
	formId: "CompanyForm",
	formField: {
		lastName: {
			name: "last_name",
			label: "Last name",
			requiredErrorMsg: "Please enter your Last name!!",
		},
		firstName: {
			name: "first_name",
			label: "Last name",
			requiredErrorMsg: "Please enter your First name!!",
		},
		email: {
			name: "email",
			label: "Email",
			requiredErrorMsg: "Please enter an Email !!",
		},
		businessType: {
			name: "business_type",
			label: "Business type",
			requiredErrorMsg: "Please Select your business type!!",
			options: ["individual", "company"],
		},
	},
};
