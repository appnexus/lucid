export default {
	onChange(state = {}, value) {
		return {
			...state,
			value: value,
		};
	},
};
