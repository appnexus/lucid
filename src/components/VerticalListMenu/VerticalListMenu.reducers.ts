import _ from 'lodash';
import { IVerticalListMenuState } from './VerticalListMenu';

export function onSelect(
	state: IVerticalListMenuState = {},
	index: number
): IVerticalListMenuState {
	return {
		...state,
		selectedIndices: [index],
	};
}

export function onToggle(
	state: IVerticalListMenuState = {},
	index: number
): IVerticalListMenuState {
	const expandedIndices = state.expandedIndices || [];

	return {
		...state,
		expandedIndices: _.xor(expandedIndices, [index]),
	};
}
