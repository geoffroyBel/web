import * as React from "react";
const ChevronIcon = ({ color, ...rest }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={30}
		height={30}
		fill='none'
		{...rest}>
		<path
			stroke={color}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={3}
			d='m23 11-8 8-8-8'
		/>
		<rect
			width={27}
			height={27}
			x={1.5}
			y={1.5}
			stroke={color}
			strokeWidth={3}
			rx={13.5}
		/>
	</svg>
);
export default ChevronIcon;
