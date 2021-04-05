import { ITextFieldValidatedState } from './TextFieldValidated';

export function onChange(
	state: ITextFieldValidatedState = { value: '' },
	value: string
): ITextFieldValidatedState {
	return {
		...state,
		value: value,
	};
}

export default { onChange };
