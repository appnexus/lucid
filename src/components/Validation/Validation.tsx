import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import _ from 'lodash';

const cx = lucidClassNames.bind('&-Validation');

const { any } = PropTypes;

interface IErrorProps {
	description?: string;
	children?: React.ReactNode;
}

// const Error: React.SFC<IErrorProps> = props => {
// 	return (
// 		<div>{props.children}</div>
// 	);
// };
class Error extends React.Component<IErrorProps, {}, {}> {
	static displayName: 'Validation.Error';
	static peek: {
		description: `
			Content that will be displayed as an error message.
		`,
	};
	static propName: 'Error';
	constructor(props: IErrorProps) {
		super(props);
	}

	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
};

export interface IValidationProps {
	//* Any valid React children. */
	children?: React.ReactNode;

	/** Classes that are appended to the component defaults. This prop is run through the \`classnames\` library. */
	className?: string;

	/** In most cases this will be a string, but it also accepts any valid React
			element. If this is a falsey value, then no error message will be
			displayed.  If this is the literal \`true\`, it will add the
			\`-is-error\` class to the wrapper div, but not render the
			\`-error-content\` \`div\`. */
	// Error?: string | React.ReactNode & { props: IErrorProps };
	Error?: any;
}

class Validation extends React.Component<IValidationProps, {}, {}> {
	static displayName: 'Validation';
	static peek = {
		description: `
			Validation is a wrapper component that's meant to be used by other
			components. Wrap your form components in it and style them accordingly
			if there's an error.
		`,
		categories: ['helpers'],
	}
	static propTypes = {
		Error: any`
			In most cases this will be a string, but it also accepts any valid React
			element. If this is a falsey value, then no error message will be
			displayed.  If this is the literal \`true\`, it will add the
			\`-is-error\` class to the wrapper div, but not render the
			\`-error-content\` \`div\`.
		`,

		className: any`
			Classes that are appended to the component defaults. This prop is run
			through the \`classnames\` library.
		`,

		children: any.isRequired`
			Any valid React children.
		`,
	}
	constructor(props: IValidationProps) {
		super(props);
	}
	static defaultProps = {
		Error: <Error/>,
	};


	render() {
		const { className, children, ...passThroughs } = this.props;

		const errorChildProps = _.get(
			getFirst(this.props, Validation.Error),
			'props'
		);

		return (
			<div
				{...omitProps(passThroughs, Validation)}
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
						{...omitProps(errorChildProps, Validation.Error)}
						className={cx('&-error-content', errorChildProps.className)}
					>
						{errorChildProps.children}
					</div>
				) : null}
			</div>
		);
	}
};

export default Validation;
