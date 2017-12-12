import _ from 'lodash';

export default {
	onSelect(state = {}, index, obj) {
		const currentIndices = _.get(state, 'selectedIndices', []);
		debugger;
		return {
			...state,
			selectedIndices: _.xor(currentIndices, [index]),
		};
	},
};
