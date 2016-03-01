import _ from 'lodash';

export default {
	onSelect(state = {}, selectedIndex) {
		return {
			...state,
			selectedIndex
		};
	},
};
