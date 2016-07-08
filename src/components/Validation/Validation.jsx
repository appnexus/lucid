import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes } from '../../util/component-types';
import _ from 'lodash';

const cx = lucidClassNames.bind('&-Validation');

const {
	any,
} = React.PropTypes;

/**
 *
 * {"categories": ["helpers"]}
 *
 * Validation is a wrapper component that's meant to be used by other
 * components. Wrap your form components in it and style them accordingly if
 * there's an error.
 */
const Validation = createClass({
	displayName: 'Validation',

	components: {
		/**
		 * Content that will be displayed as an error message.
		 */
		Error: createClass({
			displayName: 'Validation.Error',
			propName: 'Error',
		}),
	},

	propTypes: {
		/**
		 * In most cases this will be a string, but it also accepts any valid React
		 * element. If this is a falsey value, then no error message will be
		 * displayed.
		 */
		Error: any,

		/**
		 * Classes that are appended to the component defaults. This prop is run
		 * through the `classnames` library.
		 */
		className: any,

		/**
		 * Any valid React children.
		 */
		children: any.isRequired,
	},

	getDefaultProps() {
		return {
			className: null,
			Error: null,
		};
	},

	render() {
		const {
			className,
			children,
			...passThroughs,
		} = this.props;

		const errorChildProps = _.first(_.map(findTypes(this.props, Validation.Error), 'props'));

		return (
			<div
				{...passThroughs}
				className={cx('&', {
					'&-is-error': errorChildProps && errorChildProps.children,
				}, className)}
			>
				{children}
				{errorChildProps && errorChildProps.children ?
					<div className={cx('&-error-content')} >
						{errorChildProps.children}
					</div>
				: null}
			</div>
		);
	},
});

export default Validation;
