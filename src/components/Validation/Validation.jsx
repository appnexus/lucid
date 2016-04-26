import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-definition';
import _ from 'lodash';

const boundClassNames = lucidClassNames.bind('&-Validation');

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

	childProps: {
		Error: {} // intentionally left blank since we only care about `children`
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
			...passThroughs
		} = this.props;

		const errorChildProps = _.first(Validation.Error.findInAllAsProps(this.props));

		return (
			<div
				{...passThroughs}
				className={boundClassNames('&', {
					'&-is-error': errorChildProps,
				}, className)}
			>
				{children}
				{errorChildProps ?
					<div className={boundClassNames('&-error-content')} >
						{errorChildProps.children || errorChildProps}
					</div>
				: null}
			</div>
		);
	}
});

export default Validation;
