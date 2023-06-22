import * as React from "react";
const PlusIcon = ({ color, size, ...rest }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		fill='none'
		{...rest}>
		<path
			fill={color}
			d='M15.833 9.167h-5v-5a.833.833 0 1 0-1.666 0v5h-5a.833.833 0 1 0 0 1.666h5v5a.833.833 0 0 0 1.666 0v-5h5a.834.834 0 0 0 0-1.666Z'
		/>
	</svg>
);
export default PlusIcon;
