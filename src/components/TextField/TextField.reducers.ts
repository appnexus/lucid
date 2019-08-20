import { ITextFieldState } from './TextField';

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
