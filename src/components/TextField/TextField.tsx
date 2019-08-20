import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps } from '../../util/component-types';
import reducers from './TextField.reducers';
import * as KEYCODE from '../../constants/key-code';

const cx = lucidClassNames.bind('&-TextField');

const { bool, string, func, number, object, oneOfType } = PropTypes;

type OnChangeDebounced = (
	value: number | string,
	{ event, props }: {
		event: React.FormEvent;
		props: ITextFieldProps
	}
) => void;

interface ITextFieldProps {
	/** Appended to the component-specific class names set on the root element. */
	className?: string;

	/** Styles that are passed through to native control. */
	style: object;

	/** Set the TextField to multi line mode. Under the hood this will use a `textarea` instead of an `input` if set to `true`. */
	isMultiLine: boolean;

	/** Disables the TextField by greying it out. */
	isDisabled: boolean;

	/** Initial number of rows a multi line TextField should have. Ignored when
		not in multi-line mode. */
	rows: number;

	/** Fires an event every time the user types text into the TextField. */
	onChange: (
		value: number | string,
		{ event, props }: {
			event: React.FormEvent;
			props: ITextFieldProps
		}
	) => void;

	/** Fires an on the `input`'s onBlur. */
	onBlur: (
		currentValue: number | string,
		{ event, props }: {
			event: React.FocusEvent;
			props: ITextFieldProps
		}
	) => void;


	/** Fires an event, debounced by `debounceLevel` when the user types text
		into the TextField. */
	onChangeDebounced: OnChangeDebounced;

	/** Fires an event on every keydown */
	onKeyDown: (
		{ event, props }: {
			event: React.KeyboardEvent;
			props: ITextFieldProps
		}
	) => void;

	/** Fires an event when the user hits "enter" from the TextField. You shouldn't use it if you're using `isMultiLine`. */
	onSubmit: (
		value: number | string,
		{ event, props }: {
			event: React.FormEvent;
			props: ITextFieldProps
		}
	) => void;

	/** Set the value of the input. */
	value: number | string;


	/** Number of milliseconds to debounce the `onChangeDebounced` callback. Only useful if you provide an `onChangeDebounced` handler. */
	debounceLevel: number;

	/** Set the holding time, in milliseconds, that the component will wait if
		the user is typing and the component gets a new `value` prop.  Any time
		the user hits a key, it starts a timer that prevents state changes from
		flowing in to the component until the timer has elapsed.  This was
		heavily inspired by the [lazy-input](https:/docs.npmjs.com/package/lazy-input) component. */
	lazyLevel: number;
}

export interface ITextFieldState {
	value: number | string;
	isHolding: boolean;
}

class TextField extends React.Component<ITextFieldProps, ITextFieldState, {}> {
	static displayName = 'TextField';
	static peek = {
		description: `
			TextField should cover all your text input needs. It is able to handle
			single and multi line inputs.
		`,
		categories: ['controls', 'text'],
	};
	static propTypes = {
		style: object`
			Styles that are passed through to native control.
		`,

		isMultiLine: bool`
			Set the TextField to multi line mode. Under the hood this will use a
			\`textarea\` instead of an \`input\` if set to \`true\`.
		`,

		isDisabled: bool`
			Disables the TextField by greying it out.
		`,

		rows: number`
			Initial number of rows a multi line TextField should have. Ignored when
			not in multi-line mode.
		`,

		className: string`
			Class names that are appended to the defaults.
		`,

		onChange: func`
			Fires an event every time the user types text into the TextField.
			Signature: \`(value, { event, props }) => {}\`
		`,

		onBlur: func`
			Fires an on the \`input\`'s onBlur.  Signature:
			\`(currentValue, { event, props }) => {}\`
		`,

		onChangeDebounced: func`
			Fires an event, debounced by \`debounceLevel\`, when the user types text
			into the TextField.  Signature: \`(value, { event, props }) => {}\`
		`,

		onKeyDown: func`
			Fires an event on every keydown Signature: \`({ event, props }) => {}\`
		`,

		onSubmit: func`
			Fires an event when the user hits "enter" from the TextField. You
			shouldn't use it if you're using \`isMultiLine\`.  Signature:
			\`(value, { event, props }) => {}\`
		`,

		value: oneOfType([number, string])`
			Set the value of the input.
		`,

		debounceLevel: number`
			Number of milliseconds to debounce the \`onChangeDebounced\` callback.
			Only useful if you provide an \`onChangeDebounced\` handler.
		`,

		lazyLevel: number`
			Set the holding time, in milliseconds, that the component will wait if
			the user is typing and the component gets a new \`value\` prop.  Any time
			the user hits a key, it starts a timer that prevents state changes from
			flowing in to the component until the timer has elapsed.  This was
			heavily inspired by the
			[lazy-input](https:/docs.npmjs.com/package/lazy-input) component.
		`,
	};

	constructor(props: ITextFieldProps) {
		super(props);

		this._isMounted = false;
		this._handleChangeDebounced = (...args: any[]) => ({
				cancel: _.noop,
				flush: _.noop,
			});
		this._releaseHold = (): void => {};
		this._updateWhenReady = (): void => {};

		this.state = {
			value: props.value,
			isHolding: true,
		};
	}
	static defaultProps = {
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
		...reducers,
	};

	private nativeElement = React.createRef<HTMLElement>();

	_isMounted: boolean;
	_handleChangeDebounced: OnChangeDebounced & _.Cancelable;
	_releaseHold: (...args: any[]) => void;
	_updateWhenReady: (...args: any[]) => void;

	handleChange = (event: React.FormEvent): void => {
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
	};

	handleBlur = (event: React.FocusEvent): void => {
		const { onBlur, onChangeDebounced } = this.props;

		const value = _.get(event, 'target.value', '');

		if (onChangeDebounced !== _.noop) {
			this._handleChangeDebounced.flush();
		}
		onBlur(value, { event, props: this.props });
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
				this._handleChangeDebounced.flush();
			}

			onSubmit(value, { event, props: this.props });
		}
	};

	focus = (): void => {
		/* istanbul ignore next */
		(this.nativeElement.current as HTMLElement).focus();
	};


	componentWillMount(): void {
		// Because we want the debounceLevel to be configurable, we can't put the
		// debounced handler directly on the react class, so we set it up right
		// before mount
		this._isMounted = true;
		this._handleChangeDebounced = _.debounce((...args) => {
			this.props.onChangeDebounced(...args);
		}, this.props.debounceLevel);

		this._releaseHold = _.debounce((): any => {
			if (!this._isMounted) {
				return;
			}
			this.setState({ isHolding: false });
		}, this.props.lazyLevel);

		this._updateWhenReady = _.debounce((newValue): any => {
			if (!this._isMounted) {
				return;
			}
			if (this.state.isHolding) {
				this._updateWhenReady(newValue);
			} else if (newValue !== this.state.value) {
				this.setState({ value: newValue });
			}
		}, this.props.lazyLevel);
	};

	componentWillUnmount(): void {
		this._isMounted = false;
	};

	componentWillReceiveProps(nextProps: ITextFieldProps): void {
		// Allow consumer to optionally control state
		if (_.has(nextProps, 'value')) {
			if (this.state.isHolding) {
				this._updateWhenReady(nextProps.value);
			} else {
				this.setState({ value: nextProps.value });
			}
		}
	};

	render(): React.ReactNode {
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
			...omitProps(
				passThroughs,
				undefined,
				[...Object.keys(TextField.propTypes), 'children']
			),
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
			ref: this.nativeElement,
		};

		return isMultiLine ? (
			<textarea {...finalProps} />
		) : (
			<input type='text' {...finalProps} />
		);
	};
};

export default TextField;
