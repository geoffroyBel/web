import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import * as actions from "../store/actions/order";
import { useDispatch } from "react-redux";

const useCheckoutUrl = () => {
	const dispatch = useDispatch();
	const { checkoutUrl } = useSelector(({ order }) => order);
	useEffect(() => {
		if (checkoutUrl) {
			window.location = checkoutUrl;
		}
	}, [checkoutUrl]);

	const createCheckout = useCallback(
		(prestationId, tarifId) => {
			if (checkoutUrl) {
				window.location = checkoutUrl;
			} else {
				dispatch(actions.createAbonnement(prestationId, tarifId));
			}
		},
		[checkoutUrl]
	);

	return [createCheckout];
};

export default useCheckoutUrl;
