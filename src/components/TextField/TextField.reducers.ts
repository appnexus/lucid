export interface ITextFieldState {
	value: number | string;
	isHolding: boolean;
	isMounted: boolean;
}

export function onChange(
	state: ITextFieldState,
	value: number | string
): ITextFieldState {
	return {
		...state,
		value: value,
	};
}

export default { onChange };
