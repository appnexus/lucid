import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Validation from '../Validation/Validation';
import TextField from '../TextField/TextField';
import reducers from '../TextField/TextField.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-TextFieldValidated');

const { any, object, string } = PropTypes;

const TextFieldValidated = createClass({
	displayName: 'TextFieldValidated',

	statics: {
		peek: {
			description: `
				A composition of TextField and Validation.
			`,
			categories: ['controls', 'text'],
			madeFrom: ['TextField', 'Validation'],
			extend: 'TextField',
		},
	},

	reducers,

	components: {
		Error: createClass({
			displayName: 'TextFieldValidated.Error',
			statics: {
				peek: {
					description: `
						Content that will be displayed as an error message.
					`,
				},
			},
			propName: 'Error',
		}),
	},

	propTypes: {
		style: object`
			Passed to the root container.
		`,

		className: string`
			Passed to the root container.
		`,

		Error: any`
			Prop alternative to Error child component
		`,
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
					ref={ref => (this.refs = { TextField: ref })}
				/>
			</Validation>
		);
	},
});

export default TextFieldValidated;
