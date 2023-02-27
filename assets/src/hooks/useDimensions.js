import React, { useRef, useEffect, useState, useLayoutEffect } from "react";

export default function useDimensions(_ref = null) {
	const ref = _ref || useRef(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	useLayoutEffect(() => {
		setDimensions(ref.current.getBoundingClientRect().toJSON());
	}, [ref.current]);
	useEffect(() => {
		if (ref.current) {
			console.log(ref.current.offsetWidth);
		}
	});
	return [ref, dimensions];
}
