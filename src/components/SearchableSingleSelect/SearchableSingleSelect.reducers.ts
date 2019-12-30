import * as DropMenu from '../DropMenu/DropMenu.reducers';
import SearchField from '../SearchField/SearchField.reducers';
import { ISearchableSingleSelectState } from './SearchableSingleSelect';

export function onSelect(state: ISearchableSingleSelectState, selectedIndex: number) {
	console.log(selectedIndex);
	return {
		...state,
		selectedIndex
	};
}

export function onSearch(state: ISearchableSingleSelectState, searchText: string, firstVisibleIndex: number) {
	return {
		searchText,
		DropMenu: {
			...DropMenu.onFocusOption(state.DropMenu, firstVisibleIndex),
		},
		...state
	};
}

export { DropMenu, SearchField };
