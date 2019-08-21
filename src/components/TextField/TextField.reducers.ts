export interface ITextFieldState {
	value: number | string;
	isHolding: boolean;
	isMounted: boolean;
}

export default {
	onChange(
		state: ITextFieldState,
		value: number | string
	): ITextFieldState  {
		return {
			...state,
			value: value,
		};
	},
};
