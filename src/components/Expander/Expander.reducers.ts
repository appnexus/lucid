import { IExpanderState } from './Expander';

export function onToggle(state: IExpanderState): IExpanderState {
	return {
		...state,
		isExpanded: !state.isExpanded,
	};
}

// TODO:  why doesn't typscript catch this when we `import * as reducers` from
// this file.
//
// export function doesNotExist(state: IExpanderState): IExpanderState {
// 	return {
// 		...state,
// 		isExpanded: !state.isExpanded,
// 	};
// }
