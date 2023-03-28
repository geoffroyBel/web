import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AnimatePresence, motion } from "framer-motion";
import { slideIn } from "../Authentication/variants";

const AntTabs = styled(Tabs)({
	borderBottom: "1px solid #e8e8e8",
	"& .MuiTabs-indicator": {
		backgroundColor: "#1890ff",
	},
});

const AntTab = styled((props) => (
	<Tab
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	textTransform: "none",
	minWidth: 0,
	[theme.breakpoints.up("sm")]: {
		minWidth: 0,
	},
	// fontWeight: theme.typography.fontWeightRegular,
	// marginRight: theme.spacing(1),
	// color: "rgba(0, 0, 0, 0.85)",
	fontFamily: [
		"-apple-system",
		"BlinkMacSystemFont",
		'"Segoe UI"',
		"Roboto",
		'"Helvetica Neue"',
		"Arial",
		"sans-serif",
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(","),
	"&:hover": {
		color: "#40a9ff",
		opacity: 1,
	},
	"&.Mui-selected": {
		color: "#1890ff",
		fontWeight: theme.typography.fontWeightMedium,
	},
	"&.Mui-focusVisible": {
		backgroundColor: "#d1eaff",
	},
}));

const StyledTabs = styled((props) => (
	<Tabs
		{...props}
		TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
	/>
))(({ theme }) => ({
	//color: "rgba(255, 255, 255, 0.7)",

	"& .MuiTabs-indicator": {
		position: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		width: 20,
		height: 20,
		// bottom: -5,
		// marginTop: 1,
	},
	"& .MuiTabs-indicatorSpan": {
		position: "absolute",
		//top: -5,
		width: 10,
		height: 10,
		borderRadius: "50%",
		backgroundColor: theme.palette.primary.light,
	},
}));

const StyledTab = styled((props) => (
	<Tab
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	textTransform: "none",
	fontWeight: theme.typography.fontWeightRegular,
	fontSize: theme.typography.pxToRem(15),
	marginRight: theme.spacing(1),

	...theme.typography.subtitle,

	color: theme.palette.text.secondary,

	// "&.MuiTab-labelIcon": {
	// 	//color: theme.palette.text.gray,
	// 	fontWeight: theme.typography.fontWeightMedium,
	// 	textTransform: "capitalize",
	// },
	"&.Mui-selected": {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightMedium,
	},
	// "&.Mui-focusVisible": {
	// 	backgroundColor: "rgba(100, 95, 228, 0.32)",
	// },
}));

export default function CustomizedTabs({ tabs, step = 0, children, onClick }) {
	const [value, setValue] = React.useState(0);
	const childrens = React.Children.toArray(children);
	const handleChange = (event, newValue) => {
		console.log(newValue);
		setValue(newValue);
		onClick(newValue);
	};

	return (
		<Box
			sx={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
			}}>
			<StyledTabs
				centered={true}
				value={value}
				onChange={handleChange}
				aria-label='styled tabs example'>
				{tabs.map(({ label }) => (
					<StyledTab
						key={label}
						{...{ label }}
					/>
				))}
			</StyledTabs>

			<AnimatePresence
				initial={false}
				exitBeforeEnter>
				{childrens.map((tab, index) => {
					if (index === step) {
						return (
							<Box
								sx={{ flex: 1 }}
								key={index}
								component={motion.div}
								variants={slideIn}
								initial='hidden'
								animate='visible'
								exit='exit'>
								{tab}
							</Box>
						);
					}
				})}
			</AnimatePresence>
		</Box>
	);
}
