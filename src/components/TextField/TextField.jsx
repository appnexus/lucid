import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import reducers from './TextField.reducers';

const boundClassNames = lucidClassNames.bind('&-TextField');

const {
	bool,
	string,
	func,
	number,
	object,
	oneOfType,
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "text"]}
 *
 * TextField should cover all your text input needs. It is able to handle
 * single and multi line inputs.
 *
 * Like all other Lucid components, it is stateless by default unless you run
 * it through `buildStatefulComponent`. If you do that it will maintain
 * internal state for the `value` without losing the ability to pass a new
 * `value` through props.
 */
const TextField = React.createClass(createLucidComponentDefinition({
	displayName: 'TextField',

	reducers,

	propTypes: {
		/**
		 * Styles that are passed through to native control.
		 */
		style: object,

		/**
		 * Set the TextField to multi line mode. Under the hood this will use a
		 * `textarea` instead of an `input` if set to `true`
		 */
		isMultiLine: bool,

		/**
		 * Disables the TextField by greying it out.
		 */
		isDisabled: bool,

		/**
		 * Initial number of rows a multi line TextField should have. Ignored when
		 * not in multi-line mode.
		 */
		rows: number,

		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,

		/**
		 * Fires an event every time the user types text into the TextField.
		 *
		 * Signature: `(value, { event, props }) => {}`
		 */
		onChange: func,

		/**
		 * Fires an event, debounced by `debounceLevel`, when the user types text
		 * into the TextField.
		 *
		 * Signature: `(value, { event, props }) => {}`
		 */
		onChangeDebounced: func,

		/**
		 * Fires an event when the user hits "enter" from the TextField.
		 *
		 * Signature: `(value, { event, props }) => {}`
		 */
		onSubmit: func,

		/**
		 * Set the value of the input.
		 */
		value: oneOfType([
			number,
			string
		]),

		/**
		 * Number of milliseconds to debounce the `onChangeDebounced` callback.
		 * Only really used if you provide an `onChangeDebouned`.
		 */
		debounceLevel: number,
	},

	getDefaultProps() {
		return {
			style: null,
			isDisabled: false,
			isMultiLine: false,
			onChange: _.noop,
			onChangeDebounced: _.noop,
			onSubmit: _.noop,
			rows: 5,
			debounceLevel: 500,
		};
	},

	getInitialState() {
		return {
			value: this.props.value
		}
	},

	componentWillMount() {
		// Because we want the debounceLevel to be configurable, we can't put the
		// debounced handler directly on the react class, so we set it up right
		// before mount
		this._handleChangeDebounced = _.debounce((...args) => {
			this.props.onChangeDebounced(...args);
		}, this.props.debounceLevel);
	},

	componentWillReceiveProps(nextProps) {
		// Allow consumer to optionally control state
		if (_.has(nextProps, 'value')) {
			this.setState({ value: nextProps.value });
		}
	},

	handleChange(event) {
		const {
			onChange,
		} = this.props;

		const value = _.get(event, 'target.value', '');

		this.setState({ value });

		onChange(value, { event, props: this.props });

		// Also call the debounced handler in case the user wants debounced change
		// events.
		this._handleChangeDebounced(value, { event, props: this.props });
	},

	handleKeyDown(event) {
		const {
			onSubmit,
			onKeyDown
		} = this.props;
		const value = _.get(event, 'target.value', '');

		// If the consumer passed an onKeyDown, we call it
		if (onKeyDown) {
			onKeyDown(event);
		}

		if (event.key === 'Enter') {
			onSubmit(value, {event, props: this.props });
		}
	},

	render() {
		const {
			className,
			isDisabled,
			isMultiLine,
			rows,
			style,
			...passThroughs
		} = this.props;

		const {
			value
		} = this.state;

		const finalProps = {
			..._.omit(passThroughs, 'children'),
			className: boundClassNames('&', {
				'&-is-disabled': isDisabled,
				'&-is-multi-line': isMultiLine,
				'&-is-single-line': !isMultiLine
			}, className),
			disabled: isDisabled,
			onChange: this.handleChange,
			onKeyDown: this.handleKeyDown,
			style,
			rows,
			value,
		};

		return isMultiLine
			? <textarea {...finalProps}/>
			: <input type='text' {...finalProps}/>;
	}
}));

export default TextField;
