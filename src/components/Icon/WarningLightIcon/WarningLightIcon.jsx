import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WarningLightIcon');

const WarningLightIcon = createClass({
	displayName: 'WarningLightIcon',

	statics: {
		peek: {
			description: `
				Diet version.
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
				<path className={cx('&-background')} d='M.5 15h15L8 .5z' />
				<path className={cx('&-mark')} d='M7.99 6v4' />
				<circle className={cx('&-mark')} cx='7.99' cy='12' r='.293' />
			</Icon>
		);
	},
});

export default WarningLightIcon;
