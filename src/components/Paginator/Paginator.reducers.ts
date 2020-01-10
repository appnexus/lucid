import _ from 'lodash';
import * as SingleSelect from '../SingleSelect/SingleSelect.reducers';
import * as TextField from '../TextField/TextField.reducers';
import { IPaginatorState } from './Paginator';

export function onPageSelect(
	state: IPaginatorState,
	pageIndex: number,
	totalPages: number
): IPaginatorState {
	return {
		...state,
		selectedPageIndex: _.clamp(pageIndex, 0, totalPages - 1),
	};
}

export function onPageSizeSelect(
	state: IPaginatorState,
	selectedPageSizeIndex: number
): IPaginatorState {
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
