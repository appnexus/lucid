import * as DropMenu from '../DropMenu/DropMenu.reducers';
import { ISearchableSelectState } from './SearchableSelect';

export function onSelect(
	state: ISearchableSelectState,
	selectedIndex: number
): ISearchableSelectState {
	return {
		...state,
		selectedIndex,
		DropMenu: DropMenu.onSelect(state.DropMenu, selectedIndex),
	};
}

export function onSearch(
	state: ISearchableSelectState,
	searchText: string,
	firstVisibleIndex: number
): ISearchableSelectState {
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
