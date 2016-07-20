export function onToggle(state) {
	return {
		...state,
		isExpanded: !state.isExpanded,
	};
}

export function onResize(state, height) {
	return {
		...state,
		height,
		isExpanded: true,
	};
}
