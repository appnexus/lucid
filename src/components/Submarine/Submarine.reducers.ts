import { ISubmarineState } from './Submarine';

export function onToggle(state: ISubmarineState): ISubmarineState {
	return {
		...state,
		isExpanded: !state.isExpanded,
	};
}

export function onResize(
	state: ISubmarineState,
	height: number
): ISubmarineState {
	return {
		...state,
		height,
		isExpanded: true,
	};
}
