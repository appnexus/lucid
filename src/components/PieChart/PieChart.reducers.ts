export interface IPieChartState {
	isHovering: boolean,
	hoveringIndex: number
}

export default {
	onMouseOut(state: IPieChartState) {
		return {
			...state,
			isHovering: false,
		};
	},
	onMouseOver(state: IPieChartState, hoveringIndex: number) {
		return {
			...state,
			isHovering: true,
			hoveringIndex,
		};
	}
}