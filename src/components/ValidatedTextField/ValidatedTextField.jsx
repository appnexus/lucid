import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import Validation from '../Validation/Validation';
import TextField from '../TextField/TextField';
import reducers from '../TextField/TextField.reducers';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';

const boundClassNames = bindClassNames('ValidatedTextField');

const {
	object,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "text"], "extend": "TextField"}
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

	render() {
		const {
			className,
			style,
		} = this.props;

		const errorChildProps = ValidatedTextField.Error.findInAllAsProps(this.props);

		return (
			<Validation
				className={classNames(className, boundClassNames('~'))}
				style={style}
				Error={errorChildProps}
			>
				<TextField {..._.omit(this.props, ['className', 'style'])} />
			</Validation>
		);
	}
}));

export default ValidatedTextField;
