export default {
	onSelect(state = {}, selectedIndex, { props = {} } = {}) {
		if (props.isDisabled) {
			return state;
		}

		return {
			...state,
			selectedIndex,
		}
	},
}
