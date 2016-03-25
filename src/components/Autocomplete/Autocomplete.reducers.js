import _ from 'lodash';
import * as DropMenu from '../DropMenu/DropMenu.reducers';

export function onChange(state, value) {
	return {
		...state,
		value,
		DropMenu: {
			...state.DropMenu,
			focusedIndex: null,
			//isExpanded: !_.isEmpty(state.value) && !_.isEmpty(state.suggestions)
		}
	};
}

export function onSelect(state, selectedIndex) {
	return {
		...state,
		value: _.get(state.suggestions, selectedIndex),
		DropMenu: {
			...DropMenu.onSelect(state.DropMenu, selectedIndex),
			selectedIndices: []
		}
	};
}

export function onExpand(state) {
	return {
		...state,
		DropMenu: {
			...state.DropMenu,
			focusedIndex: null,
			isExpanded: !_.isEmpty(state.value) && !_.isEmpty(state.suggestions)
		}
	};
}

export { DropMenu };
