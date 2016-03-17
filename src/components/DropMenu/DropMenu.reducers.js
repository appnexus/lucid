import _ from 'lodash';

export function onExpand(state) {
	const { selectedIndices } = state;

	return _.assign({}, state, {
		isExpanded: true,
		focusedIndex: _.isEmpty(selectedIndices) ? null : _.last(selectedIndices)
	});
}

export function onCollapse(state) {
	return _.assign({}, state, {
		isExpanded: false
	});
}

export function onSelect(state, optionIndex) {
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
	let nextFocusedIndex = focusedIndex;

	if (_.isNull(focusedIndex)) {
		nextFocusedIndex = 0;
	} else if (_.isNumber(focusedIndex)) {
		nextFocusedIndex = focusedIndex + 1;
	}

	return _.assign({}, state, {
		focusedIndex: nextFocusedIndex
	});
}

export function onFocusPrev(state) {
	const { focusedIndex } = state;
	let nextFocusedIndex = focusedIndex;

	if (_.isNull(focusedIndex) || focusedIndex === 0) {
		nextFocusedIndex = null;
	} else if (_.isNumber(focusedIndex)) {
		nextFocusedIndex = focusedIndex - 1;
	}

	return _.assign({}, state, {
		focusedIndex: nextFocusedIndex
	});
}

export function onFocusOption(state, optionIndex) {
	return _.assign({}, state, {
		focusedIndex: optionIndex
	});
}
