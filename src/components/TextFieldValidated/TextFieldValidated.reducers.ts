import { ITextFieldValidatedState } from './TextFieldValidated';

export default {
	onChange(
		state: ITextFieldValidatedState = { value: '' },
		value: string
	): ITextFieldValidatedState {
		return {
			...state,
			value: value,
		};
	},
};
