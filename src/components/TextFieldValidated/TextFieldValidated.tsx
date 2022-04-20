import _ from 'lodash';
import React from 'react';
import PropTypes, { shape } from 'prop-types';

import Validation, { IValidationProps } from '../Validation/Validation';
import TextField, {
	ITextFieldPropsWithPassThroughs,
} from '../TextField/TextField';
import reducers from '../TextField/TextField.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes } from '../../util/component-types';

const cx = lucidClassNames.bind('&-TextFieldValidated');

const { any, object, string, bool } = PropTypes;

export interface ITextFieldValidatedErrorProps extends IValidationProps {
	description?: string;
}

const TextFieldValidatedError = (_props: ITextFieldValidatedErrorProps): null =>
	null;
TextFieldValidatedError.displayName = 'TextFieldValidated.Error';
TextFieldValidatedError.peek = {
	description: `Content that will be displayed as an error message.`,
};
TextFieldValidatedError.propName = 'Error';

/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'style',
	'className',
	'Error',
	'Info',
	'Success',
	'initialState',
];

export interface ITextFieldValidatedProps
	extends ITextFieldPropsWithPassThroughs {
	Error?: React.ReactNode;
	Info?: string;
	Success?: {
		message: string;
		disappearing?: boolean;
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
		description: `A composite of \`TextField\` and \`Validation\`.`,
		categories: ['controls', 'text'],
	};

	static reducers = reducers;

	static propTypes = {
		/**
			Passed to the root container.
		*/
		style: object,

		/**
			Passed to the root container.
		*/
		className: string,

		/**
			Prop alternative to Error child component
		*/
		Error: any,

		/**
			Optional information text that is styled less aggressively than an error
		 */
		Info: string,

		/**
			Optional information text that is styled as "success". Also contains
		  `disappearing` prop for message that appears and fades away.
		 */
		Success: shape({
			message: string,
			disappearing: bool,
		}),
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
		} else if (this.props.Info) {
			childProps = [this.props.Info];
		} else if (this.props.Success && this.props.Success.message) {
			childProps = [this.props.Success.message];
		}

		const isSuccess =
			!this.props.Error && !this.props.Info && this.props.Success;

		return (
			<Validation
				className={cx('&', className, {
					'-info': !this.props.Error && this.props.Info,
					'-success':
						!this.props.Error && !this.props.Info && this.props.Success,
					'-disappearing':
						isSuccess && this.props.Success && this.props.Success.disappearing,
				})}
				style={style}
				Error={childProps}
			>
				<TextField
					{...(_.omit(passThroughs, nonPassThroughs) as any)}
					ref={this.textFieldRef}
				/>
			</Validation>
		);
	}
}

export default TextFieldValidated;
