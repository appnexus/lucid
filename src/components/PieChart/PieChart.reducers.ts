export interface IPieChartState {
	isHovering: boolean;
	hoveringIndex: number;
}

export function onMouseOut(state: IPieChartState) {
	return {
		...state,
		isHovering: false,
	};
}

export function onMouseOver(state: IPieChartState, hoveringIndex: number) {
	return {
		...state,
		isHovering: true,
		hoveringIndex,
	};
}

export default {
	onMouseOut,
	onMouseOver,
};
