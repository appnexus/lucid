import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, omitProps, StandardProps } from '../../util/component-types';
import _ from 'lodash';

const cx = lucidClassNames.bind('&-Validation');

const { string, any } = PropTypes;

interface IValidationErrorProps extends StandardProps {
	description?: string;
}
const ValidationError = (_props: IValidationErrorProps): null => null;
ValidationError.displayName = 'Validation.Error';
ValidationError.peek = {
	description: `
		Content that will be displayed as an error message.
	`,
};
ValidationError.propName = 'Error';
ValidationError.propTypes = {
	description: string,
	children: any,
};

export interface IValidationProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	Error?: React.ReactNode;
	textColor?: string;
}

export const Validation = (props: IValidationProps): React.ReactElement => {
	const { className, children, textColor, ...passThroughs } = props;

	const errorChildProps = _.get(
		getFirst<IValidationErrorProps>(props, Validation.Error),
		'props'
	);

	return (
		<div
			{...omitProps<IValidationProps>(
				passThroughs,
				undefined,
				_.keys(Validation.propTypes)
			)}
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
					{...omitProps<IValidationProps>(errorChildProps, undefined)}
					className={cx('&-error-content', errorChildProps.className)}
					style={{ color: textColor }}
				>
					{errorChildProps.children}
				</div>
			) : null}
		</div>
	);
};

Validation.displayName = 'Validation';
Validation.peek = {
	description: `
		Validation is a wrapper component that's meant to be used by other
		components. Wrap your form components in it and style them accordingly
		if there's an error.
	`,
	categories: ['helpers'],
};
Validation.propTypes = {
	Error: any`
		In most cases this will be a string, but it also accepts any valid React
		element. If this is a falsey value, then no error message will be
		displayed.  If this is the literal \`true\`, it will add the
		\`-is-error\` class to the wrapper div, but not render the
		\`-error-content\` \`div\`.
	`,

	className: string`
		Classes that are appended to the component defaults. This prop is run
		through the \`classnames\` library.
	`,

	children: any.isRequired`
		Any valid React children.
	`,
};

Validation.Error = ValidationError;

export default Validation;
