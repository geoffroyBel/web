import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import * as actionCategories from "../store/actions/category";

export default () => {
	const dispatch = useDispatch();
	const { categories = [], types = [] } = useSelector(({ prestations }) => ({
		categories: prestations.categories.map((c) => ({
			value: c.id,
			label: c.title,
		})),
		types: prestations.types.map((c) => ({ value: c.id, label: c.name })),
	}));

	useEffect(() => {
		dispatch(actionCategories.fetchCategories());
		dispatch(actionCategories.fetchTypes());
	}, []);

	return {
		sport: categories,
		type: types,
		tarifs: [
			{ label: "Entrée unique", value: 1 },
			{ label: "Forfait", value: 2 },
			{ label: "Abonnement", value: 3 },
		],
		souscription: [
			{ label: "Annuel", value: 1 },
			{ label: "Mensuel", value: 2 },
		],
	};
};
