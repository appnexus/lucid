import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import _ from 'lodash';

const boundClassNames = bindClassNames('Validation');

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
const Validation = React.createClass(createLucidComponentDefinition({
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

		const rootClasses = classNames(className, boundClassNames('~', {
			'is-error': errorChildProps,
		}));

		return (
			<div
				{...passThroughs}
				className={rootClasses}
			>
				{children}
				{errorChildProps ?
					<div className={boundClassNames('error-content')} >
						{errorChildProps.children || errorChildProps}
					</div>
				: null}
			</div>
		);
	}
}));

export default Validation;
