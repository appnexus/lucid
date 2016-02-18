import _ from 'lodash';

export function onExpand(state) {
	const { selectedIndices } = state;

	return _.assign({}, state, {
		isExpanded: true,
		focusedIndex: _.last(selectedIndices)
	});
}

export function onCollapse(state) {
	return _.assign({}, state, {
		isExpanded: false
	});
}

export function onSelect(state, optionIndex) {
	const { focusedIndex, selectedIndices} = state;

	return _.assign({}, state, {
		selectedIndices: [optionIndex],
		isExpanded: false
	});
}

export function onAboveFold(state) {
	return _.assign({}, state, {
		direction: 'down'
	});
}

export function onBelowFold(state) {
	return _.assign({}, state, {
		direction: 'up'
	});
}

export function onFocusNext(state) {
	const { focusedIndex } = state;

	return _.assign({}, state, {
		focusedIndex: (_.isNumber(focusedIndex) ? focusedIndex + 1 : 0 )
	});
}

export function onFocusPrev(state) {
	const { focusedIndex } = state;

	return _.assign({}, state, {
		focusedIndex: (_.isNumber(focusedIndex) ? focusedIndex - 1 : 0 )
	});
}

export function onFocusOption(state, optionIndex) {
	return _.assign({}, state, {
		focusedIndex: optionIndex
	});
}
