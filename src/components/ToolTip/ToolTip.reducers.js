export function onMouseOver(state) {
	return {
		...state,
		isExpanded: true,
	};
}

export function onMouseOut(state) {
	return {
		...state,
		isExpanded: false,
	};
}
