import _ from 'lodash';
import { IDropMenuState } from './DropMenu';

export function onExpand(state: IDropMenuState): IDropMenuState {
	const { selectedIndices } = state;
	const focusedIndex = _.last(selectedIndices);
	return {
		...state,
		isExpanded: true,
		focusedIndex: _.isNil(focusedIndex) ? null : focusedIndex,
	};
}

export function onCollapse(state: IDropMenuState): IDropMenuState {
	return {
		...state,
		isExpanded: false,
	};
}

export function onSelect(
	state: IDropMenuState,
	optionIndex: number
): IDropMenuState {
	return {
		...state,
		selectedIndices: [optionIndex],
		isExpanded: false,
	};
}

export function onFocusNext(state: IDropMenuState): IDropMenuState {
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

export function onFocusPrev(state: IDropMenuState): IDropMenuState {
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

export function onFocusOption(
	state: IDropMenuState,
	optionIndex: number
): IDropMenuState {
	return {
		...state,
		focusedIndex: optionIndex,
	};
}
