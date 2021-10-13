import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';

import Validation, { IValidationProps } from '../Validation/Validation';
import TextField, {
	ITextFieldPropsWithPassThroughs,
} from '../TextField/TextField';
import reducers from '../TextField/TextField.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-TextFieldValidated');

const { any, object, string } = PropTypes;

interface ITextFieldValidatedErrorProps extends IValidationProps {
	description?: string;
}

const TextFieldValidatedError = (_props: ITextFieldValidatedErrorProps): null =>
	null;
TextFieldValidatedError.displayName = 'TextFieldValidated.Error';
TextFieldValidatedError.peek = {
	description: `
		Content that will be displayed as an error message.
	`,
};
TextFieldValidatedError.propName = 'Error';

export interface ITextFieldValidatedProps
	extends ITextFieldPropsWithPassThroughs {
	Error?: React.ReactNode;
	special?: {
		message: string;
		textColor: string;
		borderColor: string;
	};
}

export interface ITextFieldValidatedState {
	value: string | number;
}

class TextFieldValidated extends React.Component<
	ITextFieldValidatedProps,
	ITextFieldValidatedState
> {
	static displayName = 'TextFieldValidated';

	static Error = TextFieldValidatedError;

	static peek = {
		description: `
					A composition of TextField and Validation.
				`,
		categories: ['controls', 'text'],
	};

	static reducers = reducers;

	static propTypes = {
		style: object`
			Passed to the root container.
		`,

		className: string`
			Passed to the root container.
		`,

		Error: any`
			Prop alternative to Error child component
		`,

		special: object`
			Optional information text that can be styled in a variety of border and font colors
			Object with props 'message' string, 'textColor' and 'borderColor' oneOf ['green', 'aquamarine', 'blue', 'purple', 'yellow', 'orange', 'red', 'grey']
		`,
	};

	static defaultProps = TextField.defaultProps;

	private textFieldRef = React.createRef<TextField>();

	focus = () => {
		this.textFieldRef.current && this.textFieldRef.current.focus();
	};

	render() {
		const { className, style, ...passThroughs } = this.props;

		let childProps;

		if (this.props.Error) {
			childProps = _.map(
				findTypes(this.props, TextFieldValidated.Error),
				'props'
			);
		} else if (this.props.special) {
			childProps = [this.props.special?.message];
		}

		let specialStyle;
		if (!this.props.Error && this.props.special) {
			const { textColor, borderColor } = this.props.special;
			specialStyle = { color: textColor, borderColor: borderColor };
		}
		const isSpecial = !this.props.Error && this.props.special;

		return (
			<Validation
				className={cx('&', className)}
				style={{ ...style, ...specialStyle }}
				Error={childProps}
				textColor={isSpecial ? this.props.special?.textColor : undefined}
			>
				<TextField
					{...omitProps(
						passThroughs,
						undefined,
						_.keys(TextFieldValidated.propTypes),
						false
					)}
					borderColor={isSpecial ? this.props.special?.borderColor : undefined}
					ref={this.textFieldRef}
				/>
			</Validation>
		);
	}
}

export default TextFieldValidated;
