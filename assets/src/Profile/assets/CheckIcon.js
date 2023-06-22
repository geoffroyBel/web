import * as React from "react";
const CheckIcon = ({ size = 20, color, ...rest }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		fill={color}
		{...rest}>
		<path
			fill={color}
			d='M8.217 15a.833.833 0 0 1-.609-.267l-4.05-4.308a.834.834 0 1 1 1.217-1.142l3.433 3.659 7.009-7.667a.834.834 0 1 1 1.233 1.117l-7.617 8.333a.833.833 0 0 1-.608.275h-.008Z'
		/>
	</svg>
);
export default CheckIcon;
