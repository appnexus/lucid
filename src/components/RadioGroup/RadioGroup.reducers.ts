export interface IRadioGroupState {
	selectedIndex?: number;
}

export default {
	onSelect(state: IRadioGroupState = {}, selectedIndex: number) {
		return {
			...state,
			selectedIndex,
		};
	},
};
