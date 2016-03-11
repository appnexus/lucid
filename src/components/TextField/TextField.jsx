import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import Validation from '../Validation/Validation';

const boundClassNames = lucidClassNames.bind('&-TextField');

const {
	bool,
	string,
	func,
	number,
	object,
	oneOfType,
	any,
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "text"]}
 *
 * TextField should cover all your text input needs. It is able to
 * handle single and multi line inputs.
 */
const TextField = React.createClass({
	propTypes: {
		/**
		 * Styles that are passed through to the root `div` container.
		 */
		style: object,

		/**
		 * Styles that are passed through to the underlying `input`.
		 */
		inputStyle: object,

		/**
		 * Set the TextField to multi line mode. Under the hood this will use a
		 * `textarea` instead of an `input` if set to `true`
		 */
		isMultiLine: bool,

		/**
		 * Set the TextField to be in an invalid state by providing a message here.
		 * In most cases this will be a string, but it also accepts any valid React
		 * element. If this is a falsey value, then no error message will be
		 * displayed.
		 */
		Error: any,

		/**
		 * Disables the TextField by greying it out.
		 */
		isDisabled: bool,

		/**
		 * Initial number of rows a multi line TextField should have.
		 */
		rows: number,

		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,

		/**
		 * Fires an event every time the user types text into the `TextField`.
		 *
		 * Signature: `(value, { event, props }) => {}`
		 */
		onChange: func,

		/**
		 * Set the value of the input.
		 */
		value: oneOfType([
			number,
			string
		])
	},

	getDefaultProps() {
		return {
			style: null,
			inputStyle: null,
			Error: null,
			isDisabled: false,
			isMultiLine: false,
			onChange: _.noop,
			rows: 5,
		};
	},

	handleChange(event) {
		const {
			onChange,
		} = this.props;
		const value = _.get(event, 'target.value', '');

		onChange(value, { event, props: this.props });
	},

	render() {
		const {
			Error,
			className,
			inputStyle,
			isDisabled,
			isMultiLine,
			rows,
			style,
			value,
			...passThroughs
		} = this.props;

		const nativeProps = {
			...passThroughs,
			style: inputStyle,
			className: boundClassNames('&-native'),
			disabled: isDisabled,
			onChange: this.handleChange,
			rows,
			value,
		};

		const control = isMultiLine
			? <textarea {...nativeProps}/>
			: <input type='text' {...nativeProps}/>;

		return (
			<Validation
				Error={Error}
				className={boundClassNames('&', {
					'&-is-disabled': isDisabled,
					'&-is-multi-line': isMultiLine,
					'&-is-single-line': !isMultiLine
				}, className)}
				style={style}
			>
				{control}
			</Validation>
		);
	}
});

export default TextField;
