import { ITextFieldState } from './TextField';

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
