import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass }  from '../../util/component-definition';
import Switch from '../Switch/Switch';

const boundClassNames = lucidClassNames.bind('&-SwitchLabeled');
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
const SwitchLabeled = createClass({
	displayName: 'SwitchLabeled',

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

	componentWillMount() {
		this._labelKey = 0;
	},

	componentWillReceiveProps(nextProps) {
		const currentLabel = _.first(SwitchLabeled.Label.findInAllAsProps(this.props)).children;
		const nextLabel = _.first(SwitchLabeled.Label.findInAllAsProps(nextProps)).children;

		if (currentLabel !== nextLabel) {
			this._labelKey++;
		}
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

		const labelChildProps = _.first(SwitchLabeled.Label.findInAllAsProps(this.props));

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
						transitionName={boundClassNames('&-text')}
						transitionEnterTimeout={100}
						transitionLeaveTimeout={100}
						style={{position: 'relative'}}
						className={boundClassNames('&-text')}
				>
					{
						labelChildProps
								? <span key={this._labelKey}>{labelChildProps.children || labelChildProps}</span>
								: null
					}
				</ReactCSSTransitionGroup>
			</label>
		);
	}
});

export default SwitchLabeled;
