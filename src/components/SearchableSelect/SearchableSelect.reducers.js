import * as DropMenu from '../DropMenu/DropMenu.reducers';

export function onSelect(state, selectedIndex) {
	return {
		...state,
		selectedIndex,
		DropMenu: DropMenu.onSelect(state.DropMenu, selectedIndex),
	};
}

export function onSearch(state, searchText, firstVisibleIndex) {
	return {
		...state,
		searchText,
		selectedIndex: null,
		DropMenu: {
			...DropMenu.onFocusOption(state.DropMenu, firstVisibleIndex),
		},
	};
}

export { DropMenu };
