import React, { useEffect } from "react";
import { styled } from "@mui/styles";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import StepperBtn from "./StepperBtn";
import { useTransform, motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { connect, getIn } from "formik";

const SEGMENT_HEIGHT = 50;
const ICON_SIZE = 30;
const Container = styled("div")(({ theme, width = 200, height = 200 }) => ({
	// backgroundColor: "orange",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignContent: "center",
	height: "100vh",
}));
const VerticalLine = styled("span")(({ theme }) => ({
	width: 0.5,
	height: "100%",
	backgroundColor: theme.palette.primary.main,
}));
const Segment = styled("div")(({ theme, height, width }) => ({
	width,
	height,
	display: "flex",
	justifyContent: "center",
	padding: theme.spacing(1, 0),
}));

const Stepper = ({ steps, y, errors, values, ...rest }) => {
	console.log({ ...rest });
	const theme = useTheme();
	const { width, height } = useWindowDimensions();

	// const useTransformHelper = (motionValue, i, output) => {
	// 	let width = dimensions.width;
	// 	const input = [(i + 1) * -width, i * -width, (i - 1) * -width];
	// 	return useTransform(x, input, output, { clamp: true });
	// };
	useEffect(() => {
		console.log("stepppppppppeeeeeer");
		console.log(steps);
		console.log(errors);
	}, [errors]);

	return (
		<Container>
			{steps.map((step, i) => {
				// const input = [(i + 1) * -height, i * -height, (i - 1) * -height];
				const input = [(i - 1) * height, i * height, (i + 1) * height];
				const output = [1, 1.2, 1];

				const selecteColor =
					errors && errors[step.name]
						? theme.palette.error.main
						: values && values[step.name]
						? theme.palette.success.main
						: theme.palette.primary.main;
				const unSelectedColor =
					errors && errors[step.name]
						? theme.palette.error.light
						: values && values[step.name]
						? theme.palette.success.main
						: theme.palette.primary.ultraLight;
				const scale = useTransform(y, input, output, { clamp: true });
				const backgroundColor = useTransform(y, input, [
					unSelectedColor,
					selecteColor,
					unSelectedColor,
				]);
				return (
					<div key={i}>
						{i === 0 && (
							<Segment
								height={SEGMENT_HEIGHT}
								width={ICON_SIZE}>
								<VerticalLine />
							</Segment>
						)}
						<StepperBtn
							style={{ scale, backgroundColor }}
							label={step.stepLabel}
							checked={values && values[step.name]}
							error={(errors && errors[step.name]) || false}
						/>
						<Segment
							height={SEGMENT_HEIGHT}
							width={ICON_SIZE}>
							<VerticalLine />
						</Segment>
					</div>
				);
			})}
		</Container>
	);
};

export default connect(Stepper);
