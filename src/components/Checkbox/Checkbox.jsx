import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Checkbox');

const {
	bool,
	func,
	object,
	string,
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"]}
 *
 * This is a checkbox. It's a component that is in one of two particular states
 * at any given moment. It features a custom visualization of the native
 * checkbox button control to reflect its current state.
 *
 * It uses a hidden native checkbox control under the hood but leverages other
 * HTML elements to visualize its state.
 */
const Checkbox = createClass({
	displayName: 'Checkbox',
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
		 * space key while the component is in focus.
		 *
		 * Signature: `(isSelected, { event, props }) => {}`
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
			onSelect: _.noop,
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
			...passThroughs,
		} = this.props;

		return (
			<div
				className={cx('&', {
					'&-is-disabled': isDisabled,
					'&-is-selected': isSelected,
				}, className)}
				onClick={this.handleClicked}
				onTouchEnd={this.handleClicked}
				style={style}
			>
				<input
					onChange={_.noop}
					{..._.omit(passThroughs, 'children')}
					checked={isSelected}
					className={cx('&-native')}
					disabled={isDisabled}
					ref='nativeElement'
					type='checkbox'
				/>
				<span className={cx('&-visualization-glow')} />
				<span className={cx('&-visualization-container')} />
				<span className={cx('&-visualization-checkmark')}>
					<span className={cx('&-visualization-checkmark-stem')}></span>
					<span className={cx('&-visualization-checkmark-kick')}></span>
				</span>
			</div>
		);
	},

	handleClicked(event) {
		const {
			isDisabled,
			isSelected,
			onSelect,
		} = this.props;

		event.stopPropagation();

		if (!isDisabled) {
			onSelect(!isSelected, { event, props: this.props });
			this.nativeElement.focus();
		}
	},
});

export default Checkbox;
