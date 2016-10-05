import _ from 'lodash';
import * as DropMenu from '../DropMenu/DropMenu.reducers';

export function onSelect(state, selectedIndex) {
	return {
		...state,
		selectedIndex,
		DropMenu: DropMenu.onSelect(state.DropMenu, selectedIndex),
	};
}

export function onSearch(state, searchText, flattenedOptions, {props}) {
	const {
		optionFilter,
	} = props;

	const firstVisibleIndex = _.get(_.find(flattenedOptions, ({optionProps}) => {
		return optionFilter(searchText, optionProps);
	}), 'optionIndex');

	return {
		...state,
		searchText,
		selectedIndex: null,
		DropMenu: {
			...DropMenu.onFocusOption(state.DropMenu, firstVisibleIndex),
		},
	}
}

export { DropMenu };
