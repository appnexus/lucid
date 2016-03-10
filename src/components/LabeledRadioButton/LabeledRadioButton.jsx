import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';

import { bindClassNames } from '../../util/style-helpers';

import RadioButton from '../RadioButton/RadioButton';

const boundClassNames = bindClassNames('LabeledRadioButton');
const {
	bool,
	func,
	node,
	object,
	string,
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"]}
 *
 * This is a composite of the `RadioButton` component and the native `label`
 * element.
 */
const LabeledRadioButton = React.createClass({
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
		 * Used to identify the purpose of this radio button to the user -- can
		 * be any renderable content.
		 */
		label: node,

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
		style: object
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
			label,
			onSelect,
			style,
			...passThroughs
		} = this.props;

		return (
			<label
					className={classNames(boundClassNames('~', {
						'is-disabled': isDisabled,
						'is-selected': isSelected
					}), className)}
					style={style}
			>
				<RadioButton
						className={className}
						isDisabled={isDisabled}
						isSelected={isSelected}
						onSelect={onSelect}
						{...passThroughs}
				/>
				{label}
			</label>
		);
	}
});

export default LabeledRadioButton;
