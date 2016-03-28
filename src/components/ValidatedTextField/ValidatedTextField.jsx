import _ from 'lodash';
import React from 'react';
import Validation from '../Validation/Validation';
import TextField from '../TextField/TextField';
import reducers from '../TextField/TextField.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';

const boundClassNames = lucidClassNames.bind('&-ValidatedTextField');

const {
	object,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "text"], "extend": "TextField", "madeFrom": ["TextField", "Validation"]}
 *
 * A composition of TextField and Validation.
 */
const ValidatedTextField = React.createClass(createLucidComponentDefinition({
	displayName: 'ValidatedTextField',

	reducers,

	childProps: {
		Error: null,
	},

	propTypes: {
		...TextField.propTypes,

		/**
		 * Passed to the root container.
		 */
		style: object,

		/**
		 * Passed to the root container.
		 */
		className: string,
	},

	getDefaultProps() {
		return TextField.getDefaultProps();
	},

	render() {
		const {
			className,
			style,
		} = this.props;

		const errorChildProps = ValidatedTextField.Error.findInAllAsProps(this.props);

		return (
			<Validation
				className={boundClassNames('&', className)}
				style={style}
				Error={errorChildProps}
			>
				<TextField {..._.omit(this.props, ['className', 'style'])} />
			</Validation>
		);
	}
}));

export default ValidatedTextField;
