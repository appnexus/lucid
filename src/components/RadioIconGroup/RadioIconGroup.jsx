// Required for all new components
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

import IconBox from '../IconBox/IconBox';

const cx = lucidClassNames.bind('&-RadioIconGroup');

const { string, any, element, shape, arrayOf } = PropTypes;

/**
 * {"categories": ["controls", "IconGroup"]}
  *
 * A basic RadioIconGroup. Any props that are not explicitly called out below will be
 * passed through to the native `RadioIconGroup` component.
 */
const RadioIconGroup = createClass({
	displayName: 'RadioIconGroup',
	propName: 'RadioIconGroup',
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
			})
		),
	},

	getDefaultProps() {
		return {
			selections: [],
			isDisabled: false,
		};
	},

	render() {
		const { className, selections, isDisabled, ...passThroughs } = this.props;

		return (
			<ul
				{...omitProps(passThroughs, RadioIconGroup)}
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
							key={`RadioIconGroup${key}`}
							IconComponent={item.icon}
							Label={item.label}
							isRadio={true}
							isDisabled={item.isDisabled || isDisabled}
						/>
					</li>
				))}
			</ul>
		);
	},
});

export default RadioIconGroup;
