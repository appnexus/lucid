import _ from 'lodash';
import * as SingleSelect from '../SingleSelect/SingleSelect.reducers';
import * as TextField from '../TextField/TextField.reducers';

export function onPageSelect(state, pageIndex, totalPages) {
	return {
		...state,
		selectedPageIndex: _.clamp(pageIndex, 0, totalPages - 1),
	};
}

export function onPageSizeSelect(state, selectedPageSizeIndex) {
	return {
		...state,
		selectedPageIndex: 0,
		selectedPageSizeIndex,
		SingleSelect: SingleSelect.onSelect(
			state.SingleSelect,
			selectedPageSizeIndex
		),
	};
}

export { SingleSelect, TextField };
