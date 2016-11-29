import _ from 'lodash';

export function onSelect(state = {}, index) {
	return {
		...state,
		selectedIndices: [index],
	};
}

export function onToggle(state = {}, index) {
	const expandedIndices = state.expandedIndices || [];

	return {
		...state,
		expandedIndices: _.xor(expandedIndices, [index]),
	};
}
