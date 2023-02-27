import React, { Fragment, useState } from "react";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { useField } from "formik";

export default (props) => {
	const [img, setImg] = useState("");
	const [field, meta, helper] = useField(props);
	const [value, setValue] = useState("");
	const onChange = (e) => {
		setValue(e.target.files);
		helper.setValue(e.target.files);
	};
	return (
		<Fragment>
			<Button variant='contained' component='label'>
				<img style={{ width: 90, height: 90 }} src={img} />
				<input
					accept='image/*'
					onChange={(e) => {
						onChange(e);
						setImg(URL.createObjectURL(e.target.files[0]));
						//handleUpload(e);
					}}
					style={{ display: "none" }}
					id='raised-button-file'
					multiple
					type='file'
				/>
			</Button>
		</Fragment>
	);
};
