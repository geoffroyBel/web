import React, { Fragment, useState } from "react";
import { Button, Typography, Box } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useField } from "formik";
import styled from "@mui/styles/styled";

const Image = styled("img")(({ theme }) => ({
	objectFit: "scaleDown",
	height: 90,
	width: 90,

	borderRadius: "50%",
	border: "solid 5px",
	borderColor: theme.palette.primary.main,
}));
export default (props) => {
	const [img, setImg] = useState("");
	const [field, meta, helper] = useField(props);
	const [value, setValue] = useState("");
	const onChange = (e) => {
		setValue(e.target.files);
		helper.setValue(e.target.files);
	};

	const text = img ? "Edit Your Image" : "Choose your Profile Image";

	return (
		<Button
			{...props}
			variant='transparent'
			component='label'
			sx={{
				textTransform: "none",
				marginBottom: 1,
				display: "flex",
				flexDirection: "column",
			}}>
			<>
				{img ? (
					<Image src={img} />
				) : (
					<AccountCircleIcon
						color='primary'
						sx={{ padding: 0, margin: 0, width: 90, height: 90 }}
					/>
				)}
				<Typography textAlign={"center"} color={"primary"} variant='body'>
					{text}
				</Typography>
			</>

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
	);
};
