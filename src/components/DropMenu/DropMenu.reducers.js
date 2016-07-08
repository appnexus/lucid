import _ from 'lodash';

export function onExpand(state) {
	const { selectedIndices } = state;

	return {
		...state,
		isExpanded: true,
		focusedIndex: _.isEmpty(selectedIndices) ? null : _.last(selectedIndices),
	};
}

export function onCollapse(state) {
	return {
		...state,
		isExpanded: false,
	};
}

export function onSelect(state, optionIndex) {
	return {
		...state,
		selectedIndices: [optionIndex],
		isExpanded: false,
	};
}

export function onFocusNext(state) {
	const { focusedIndex } = state;
	let nextFocusedIndex = focusedIndex;

	if (_.isNull(focusedIndex)) {
		nextFocusedIndex = 0;
	} else if (_.isNumber(focusedIndex)) {
		nextFocusedIndex = focusedIndex + 1;
	}

	return {
		...state,
		focusedIndex: nextFocusedIndex,
	};
}

export function onFocusPrev(state) {
	const { focusedIndex } = state;
	let nextFocusedIndex = focusedIndex;

	if (_.isNull(focusedIndex) || focusedIndex === 0) {
		nextFocusedIndex = null;
	} else if (_.isNumber(focusedIndex)) {
		nextFocusedIndex = focusedIndex - 1;
	}

	return {
		...state,
		focusedIndex: nextFocusedIndex,
	};
}

export function onFocusOption(state, optionIndex) {
	return {
		...state,
		focusedIndex: optionIndex,
	};
}
