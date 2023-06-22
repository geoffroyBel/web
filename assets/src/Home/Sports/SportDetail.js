import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const SportDetail = () => {
	const { id } = useParams({ id });
	const [searchParams] = useSearchParams();

	useEffect(() => {
		console.log(searchParams.get("success"));
	}, [searchParams]);
	return <div>SportDetail</div>;
};

export default SportDetail;
