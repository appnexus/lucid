import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Checkbox');

const { bool, func, object, string } = PropTypes;

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
		 * Indicates whether the component should appear in an "indeterminate"
		 * or "partially checked" state. This prop takes precedence over
		 * `isSelected`.
		 */
		isIndeterminate: bool,

		/**
		 * Indicates whether the component should appear and act disabled by
		 * having a "greyed out" palette and ignoring user interactions.
		 */
		isDisabled: bool,

		/**
		 * Indicates that the component is in the "selected" state when true
		 * and in the "unselected" state when false. This props is ignored if
		 * `isIndeterminate` is `true`.
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
			isIndeterminate: false,
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop,
		};
	},

	componentDidMount() {
		this.nativeElement = this.refs.nativeElement;
	},

	handleSpanClick(e) {
		e.preventDefault();
	},

	render() {
		const {
			className,
			isIndeterminate,
			isSelected,
			isDisabled,
			style,
			...passThroughs
		} = this.props;

		return (
			<div
				className={cx(
					'&',
					{
						'&-is-disabled': isDisabled,
						'&-is-selected': isIndeterminate || isSelected,
					},
					className
				)}
				onClick={this.handleClicked}
				style={style}
			>
				<input
					onChange={_.noop}
					{...omitProps(passThroughs, Checkbox, ['children'])}
					checked={isSelected}
					className={cx('&-native')}
					disabled={isDisabled}
					ref="nativeElement"
					type="checkbox"
				/>
				<span
					onClick={this.handleSpanClick}
					className={cx('&-visualization-glow')}
				/>
				<span
					onClick={this.handleSpanClick}
					className={cx('&-visualization-container')}
				/>
				{isIndeterminate
					? <span
							onClick={this.handleSpanClick}
							className={cx('&-visualization-indeterminate')}
						>
							<span className={cx('&-visualization-indeterminate-line')} />
						</span>
					: <span
							onClick={this.handleSpanClick}
							className={cx('&-visualization-checkmark')}
						>
							<span className={cx('&-visualization-checkmark-stem')} />
							<span className={cx('&-visualization-checkmark-kick')} />
						</span>}
			</div>
		);
	},

	handleClicked(event) {
		const { isDisabled, isSelected, onSelect } = this.props;

		if (!isDisabled) {
			onSelect(!isSelected, { event, props: this.props });
			this.nativeElement.focus();
		}
	},
});

export default Checkbox;
