import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-RadioButton');
const {
	bool,
	func,
	object,
	string,
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"]}
 *
 * This is a toggle -- a component that is in one of two particular states at
 * any given moment in time -- that features a custom visualization of the
 * native radio button control to reflect its current state.
 *
 * The radio button is different from a standard toggle in that when it is in
 * the selected state user events do not cause it to toggle to the unselected
 * state so the `onSelect` function is called only when `isSelected` is false.
 *
 * It uses a hidden native radio button control under the hood but leverages
 * other HTML elements to visualize its state.
 *
 * Any props that are not explicitly defined in `propTypes` are spread onto the
 * native control.
 */
const RadioButton = React.createClass({
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Indicates whether the component should appear and act disabled by
		 * having a "greyed out" palette and ignoring user interactions.
		 */
		isDisabled: bool,

		/**
		 * Indicates that the component is in the "selected" state when true
		 * and in the "unselected" state when false.
		 */
		isSelected: bool,

		/**
		 * Called when the user clicks on the component or when they press the
		 * space key while the component is in focus, and only called when the
		 * component is in the unselected state.
		 *
		 * Signature: `(true, { event, props }) => {}`
		 */
		onSelect: func,

		/**
		 * Passed through to the root element.
		 */
		style: object,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop
		};
	},

	componentDidMount() {
		this.nativeElement = this.refs.nativeElement;
	},

	render() {
		const {
			className,
			isDisabled,
			isSelected,
			style,
			...passThroughs
		} = this.props;

		return (
			<span
					className={boundClassNames('&', {
						'&-is-disabled': isDisabled,
						'&-is-selected': isSelected
					}, className)}
					onClick={this.handleClicked}
					onTouchEnd={this.handleClicked}
					style={style}
			>
				<input
						onChange={_.noop}
						{...passThroughs}
						checked={isSelected}
						className={boundClassNames('&-native')}
						disabled={isDisabled}
						ref='nativeElement'
						type='radio'
				/>
				<span className={boundClassNames('&-visualization-glow')} />
				<span className={boundClassNames('&-visualization-container')} />
				<span className={boundClassNames('&-visualization-dot')} />
			</span>
		);
	},

	handleClicked(event) {
		const {
			isDisabled,
			isSelected,
			onSelect,
		} = this.props;

		if (!isDisabled && !isSelected) {
			onSelect(true, { event, props: this.props });
			this.nativeElement.focus();
		}
	}
});

export default RadioButton;
