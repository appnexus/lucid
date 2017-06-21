import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import reducers from './TextField.reducers';
import * as KEYCODE from '../../constants/key-code';

const cx = lucidClassNames.bind('&-TextField');

const { bool, string, func, number, object, oneOfType } = PropTypes;

/**
 *
 * {"categories": ["controls", "text"]}
 *
 * TextField should cover all your text input needs. It is able to handle
 * single and multi line inputs.
 *
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
		 * Fires an on the `input`'s onBlur.
		 *
		 * Signature: `(currentValue, { event, props }) => {}`
		 */
		onBlur: func,

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
		 * Signature: `({ event, props }) => {}`
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
		value: oneOfType([number, string]),

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
			onBlur: _.noop,
			onChange: _.noop,
			onChangeDebounced: _.noop,
			onSubmit: _.noop,
			rows: 5,
			debounceLevel: 500,
			lazyLevel: 1000,
			value: '',
		};
	},

	getInitialState() {
		return {
			value: this.props.value,
		};
	},

	componentWillMount() {
		// Because we want the debounceLevel to be configurable, we can't put the
		// debounced handler directly on the react class, so we set it up right
		// before mount
		this._isMounted = true;
		this._handleChangeDebounced = _.debounce((...args) => {
			this.props.onChangeDebounced(...args);
		}, this.props.debounceLevel);

		this._releaseHold = _.debounce(() => {
			if (!this._isMounted) {
				return;
			}
			this.setState({ isHolding: false });
		}, this.props.lazyLevel);

		this._updateWhenReady = _.debounce(newValue => {
			if (!this._isMounted) {
				return;
			}
			if (this.state.isHolding) {
				this._updateWhenReady(newValue);
			} else if (newValue !== this.state.value) {
				this.setState({ value: newValue });
			}
		}, this.props.lazyLevel);
	},

	componentWillUnmount() {
		this._isMounted = false;
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
		const { onChange, onChangeDebounced } = this.props;

		const value = _.get(event, 'target.value', '');

		this.setState({ value, isHolding: true });
		this._releaseHold();

		onChange(value, { event, props: this.props });

		// Also call the debounced handler in case the user wants debounced change
		// events.
		if (onChangeDebounced !== _.noop) {
			event.persist(); // https://facebook.github.io/react/docs/events.html#event-pooling
			this._handleChangeDebounced(value, { event, props: this.props });
		}
	},

	handleBlur(event) {
		const { onBlur } = this.props;

		const value = _.get(event, 'target.value', '');

		onBlur(value, { event, props: this.props });
	},

	handleKeyDown(event) {
		const { props, props: { onSubmit, onKeyDown } } = this;
		const value = _.get(event, 'target.value', '');

		// If the consumer passed an onKeyDown, we call it
		if (onKeyDown) {
			onKeyDown({ event, props });
		}

		if (event.keyCode === KEYCODE.Enter) {
			onSubmit(value, { event, props: this.props });
		}
	},

	focus() {
		/* istanbul ignore next */
		this.refs.nativeElement.focus();
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

		const { value } = this.state;

		const finalProps = {
			...omitProps(passThroughs, TextField, ['children']),
			className: cx(
				'&',
				{
					'&-is-disabled': isDisabled,
					'&-is-multi-line': isMultiLine,
					'&-is-single-line': !isMultiLine,
				},
				className
			),
			disabled: isDisabled,
			onChange: this.handleChange,
			onBlur: this.handleBlur,
			onKeyDown: this.handleKeyDown,
			style,
			rows,
			value,
			ref: ref => this.refs = { nativeElement: ref },
		};

		return isMultiLine
			? <textarea {...finalProps} />
			: <input type="text" {...finalProps} />;
	},
});

export default TextField;
