import _ from 'lodash';

export default {
	onSelect(state = {}, index) {
		const currentIndices = _.get(state, 'selectedIndices', []);

		return {
			...state,
			selectedIndices: _.xor(currentIndices, [index]),
		};
	},
};
