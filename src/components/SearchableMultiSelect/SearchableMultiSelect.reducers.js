import _ from 'lodash';
import * as DropMenu from '../DropMenu/DropMenu.reducers';
import SearchField from '../SearchField/SearchField.reducers';

export function onSelect(state, selectedIndex) {
	return {
		...state,
		selectedIndices: _.xor(state.selectedIndices, [selectedIndex]),
	};
}

export function onSearch(state, searchText, firstVisibleIndex) {
	return {
		...state,
		searchText,
		DropMenu: {
			...DropMenu.onFocusOption(state.DropMenu, firstVisibleIndex),
		},
	};
}

export function onRemoveAll(state) {
	return {
		...state,
		selectedIndices: [],
	};
}

export { DropMenu, SearchField };
