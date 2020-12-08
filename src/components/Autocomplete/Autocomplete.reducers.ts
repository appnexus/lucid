import _ from 'lodash';
import * as DropMenu from '../DropMenu/DropMenu.reducers';

export function onChange(state: any, value: any) {
	return {
		...state,
		value,
		DropMenu: {
			...state.DropMenu,
			focusedIndex: null,
		},
	};
}

export function onSelect(state: any, selectedIndex: any) {
	const value = _.get(state.suggestions, selectedIndex);

	return onChange(
		{
			...state,
			value,
			DropMenu: {
				...DropMenu.onSelect(state.DropMenu, selectedIndex),
				selectedIndices: [],
			},
		},
		value
	);
}

export function onExpand(state: any) {
	return {
		...state,
		DropMenu: {
			...state.DropMenu,
			focusedIndex: null,
			isExpanded: !_.isEmpty(state.value) && !_.isEmpty(state.suggestions),
		},
	};
}

export { DropMenu };
