import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';
import Switch from '../Switch/Switch';

const boundClassNames = lucidClassNames.bind('&-LabeledSwitch');
const {
	bool,
	func,
	node,
	object,
	string
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"], "extend": "Switch"}
 *
 * This is a composite of the `Switch` component and the native `label`
 * element.
 */
const LabeledSwitch = React.createClass(createLucidComponentDefinition({
	displayName: 'LabeledSwitch',

	childProps: {
		Label: {
			/**
			 * Used to identify the purpose of this switch to the user -- can be
			 * any renderable content.
			 */
			children: node
		}
	},

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
		 * Signature: (isSelected, { event, props }) => {}
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

	render() {
		const {
			className,
			isDisabled,
			isSelected,
			onSelect,
			style,
			...passThroughs
		} = this.props;

		const labelChildProps = _.first(LabeledSwitch.Label.findInAllAsProps(this.props));
		const labelKey = isSelected ? 'selectedLabel' : 'unselectedLabel';

		return (
			<label
					className={boundClassNames('&', {
						'&-is-disabled': isDisabled,
						'&-is-selected': isSelected
					}, className)}
					style={style}
					{...labelChildProps}
			>
				<Switch
						className={className}
						isDisabled={isDisabled}
						isSelected={isSelected}
						onSelect={onSelect}
						{..._.omit(passThroughs, 'Label')}
				/>
				<ReactCSSTransitionGroup
						transitionName={boundClassNames('&-text')}
						transitionEnterTimeout={100}
						transitionLeaveTimeout={100}
						style={{position: 'relative'}}
						className={boundClassNames('&-text')}
				>
					{
						labelChildProps
								? <span key={labelKey}>{labelChildProps.children || labelChildProps}</span>
								: null
					}
				</ReactCSSTransitionGroup>
			</label>
		);
	}
}));

export default LabeledSwitch;
