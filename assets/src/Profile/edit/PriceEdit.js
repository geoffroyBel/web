import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import Select from "../ui/Select";
import LinkButton from "../components/LinkButton";
import TextField from "../ui/TextField";
import RadioGroup from "../ui/RadioGroup";
import CheckboxGroup from "../ui/RadioGroupComponent";
import RadioGroupComponent from "../ui/RadioGroupComponent";
const PriceEdit = (props) => {
	const { values } = useFormikContext();

	return (
		<>
			{/* <Select
				sx={{ alignSelf: "strecth" }}
				{...props}
				fullWidth
			/>
			<TextField
				name='credits'
				label='Nbre Entrée'
				sx={{ width: "50%" }}
			/> */}
			<RadioGroupComponent {...props} />
			{/* <LinkButton /> */}
		</>
	);
};

export default PriceEdit;
