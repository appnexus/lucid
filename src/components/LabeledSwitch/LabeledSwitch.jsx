import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';
import Switch from '../Switch/Switch';

const boundClassNames = lucidClassNames.bind('&-LabeledSwitch');
const {
	any,
	node,
	object,
	string
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"], "extend": "Switch", "madeFrom": ["Switch"]}
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
		...Switch.propTypes,

		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Passed through to the root element.
		 */
		style: object,

		/**
		 * Child element whose children are used to identify the purpose of this
		 * switch to the user.
		 */
		Label: any
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
			>
				<Switch
						className={className}
						isDisabled={isDisabled}
						isSelected={isSelected}
						onSelect={onSelect}
						{..._.omit(passThroughs, 'Label')}
				/>
				<ReactCSSTransitionGroup
						className={boundClassNames('&-text')}
						style={{position: 'relative'}}
						transitionName={boundClassNames('&-text')}
						transitionEnterTimeout={100}
						transitionLeaveTimeout={100}
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
