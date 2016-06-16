export function onChange(state = {}, selectedIndex){
	return {
		...state,
		selectedIndex,
	};
}
