import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";

export default () => {
	const [company, setCompany] = useState(true);
	return (
		<Box
			sx={{
				padding: "2rem 2rem",
				display: "flex",
				// flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}>
			{company ? (
				<Stack
					direction='column'
					justifyContent='center'
					alignItems='center'
					spacing={2}>
					<Button
						sx={{ padding: "1rem 2rem" }}
						variant='outlined'>
						Add Prestation
					</Button>
					<Button
						sx={{ padding: "1rem 2rem" }}
						variant='outlined'>
						Stripe Account
					</Button>
				</Stack>
			) : (
				<Button variant='contained'>Stripe Account</Button>
			)}
		</Box>
	);
};
