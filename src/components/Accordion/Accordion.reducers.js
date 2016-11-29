export function onSelect(state = {}, selectedIndex) {
	return {
		...state,
		selectedIndex,
	};
}
