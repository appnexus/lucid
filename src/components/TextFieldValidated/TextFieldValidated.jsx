import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Validation from '../Validation/Validation';
import TextField from '../TextField/TextField';
import reducers from '../TextField/TextField.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-TextFieldValidated');

const { any, object, string } = PropTypes;

/**
 *
 * {"categories": ["controls", "text"], "extend": "TextField", "madeFrom": ["TextField", "Validation"]}
 *
 * A composition of TextField and Validation.
 */
const TextFieldValidated = createClass({
	displayName: 'TextFieldValidated',

	reducers,

	components: {
		/**
		 * Content that will be displayed as an error message.
		 */
		Error: createClass({
			displayName: 'TextFieldValidated.Error',
			propName: 'Error',
		}),
	},

	propTypes: {
		/**
		 * Passed to the root container.
		 */
		style: object,

		/**
		 * Passed to the root container.
		 */
		className: string,

		/**
		 * Prop alternative to Error child component
		 */
		Error: any,
	},

	getDefaultProps() {
		return TextField.getDefaultProps();
	},

	focus() {
		this.refs.TextField.focus();
	},

	render() {
		const { className, style, ...passThroughs } = this.props;

		const errorChildProps = _.map(
			findTypes(this.props, TextFieldValidated.Error),
			'props'
		);

		return (
			<Validation
				className={cx('&', className)}
				style={style}
				Error={errorChildProps}
			>
				<TextField
					{...omitProps(passThroughs, TextFieldValidated, [], false)}
					ref={ref => this.refs = { TextField: ref }}
				/>
			</Validation>
		);
	},
});

export default TextFieldValidated;
