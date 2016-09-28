import _ from 'lodash';
import * as DropMenu from '../DropMenu/DropMenu.reducers';

export function onSelect(state, selectedIndex) {
	return _.assign({}, state, {
		selectedIndex,
		DropMenu: DropMenu.onSelect(state.DropMenu, selectedIndex),
	});
}

export function onSearch(state, searchText) {
	return {
		...state,
		searchText,
		selectedIndex: null,
		DropMenu: {
			...DropMenu.onFocusOption(state.DropMenu, 0),
		},
	}
}

export { DropMenu };
