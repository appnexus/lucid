export default {
	onSelect(state = {}, index, props) {
		if (props && props.isDisabled) {
			return state;
		}

		return {
			...state,
			selectedIndex: index
		}
	}
}
