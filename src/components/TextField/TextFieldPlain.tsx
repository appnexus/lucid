import React from 'react';

import { lucidClassNames } from '../../util/style-helpers';
import PropTypes from 'prop-types';

const cx = lucidClassNames.bind('&-TextFieldPlain');

type InputProps = JSX.IntrinsicElements['input'];
type TextareaProps = JSX.IntrinsicElements['textarea'];

interface TextFieldInputPlain extends InputProps {
	isDisabled?: boolean;
	isMultiLine?: boolean;
	rows?: number;
	style?: object;
	placeholder?: string;
}
interface TextFieldTextareaPlain extends TextareaProps {
	isDisabled?: boolean;
	isMultiLine?: boolean;
}

const TextFieldPlain = React.forwardRef(
	(
		{
			isDisabled = false,
			isMultiLine = false,
			...props
		}: TextFieldInputPlain | TextFieldTextareaPlain,
		ref: React.Ref<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const className = cx(
			'&',
			{
				'&-is-disabled': isDisabled,
				'&-is-multi-line': isMultiLine,
				'&-is-single-line': !isMultiLine,
			},
			props.className
		);
		if (isMultiLine) {
			return (
				<textarea
					ref={ref as React.Ref<HTMLTextAreaElement>}
					{...(props as TextFieldTextareaPlain)}
					className={className}
				/>
			);
		} else {
			return (
				<input
					ref={ref as React.Ref<HTMLInputElement>}
					{...(props as TextFieldInputPlain)}
					className={className}
				/>
			);
		}
	}
);
// @ts-ignore
TextFieldPlain.propTypes = {
	isDisabled: PropTypes.bool,
	isMultiLine: PropTypes.bool,
	className: PropTypes.string,
};
TextFieldPlain.displayName = 'TextFieldPlain';
export default TextFieldPlain;
