export default {
	onSelect(state = {}, index) {
		return {
			...state,
			selectedIndex: index
		}
	}
}

