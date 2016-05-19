export default {
	onSelect(state = {}, selectedIndex) {
		return {
			...state,
			selectedIndex,
		};
	},
};
