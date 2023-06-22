export const slideIn = {
	hidden: {
		x: "-100vw",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			when: "beforeChildren",
		},
	},
	exit: {
		x: "100vw",
		opacity: 0,
		transition: {
			//delay: 0.5,
			duration: 0.5,
			when: "beforeChildren",
		},
	},
};

export const fadeIn = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			when: "beforeChildren",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.5,
			when: "beforeChildren",
		},
	},
};
