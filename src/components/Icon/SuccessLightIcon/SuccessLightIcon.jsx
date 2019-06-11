import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SuccessLightIcon');

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
	},

	render() {
		const { className, isDisabled, isClickable, ...passThroughs } = this.props;

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
