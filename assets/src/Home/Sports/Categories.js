import React, { useEffect } from "react";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import * as actionCategories from "../../store/actions/category";

const categories = [
	{ id: "1", title: "skate", color: "#FFE8E0" },
	{ id: "2", title: "parapente", color: "#F1E0FF" },
	{ id: "3", title: "moto cross", color: "#BFEAF5" },
	{ id: "4", title: "break dance", color: "#F1E0FF" },
	{ id: "5", title: "skate", color: "#FFE8E9" },
];
const Colors = [
	{ color: "#FFE8E0" },
	{ color: "#F1E0FF" },
	{ color: "#BFEAF5" },
	{ color: "#F1E0FF" },
	{ color: "#FFE8E9" },
];
const StyledTabs = styled((props) => (
	<Tabs
		{...props}
		TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
	/>
))({
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
});

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

	// padding: 0,
	// margin: 0,
	//color: "rgba(255, 255, 255, 0.7)",

	"&.MuiTab-labelIcon": {
		color: theme.palette.text.secondary,
		fontWeight: theme.typography.fontWeightMedium,
		textTransform: "capitalize",
	},
	"&.Mui-selected": {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
	},
	"&.Mui-focusVisible": {
		backgroundColor: "rgba(100, 95, 228, 0.32)",
	},
}));

export default function Categories({ iconSize = 50, handleSelect }) {
	const { width } = useWindowDimensions();
	const [value, setValue] = React.useState();
	const categories = useSelector(({ prestations }) =>
		prestations.categories.sort((a, b) => Number(a.id) - Number(b.id))
	);
	const dispatch = useDispatch();
	const isOverlap = width < categories.length * (iconSize + 20);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		// alert(categories[newValue].id);
		handleSelect(categories[newValue]);
	};

	useEffect(() => {
		dispatch(actionCategories.fetchCategories());
	}, []);
	return (
		<Box sx={{ width: "100%", zIndex: 99 }}>
			<StyledTabs
				value={value}
				onChange={handleChange}
				aria-label='styled tabs example'
				variant={isOverlap ? "scrollable" : "standard"}
				indicatorColor='#FF9900'
				centered={isOverlap ? false : true}>
				{categories.map((category, index) => (
					<StyledTab
						key={category.id}
						icon={
							<Box
								sx={{
									width: 50,
									height: 50,
									backgroundColor: Colors[index].color,
									borderRadius: "50%",
								}}
							/>
						}
						label={category.title}
					/>
				))}
			</StyledTabs>
		</Box>
	);
}
