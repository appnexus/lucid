export function onToggle(state = {}) {
	return {
		...state,
		isExpanded: !state.isExpanded,
	};
}
