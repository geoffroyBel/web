import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationControlled({
	totalPage,
	page,
	setPage,
	...rest
}) {
	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<Stack
			spacing={2}
			{...rest}>
			<Pagination
				count={totalPage}
				page={page}
				onChange={handleChange}
			/>
		</Stack>
	);
}
