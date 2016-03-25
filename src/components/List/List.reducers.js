import _ from 'lodash';

export function onSelect(state = {}, index) {
	const selectedIndices = state.selectedIndices || [];

	return {
		...state,
		selectedIndices: _.xor(selectedIndices, [index])
	};
}

export function onExpand(state = {}, index) {
	const expandedIndices = state.expandedIndices || [];

	return {
		...state,
		expandedIndices: _.xor(expandedIndices, [index])
	};
}
