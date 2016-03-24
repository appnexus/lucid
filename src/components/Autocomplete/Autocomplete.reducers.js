import * as DropMenu from '../DropMenu/DropMenu.reducers';

export function onChange(state, value) {
	return {
		...state,
		value,
		DropMenu: {
			...state.DropMenu,
			focusedIndex: null,
			isExpanded: value !== ''
		}
	};
}

export { DropMenu };
