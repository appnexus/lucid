import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Validation');

const { string, any } = PropTypes;

/** Validation Error */
export interface IValidationErrorProps extends StandardProps {
	description?: string;
}
const ValidationError = (_props: IValidationErrorProps): null => null;
ValidationError.displayName = 'Validation.Error';
ValidationError.peek = {
	description: `Content that will be displayed as an error message.`,
};
ValidationError.propName = 'Error';
ValidationError.propTypes = {
	description: string,
	children: any,
};

/** Validation */
export interface IValidationProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	Error?: React.ReactNode;
}

export const Validation = (props: IValidationProps): React.ReactElement => {
	const { className, children, ...passThroughs } = props;
	const errorChildProps = _.get(
		getFirst<IValidationErrorProps>(props, Validation.Error),
		'props'
	);

	return (
		<div
			{...omit(passThroughs, [
				'Error',
				'className',
				'children',
				'initialState',
				'callbackId',
			])}
			className={cx(
				'&',
				{
					'&-is-error': errorChildProps && errorChildProps.children,
				},
				className
			)}
		>
			{children}
			{errorChildProps &&
			errorChildProps.children &&
			errorChildProps.children !== true ? (
				<div
					{...omit(errorChildProps, ['initialState', 'callbackId'])}
					className={cx('&-error-content', errorChildProps.className)}
				>
					{errorChildProps.children}
				</div>
			) : null}
		</div>
	);
};

Validation.displayName = 'Validation';
Validation.peek = {
	description: `\`Validation\` is a wrapper component that's meant to be used by other components. Wrap your form components in one, and, if there's an error, style them accordingly.`,
	categories: ['helpers'],
};
Validation.propTypes = {
	/**
		In most cases this will be a string, but it also accepts any valid React
		element. If this is a falsey value, then no error message will be
		displayed.  If this is the literal \`true\`, it will add the
		\`-is-error\` class to the wrapper div, but not render the
		\`-error-content\` \`div\`.
	*/
	Error: any,

	/**
		Classes that are appended to the component defaults. This prop is run
		through the \`classnames\` library.
	*/
	className: string,

	/**
		Any valid React children.
	*/
	children: any.isRequired,
};

Validation.Error = ValidationError;

export default Validation;
