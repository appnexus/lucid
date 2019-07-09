import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SuccessLightIcon');
const { bool } = PropTypes;

const SuccessLightIcon = createClass({
	displayName: 'SuccessLightIcon',

	statics: {
		peek: {
			description: `
				Nothing like a mild success in the morning to get the blood flowing!
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
		isActive: bool`
			Controls the active state of the Icon. Basically toggles the same "look n
			feel" as when you hover.
		`,
	},

	render() {
		const {
			isActive,
			className,
			isDisabled,
			isClickable,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx(
					'&',
					isDisabled && '&-is-disabled',
					isClickable && '&-is-clickable',
					isActive && '&-is-active',
					className
				)}
			>
				<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
				<path className={cx('&-check')} d='M4.5 8L7 10.5 11.5 6' />
			</Icon>
		);
	},
});

export default SuccessLightIcon;
