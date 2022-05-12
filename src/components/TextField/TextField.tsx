import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, Overwrite } from '../../util/component-types';
import reducers from './TextField.reducers';
import * as KEYCODE from '../../constants/key-code';

const cx = lucidClassNames.bind('&-TextField');

const { bool, string, func, number, object, oneOfType } = PropTypes;

export interface ITextFieldProps extends StandardProps {
	/** Set the TextField to multi line mode. Under the hood this will use a `textarea` instead of an `input` if set to `true`. */
	isMultiLine?: boolean;

	/** Disables the TextField by greying it out. */
	isDisabled?: boolean;

	/** Initial number of rows a multi line TextField should have. Ignored when
		not in multi-line mode. */
	rows?: number;

	/** Fires an event every time the user types text into the TextField. */
	onChange?: (
		value: string,
		{
			event,
			props,
		}: {
			event: React.FormEvent;
			props: ITextFieldProps;
		}
	) => void;

	/** Fires an on the `input`'s onBlur. */
	onBlur?: (
		currentValue: string,
		{
			event,
			props,
		}: {
			event: React.FocusEvent;
			props: ITextFieldProps;
		}
	) => void;

	/** Fires an event, debounced by `debounceLevel` when the user types text
		into the TextField. */
	onChangeDebounced?: (
		value: string,
		{
			event,
			props,
		}: {
			event: React.FormEvent;
			props: ITextFieldProps;
		}
	) => void;

	/** Fires an event on every keydown */
	onKeyDown?: ({
		event,
		props,
	}: {
		event: React.KeyboardEvent;
		props: ITextFieldProps;
	}) => void;

	/** Fires an event when the user hits "enter" from the TextField. You shouldn't use it if you're using `isMultiLine`. */
	onSubmit?: (
		value: string,
		{
			event,
			props,
		}: {
			event: React.FormEvent;
			props: ITextFieldProps;
		}
	) => void;

	/** Set the value of the input. */
	value: string | number;

	/** Number of milliseconds to debounce the `onChangeDebounced` callback. Only useful if you provide an `onChangeDebounced` handler. */
	debounceLevel?: number;

	/** Set the holding time, in milliseconds, that the component will wait if
		the user is typing and the component gets a new `value` prop.  Any time
		the user hits a key, it starts a timer that prevents state changes from
		flowing in to the component until the timer has elapsed.  This was
		heavily inspired by the [lazy-input](https:/docs.npmjs.com/package/lazy-input) component. */
	lazyLevel?: number;
}

export type ITextFieldPropsWithPassThroughs = Overwrite<
	React.InputHTMLAttributes<HTMLInputElement>,
	ITextFieldProps
>;

export interface ITextFieldState {
	value: number | string;
	isHolding: boolean;
	isMounted: boolean;
}

/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'style',
	'isMultiLine',
	'isDisabled',
	'rows',
	'className',
	'onChange',
	'onBlur',
	'onChangeDebounced',
	'onKeyDown',
	'onSubmit',
	'value',
	'debounceLevel',
	'lazyLevel',
	'initialState',
	'callbackId',
	'children',
];

class TextField extends React.Component<
	ITextFieldPropsWithPassThroughs,
	ITextFieldState,
	{}
> {
	static displayName = 'TextField';
	static peek = {
		description: `\`TextField\` should cover all your text input needs. It is able to handle single- and multi-line inputs.`,
		categories: ['controls', 'text'],
	};
	static propTypes = {
		/**
			Styles that are passed through to native control.
		*/
		style: object,

		/**
			Set the TextField to multi line mode. Under the hood this will use a
			\`textarea\` instead of an \`input\` if set to \`true\`.
		*/
		isMultiLine: bool,

		/**
			Disables the TextField by greying it out.
		*/
		isDisabled: bool,

		/**
			Initial number of rows a multi line TextField should have. Ignored when
			not in multi-line mode.
		*/
		rows: number,

		/**
			Class names that are appended to the defaults.
		*/
		className: string,

		/**
			Fires an event every time the user types text into the TextField.
			Signature: \`(value, { event, props }) => {}\`
		*/
		onChange: func,

		/**
			Fires an on the \`input\`'s onBlur.  Signature:
			\`(currentValue, { event, props }) => {}\`
		*/
		onBlur: func,

		/**
			Fires an event, debounced by \`debounceLevel\`, when the user types text
			into the TextField.  Signature: \`(value, { event, props }) => {}\`
		*/
		onChangeDebounced: func,

		/**
			Fires an event on every keydown Signature: \`({ event, props }) => {}\`
		*/
		onKeyDown: func,

		/**
			Fires an event when the user hits "enter" from the TextField. You
			shouldn't use it if you're using \`isMultiLine\`.  Signature:
			\`(value, { event, props }) => {}\`
		*/
		onSubmit: func,

		/**
			Set the value of the input.
		*/
		value: oneOfType([number, string]),

		/**
			Number of milliseconds to debounce the \`onChangeDebounced\` callback.
			Only useful if you provide an \`onChangeDebounced\` handler.
		*/
		debounceLevel: number,

		/**
			Set the holding time, in milliseconds, that the component will wait if
			the user is typing and the component gets a new \`value\` prop.  Any time
			the user hits a key, it starts a timer that prevents state changes from
			flowing in to the component until the timer has elapsed.  This was
			heavily inspired by the
			[lazy-input](https:/docs.npmjs.com/package/lazy-input) component.
		*/
		lazyLevel: number,
	};

	state = {
		value: this.props.value,
		isHolding: false,
		isMounted: false,
	};

	static defaultProps = {
		style: undefined,
		isDisabled: false,
		isMultiLine: false,
		onBlur: _.noop,
		onChange: _.noop,
		onChangeDebounced: _.noop,
		onSubmit: _.noop,
		onKeyDown: _.noop,
		rows: 5,
		debounceLevel: 500,
		lazyLevel: 1000,
		value: '',
	};

	static reducers = reducers;

	private textareaElement = React.createRef<HTMLTextAreaElement>();
	private inputElement = React.createRef<HTMLInputElement>();
	private nativeElement = this.props.isMultiLine
		? this.textareaElement
		: this.inputElement;

	private handleChangeDebounced = _.debounce(
		(
			value: string,
			{
				event,
				props,
			}: {
				event: React.FormEvent;
				props: ITextFieldProps;
			}
		): void => {
			this.props.onChangeDebounced &&
				this.props.onChangeDebounced(value, { event, props });
		},
		this.props.debounceLevel
	);

	private releaseHold = _.debounce((): void => {
		if (!this.state.isMounted) {
			return;
		}
		this.setState({ isHolding: false });
	}, this.props.lazyLevel);

	private updateWhenReady = _.debounce((newValue): void => {
		if (!this.state.isMounted) {
			return;
		}
		if (this.state.isHolding) {
			this.updateWhenReady(newValue);
		} else if (newValue !== this.state.value) {
			this.setState({ value: newValue });
		}
	}, this.props.lazyLevel);

	handleChange = (event: React.FormEvent): void => {
		const { onChange, onChangeDebounced } = this.props;

		const value = _.get(event, 'target.value', '');

		this.setState({ value, isHolding: true });
		this.releaseHold();

		onChange && onChange(value, { event, props: this.props });

		// Also call the debounced handler in case the user wants debounced change
		// events.
		if (onChangeDebounced !== _.noop) {
			event.persist(); // https://facebook.github.io/react/docs/events.html#event-pooling
			this.handleChangeDebounced(value, { event, props: this.props });
		}
	};

	handleBlur = (event: React.FocusEvent): void => {
		const { onBlur, onChangeDebounced } = this.props;

		const value = _.get(event, 'target.value', '');

		if (onChangeDebounced !== _.noop) {
			this.handleChangeDebounced.flush();
		}
		onBlur && onBlur(value, { event, props: this.props });
	};

	handleKeyDown = (event: React.KeyboardEvent): void => {
		const {
			props,
			props: { onSubmit, onKeyDown, onChangeDebounced },
		} = this;
		const value = _.get(event, 'target.value', '');

		// If the consumer passed an onKeyDown, we call it
		if (onKeyDown) {
			onKeyDown({ event, props });
		}

		if (event.keyCode === KEYCODE.Enter) {
			if (onChangeDebounced !== _.noop) {
				this.handleChangeDebounced.flush();
			}

			onSubmit && onSubmit(value, { event, props: this.props });
		}
	};

	focus = (options?: FocusOptions): void => {
		/* istanbul ignore next */
		(this.nativeElement.current as HTMLElement).focus(options);
	};

	UNSAFE_componentWillMount(): void {
		this.setState({ isMounted: true });
	}

	componentWillUnmount(): void {
		this.setState({ isMounted: false });
	}

	UNSAFE_componentWillReceiveProps(nextProps: ITextFieldProps): void {
		// Allow consumer to optionally control state
		if (_.has(nextProps, 'value')) {
			if (this.state.isHolding) {
				this.updateWhenReady(nextProps.value);
			} else {
				this.setState({ value: nextProps.value });
			}
		}
	}

	render(): React.ReactNode {
		const { className, isDisabled, isMultiLine, rows, style, ...passThroughs } =
			this.props;

		const { value } = this.state;

		const finalProps = {
			...(_.omit(passThroughs, nonPassThroughs) as any),
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
		};

		return isMultiLine ? (
			<textarea ref={this.textareaElement} {...finalProps} />
		) : (
			<input type='text' ref={this.inputElement} {...finalProps} />
		);
	}
}

export default TextField;
