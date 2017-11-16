// Required for all new components
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

import IconBox from '../IconBox/IconBox';

const cx = lucidClassNames.bind('&-CheckboxIconGroup');

const { string, func, bool, number, any, element, shape, arrayOf } = PropTypes;

/**
 * {"categories": ["controls", "IconGroup"]}
  *
 * A basic CheckboxIconGroup. Any props that are not explicitly called out below will be
 * passed through to the native `CheckboxIconGroup` component.
 */
const CheckboxIconGroup = createClass({
	displayName: 'CheckboxIconGroup',
	propName: 'CheckboxIconGroup',
	propTypes: {
		/**
		 * Class names that are appended to the defaults
		 */
		className: string,

		/**
		 * An array of {name: name, icon: icon} objects describing the available
		 * selections in the Checkbox Icon Group
		 */
		selections: arrayOf(
			shape({
				label: any,
				icon: any,
				id: number,
				onClick: func,
				isSelected: bool,
				isActive: bool,
				isIndeterminate: bool,
				isDisabled: bool,
				tabIndex: number,
			})
		),

		isDisabled: bool,

		/**
		 * A unique string representing the group of checkbox inputs.
		 */
		name: string,

		/**
		 * Signature: `(id) => {}`
		 */
		onClick: func,

		/**
		 * Allows you to override the defalt global tabbing order of the base html checkbox element
		 * To learn more about tabIndex check out (MDN's web docs on tabIndex)[https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex]
		 */
		tabIndex: number,
	},

	getDefaultProps() {
		return {
			selections: [],
			isDisabled: false,
		};
	},

	render() {
		const {
			className,
			selections,
			isDisabled,
			name,
			onClick,
			tabIndex,
			...passThroughs
		} = this.props;

		return (
			<ul
				{...omitProps(passThroughs, CheckboxIconGroup)}
				className={cx(
					'&',
					{
						'&-is-disabled': isDisabled,
					},
					className
				)}
			>
				{_.map(selections, (item, key) => (
					<li className={cx('&-Item')}>
						<IconBox
							name={name}
							onClick={item.onClick || onClick}
							isActive={item.isActive}
							isIndeterminate={item.isIndeterminate}
							isSelected={item.isSelected}
							tabIndex={item.tabIndex || tabIndex}
							key={`checkboxicongroup${key}`}
							IconComponent={item.icon}
							Label={item.label}
							isCheckbox={true}
							isDisabled={item.isDisabled || isDisabled}
							id={item.id}
						/>
					</li>
				))}
			</ul>
		);
	},
});

export default CheckboxIconGroup;
