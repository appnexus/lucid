import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes }  from '../../util/component-types';
import RadioButton from '../RadioButton/RadioButton';

const cx = lucidClassNames.bind('&-RadioButtonLabeled');
const {
	any,
	node,
	object,
	string,
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"], "extend": "RadioButton", "madeFrom": ["RadioButton"]}
 *
 * This is a composite of the `RadioButton` component and the native `label`
 * element.
 */
const RadioButtonLabeled = createClass({
	displayName: 'RadioButtonLabeled',

	components: {
		Label: createClass({
			displayName: 'RadioButtonLabeled.Label',
			propName: 'Label',
			propTypes: {
				/**
				 * Used to identify the purpose of this radio button to the user --
				 * can be any renderable content.
				 */
				children: node,
			},
		}),
	},

	propTypes: {
		...RadioButton.propTypes,

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
		 * radio button to the user.
		 */
		Label: any,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop,
		};
	},

	render() {
		const {
			className,
			isDisabled,
			isSelected,
			onSelect,
			style,
			...passThroughs,
		} = this.props;

		const labelChildProps = _.first(_.map(findTypes(this.props, RadioButtonLabeled.Label), 'props'));

		return (
			<label
					className={cx('&', {
						'&-is-disabled': isDisabled,
						'&-is-selected': isSelected,
					}, className)}
					style={style}
			>
				<RadioButton
						className={className}
						isDisabled={isDisabled}
						isSelected={isSelected}
						onSelect={onSelect}
						{..._.omit(passThroughs, 'Label')}
				/>
				{
					labelChildProps
							? labelChildProps.children
							: null
				}
			</label>
		);
	},
});

export default RadioButtonLabeled;
