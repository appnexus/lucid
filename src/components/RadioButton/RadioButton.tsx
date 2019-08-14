import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-RadioButton');
const { bool, func, object, string } = PropTypes;

interface IRadioButtonProps {
	/** Appended to the component-specific class names set on the root element. */
	className?: string;

	/** Indicates whether the component should appear and act disabled by having
	 * a "greyed out" palette and ignoring user interactions.
	 *
	 * @default false
	 */
	isDisabled?: boolean;

	/** Indicates that the component is in the "selected" state when true and in
	 * the "unselected" state when false.
	 *
	 * @default false
	 */
	isSelected?: boolean;

	/** Called when the user clicks on the component or when they press the space
	 * key while the component is in focus, and only called when the component
	 * is in the unselected state.  Signature: \`(true, { event, props }) => {}\`
	 */
	onSelect?: (
		selected: boolean,
		{
			event,
			props,
		}: {
			event: React.MouseEvent<HTMLInputElement>;
			props: IRadioButtonProps;
		}
	) => void;

	/** Passed through to the root element. */
	style?: React.CSSProperties;
}

class RadioButton extends React.Component<IRadioButtonProps, {}, {}> {
	constructor(props: IRadioButtonProps) {
		super(props);
	}

	private nativeElement = React.createRef<HTMLInputElement>();

	static displayName = 'RadioButton';

	static peek = {
		description: `
			This is a toggle -- a component that is in one of two particular states
			at any given moment in time -- that features a custom visualization of
			the native radio button control to reflect its current state.

			The radio button is different from a standard toggle in that when it is
			in the selected state user events do not cause it to toggle to the
			unselected state so the \`onSelect\` function is called only when
			\`isSelected\` is false.

			It uses a hidden native radio button control under the hood but
			leverages other HTML elements to visualize its state.

			Any props that are not explicitly defined in \`propTypes\` are spread
			onto the native control.
			`,
		categories: ['controls', 'toggles'],
	};

	static propTypes = {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		isDisabled: bool`
			Indicates whether the component should appear and act disabled by having
			a "greyed out" palette and ignoring user interactions.
		`,

		isSelected: bool`
			Indicates that the component is in the "selected" state when true and in
			the "unselected" state when false.
		`,

		onSelect: func`
			Called when the user clicks on the component or when they press the space
			key while the component is in focus, and only called when the component
			is in the unselected state.  Signature: \`(true, { event, props }) => {}\`
		`,

		style: object`
			Passed through to the root element.
		`,
	};

	static defaultProps = {
		isDisabled: false,
		isSelected: false,
		onSelect: _.noop,
	};

	handleSpanClick = (e: React.MouseEvent<HTMLInputElement>): void => {
		e.preventDefault();
	};

	render(): React.ReactNode {
		const {
			className,
			isDisabled,
			isSelected,
			style,
			...passThroughs
		} = this.props;

		return (
			<span
				className={cx(
					'&',
					{
						'&-is-disabled': isDisabled,
						'&-is-selected': isSelected,
					},
					className
				)}
				onClick={this.handleClicked}
				style={style}
			>
				<input
					onChange={_.noop}
					{...omitProps(passThroughs, undefined, [
						...Object.keys(RadioButton.propTypes),
						'children',
						'callbackId',
					])}
					checked={isSelected}
					className={cx('&-native')}
					disabled={isDisabled}
					ref={this.nativeElement}
					type='radio'
				/>
				<span
					onClick={this.handleSpanClick}
					className={cx('&-visualization-glow')}
				/>
				<span
					onClick={this.handleSpanClick}
					className={cx('&-visualization-container')}
				/>
				<span
					onClick={this.handleSpanClick}
					className={cx('&-visualization-dot')}
				/>
			</span>
		);
	}

	handleClicked = (event: React.MouseEvent<HTMLInputElement>): void => {
		const { isDisabled, isSelected, onSelect } = this.props;
		const { current: element } = this.nativeElement;

		if (!isDisabled && !isSelected) {
			if (onSelect) {
				onSelect(true, { event, props: this.props });
			}
			if (element) {
				element.focus();
			}
		}
	};
}

export default RadioButton;
