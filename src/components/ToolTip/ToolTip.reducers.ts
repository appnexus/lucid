import { IToolTipState } from './ToolTip';

export function onMouseOver(state: IToolTipState): IToolTipState {
	return {
		...state,
		isExpanded: true,
	};
}

export function onMouseOut(state: IToolTipState): IToolTipState {
	return {
		...state,
		isExpanded: false,
	};
}
