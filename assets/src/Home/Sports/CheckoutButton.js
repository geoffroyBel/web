import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import useCheckoutUrl from "../../hooks/useCheckoutUrl";

const CheckoutButton = ({ checkoutParams, ...rest }) => {
	const [redirectToCheckout] = useCheckoutUrl();
	// const redirectToCheckout = async () => {
	// 	console.log("---------------TEST- CheckoutButton-----------------");
	// 	console.log(props);

	// 	const fetchSession = async () => {
	// 		const input = { ...props.checkoutParams };
	// 		const {
	// 			data: {
	// 				createCheckoutSession: { sessionID },
	// 			},
	// 		} = await API.graphql(graphqlOperation(createCheckoutSession, { input }));
	// 		return sessionID;
	// 	};
	// 	const sessionId = await fetchSession();
	// 	console.log("session ---------");
	// 	console.log(sessionId);
	// 	const stripePromise = loadStripe(
	// 		"pk_test_N4ewHY6GPgws8Xxt3qpylRqc00hnmmHFJl",
	// 		{ stripeAccount: props.checkoutParams.stripeAccount }
	// 	);
	// 	const stripe = await stripePromise;
	// 	stripe.redirectToCheckout({ sessionId });
	// };
	//   const redirectToCheckout = async () => {
	//     const fetchSession = async () => {
	//       const apiName = "stripeAPI"
	//       const apiEndpoint = "/checkout"
	//       const body = {
	//         quantity: 1,
	//         client_reference_id: "<UNIQUE_REF>",
	//         priceId: "<PRICE_ID>",
	//       }
	//       const session = await API.post(apiName, apiEndpoint, { body })
	//       return session
	//     }

	//     const session = await fetchSession()
	//     const sessionId = session.id
	//     const stripe = await stripePromise
	//     stripe.redirectToCheckout({ sessionId })
	//   }
	//color='secondary'
	return (
		<Button
			component={motion.div}
			onClick={() =>
				redirectToCheckout(checkoutParams.prestationId, checkoutParams.tarifId)
			}
			{...rest}>
			Reservation
		</Button>
	);
};

export default CheckoutButton;
