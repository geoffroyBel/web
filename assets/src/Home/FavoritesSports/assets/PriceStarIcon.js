import * as React from "react";
const PriceStarIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={60}
		height={60}
		fill='none'
		{...props}>
		<path
			fill={props.color}
			d='m30 0 5.714 4.964 7.303-1.993 2.994 6.952 7.444 1.372-.318 7.563 6.11 4.466L55.68 30l3.568 6.676-6.111 4.466.318 7.563-7.444 1.372-2.995 6.952-7.302-1.993L30 60l-5.714-4.964-7.303 1.993-2.994-6.952-7.444-1.372.318-7.563-6.11-4.466L4.32 30 .752 23.324l6.111-4.466-.318-7.563 7.444-1.372 2.994-6.952 7.303 1.993L30 0Z'
		/>
	</svg>
);
export default PriceStarIcon;
