export function onToggle(state = {}, isExpanded) {
	return {
		...state,
		isExpanded
	};
};
