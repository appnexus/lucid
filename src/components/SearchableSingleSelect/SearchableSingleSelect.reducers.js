import * as DropMenu from '../DropMenu/DropMenu.reducers';
import SearchField from '../SearchField/SearchField.reducers';

export function onSelect(state, selectedIndex) {
	return {
		...state,
		selectedIndex: selectedIndex,
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

export { DropMenu, SearchField };
