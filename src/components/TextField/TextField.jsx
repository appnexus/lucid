import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';
import reducers from './TextField.reducers';
import * as KEYCODE from '../../constants/key-code';

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
const TextField = createClass({
	displayName: 'TextField',

	reducers,

	propTypes: {
		/**
		 * Styles that are passed through to native control.
		 */
		style: object,

		/**
		 * Set the TextField to multi line mode. Under the hood this will use a
		 * `textarea` instead of an `input` if set to `true`.
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
		 * Fires an event on every keydown
		 *
		 * Signature: `(event) => {}`
		 */
		onKeyDown: func,

		/**
		 * Fires an event when the user hits "enter" from the TextField. You
		 * shouldn't use it if you're using `isMultiLine`.
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
		 * Only useful if you provide an `onChangeDebounced` handler.
		 */
		debounceLevel: number,

		/**
		 * Set the holding time, in milliseconds, that the component will wait if
		 * the user is typing and the component gets a new `value` prop.
		 *
		 * Any time the user hits a key, it starts a timer that prevents state
		 * changes from flowing in to the component until the timer has elapsed.
		 * This was heavily inspired by the [lazy-input][li] component.
		 *
		 * [li]: https://www.npmjs.com/package/lazy-input
		 */
		lazyLevel: number,
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
			lazyLevel: 1000,
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

		this._releaseHold = _.debounce(() => {
			this.setState({ isHolding: false });
		}, this.props.lazyLevel);

		this._updateWhenReady = _.debounce((newValue) => {
			if (this.state.isHolding) {
				this._updateWhenReady(newValue);
			} else if(newValue !== this.state.value) {
				this.setState({ value: newValue });
			}
		}, this.props.lazyLevel);
	},

	componentWillReceiveProps(nextProps) {
		// Allow consumer to optionally control state
		if (_.has(nextProps, 'value')) {
			if (this.state.isHolding) {
				this._updateWhenReady(nextProps.value);
			} else {
				this.setState({ value: nextProps.value });
			}
		}
	},

	handleChange(event) {
		const {
			onChange,
		} = this.props;

		const value = _.get(event, 'target.value', '');

		this.setState({ value, isHolding: true });
		this._releaseHold();

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

		if (event.keyCode === KEYCODE.Enter) {
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
});

export default TextField;
