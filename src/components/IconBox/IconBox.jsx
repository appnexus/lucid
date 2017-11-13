// Required for all new components
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';
const cx = lucidClassNames.bind('&-IconBox');
const {
	any,
	bool,
	func,
	node,
	string,
	object,
	element,
	oneOfType,
	number,
} = PropTypes;

/**
 * {"categories": ["controls", "IconGroup"]}
  *
 * A basic IconBox. Any props that are not explicitly called out below will be
 * passed through to the native `IconBox` component.
 */
const IconBox = createClass({
	displayName: 'IconBox',
	propName: 'IconBox',
	propTypes: {
		/**
		 * Class names that are appended to the defaults
		 */
		className: string,

		/**
		 * The image used for the Icon. Expects any SVG React element.
		 */
		IconComponent: any.isRequired,

		/**
		 * Activates the IconBox by giving it a "pressed down" look
		 */
		isActive: bool,

		/**
		 * Builds the IconBox as a checkbox button (overrides isRadio)
		 */
		isCheckbox: bool,

		/**
		 * Disables the IconBox by greying it out
		 */
		isDisabled: bool,

		/**
		 * Sets the indeterminant state when isCheckbox is also true
		 */
		isIndeterminate: bool,

		/**
		 * Builds the IconBox as a radio button. Requires the `name` prop.
		 * The actual radio input circle will be hidden.
		 */
		isRadio: bool,

		/**
		 * sets the components selection state. This is passed through to the radio or checkbox components.
		 */
		isSelected: bool,

		/**
		 * The for the components label. Uses any string or valid React component
		 */
		Label: oneOfType([string, element]).isRequired,

		/**
		 * assigns the checkbox or radio input with the name property, used for radiogroups
		 */
		name: string,

		/**
		 * Called when the user clicks the `IconBox`.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onClick: func,

		/**
		 * assigns the checkbox or radio input a tabIndex
		 */
		tabIndex: number,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isActive: false,
			onClick: _.noop,
			isRadio: false,
			isCheckbox: false,
		};
	},

	createCheckbox() {
		const {
			className,
			isDisabled,
			isIndeterminate,
			isSelected,
			Label,
			name,
			onClick,
			tabIndex,
		} = this.props;

		return (
			<CheckboxLabeled
				Label={Label}
				className={cx('&-checkbox', {
					[`${className}-checkbox`]: className,
				})}
				isDisabled={isDisabled}
				isIndeterminate={isIndeterminate}
				isSelected={isSelected}
				onSelect={onClick}
				name={name}
				tabIndex={tabIndex}
			/>
		);
	},

	createRadio() {
		const {
			className,
			isDisabled,
			isIndeterminate,
			isSelected,
			Label,
			name,
			onClick,
			tabIndex,
		} = this.props;

		return (
			<RadioButtonLabeled
				Label={Label}
				className={cx('&-radio', {
					[`${className}-radio`]: className,
				})}
				isDisabled={isDisabled}
				isSelected={isSelected}
				onSelect={onClick}
				name={name}
				tabIndex={tabIndex}
			/>
		);
	},

	render() {
		const {
			className,
			IconComponent,
			isActive,
			isCheckbox,
			isDisabled,
			isIndeterminate,
			isRadio,
			isSelected,
			Label,
			name,
			onClick,
			tabIndex,
			...passThroughs
		} = this.props;

		const InputComponent = isCheckbox
			? this.createCheckbox
			: isRadio ? this.createRadio : null;

		return (
			<figure
				{...omitProps(passThroughs, IconBox, ['callbackId'])}
				className={cx(
					'&',
					{
						'&-is-selected': isSelected,
						'&-is-disabled': isDisabled,
						'&-is-active': isActive,
						'&-has-checkbox': isCheckbox,
						'&-has-radio': isRadio,
					},
					className
				)}
				onClick={onClick}
				disabled={isDisabled}
			>
				<IconComponent />
				{!_.isEmpty(InputComponent) || !_.isEmpty(Label)
					? <figcaption
							className={cx('&-figcaption', {
								[`${className}-figcaption`]: className,
							})}
						>
							{InputComponent
								? <InputComponent />
								: _.isString(Label) ? Label : <Label />}
						</figcaption>
					: null}
			</figure>
		);
	},
});

export default IconBox;
