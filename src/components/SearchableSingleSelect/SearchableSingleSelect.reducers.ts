import * as DropMenu from '../DropMenu/DropMenu.reducers';
import SearchField from '../SearchField/SearchField.reducers';
import { ISearchableSingleSelectState } from './SearchableSingleSelect';

export function onSelect(
	state: ISearchableSingleSelectState,
	selectedIndex: number | null
) {
	return {
		...state,
		selectedIndex,
	};
}

export function onSearch(
	state: ISearchableSingleSelectState,
	searchText: string,
	firstVisibleIndex: number
) {
	return {
		...state,
		searchText,
		DropMenu: {
			...DropMenu.onFocusOption(state.DropMenu, firstVisibleIndex),
		},
	};
}

export { DropMenu, SearchField };
