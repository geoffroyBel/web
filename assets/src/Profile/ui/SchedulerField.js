import React, { Fragment } from "react";
import {
	Field,
	Form,
	Formik,
	FormikProps,
	FieldArray,
	useField,
	useFormikContext,
} from "formik";
import Scheduler from "../components/Scheduler";
import Horaire from "../components/Horaire";

export default (props) => {
	const [field, meta, helper] = useField(props);
	const { touched, error, value = [] } = meta;
	const { setTouched, setValue } = helper;
	const { setFieldValue } = useFormikContext();

	const handleCreate = (horaire) => {
		setData([...data, horaire]);
		// setTouched(true);
		// setValue(data);
	};

	return (
		<FieldArray
			name='horaires'
			render={(arrayHelpers) => (
				<Fragment>
					<Scheduler onCreate={(h) => arrayHelpers.push(h)} />
					{value.map((f, index) => (
						<Field
							key={index}
							name={`horaires.${index}`}
							component={Horaire}
						/>
					))}
				</Fragment>
			)}
		/>
	);
	// return <Scheduler onCreate={handleCreate} />;
	//return <input {...field} {...props} />;
};
