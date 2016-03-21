import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';
import Checkbox from '../Checkbox/Checkbox';

const boundClassNames = lucidClassNames.bind('&-LabeledCheckbox');
const {
	any,
	node,
	object,
	string
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"], "extend": "Checkbox", "madeFrom": ["Checkbox"]}
 *
 * This is a composite of the `Checkbox` component and the native `label`
 * element.
 */
const LabeledCheckbox = React.createClass(createLucidComponentDefinition({
	displayName: 'LabeledCheckbox',

	childProps: {
		Label: {
			/**
			 * Used to identify the purpose of this checkbox to the user -- can
			 * be any renderable content.
			 */
			children: node
		}
	},

	propTypes: {
		...Checkbox.propTypes,

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
		 * checkbox to the user.
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

		const labelChildProps = _.first(LabeledCheckbox.Label.findInAllAsProps(this.props));

		return (
			<label
					className={boundClassNames('&', {
						'&-is-disabled': isDisabled,
						'&-is-selected': isSelected
					}, className)}
					style={style}
			>
				<Checkbox
						className={className}
						isDisabled={isDisabled}
						isSelected={isSelected}
						onSelect={onSelect}
						{..._.omit(passThroughs, 'Label')}
				/>
				{
					labelChildProps
							? labelChildProps.children || labelChildProps
							: null
				}
			</label>
		);
	}
}));

export default LabeledCheckbox;
