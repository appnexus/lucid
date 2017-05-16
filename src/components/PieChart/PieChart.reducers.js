export function onMouseOver(state, hoveringIndex) {
	return {
		...state,
		isHovering: true,
		hoveringIndex,
	};
}

export function onMouseOut(state) {
	return {
		...state,
		isHovering: false,
	};
}
