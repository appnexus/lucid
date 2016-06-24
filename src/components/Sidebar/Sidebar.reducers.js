export function onToggle(state) {
	return {
		...state,
		isExpanded: !state.isExpanded,
	};
}

export function onResize(state, width) {
	return {
		...state,
		width,
		isExpanded: true,
	};
}
