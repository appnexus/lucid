import _ from 'lodash';

export default {
	onSelect(state = {}, index, obj) {
		const currentIndices = _.get(state, 'selectedIndices', []);
		const newVal = _.isUndefined(state.selectedIndices[index])
			? 0
			: (state.selectedIndices[index] + 1) % 3;
		const selectedIndices = _.isEqual(obj.props.kind, 'checkbox')
			? _.assign(currentIndices, { [index]: newVal })
			: [index];
		debugger;
		return {
			...state,
			selectedIndices: selectedIndices,
		};
	},
};
