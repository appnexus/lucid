import _ from 'lodash';
import * as DropMenu from '../DropMenu/DropMenu.reducers';
import SearchField from '../SearchField/SearchField.reducers';
import { ISearchableMultiSelectState } from './SearchableMultiSelect';

export function onSelect(state: ISearchableMultiSelectState, selectedIndex: number[]) {
    const arr: number[] = [];
	return {
		...state,
		selectedIndices: _.xor(state.selectedIndices, arr.concat(selectedIndex)),
	};
}

export function onSearch(state: ISearchableMultiSelectState, searchText: string, firstVisibleIndex: number) {
	return {
		...state,
		searchText,
		DropMenu: {
			...DropMenu.onFocusOption(state.DropMenu, firstVisibleIndex),
		},
	};
}

export function onRemoveAll(state: ISearchableMultiSelectState) {
	return {
		...state,
		selectedIndices: [],
	};
}

export { DropMenu, SearchField };
