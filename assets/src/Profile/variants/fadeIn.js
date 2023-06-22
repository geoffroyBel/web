export const fadeIn = {
	hidden: {
		//x: "-100vw",
		opacity: 0,
	},
	visible: {
		//x: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			when: "beforeChildren",
		},
	},
	exit: {
		// x: "100vw",
		opacity: 0,
		transition: {
			//delay: 0.5,
			duration: 0.5,
			when: "beforeChildren",
		},
	},
};
