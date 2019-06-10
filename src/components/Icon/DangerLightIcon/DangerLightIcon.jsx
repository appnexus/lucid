import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerLightIcon');

const DangerLightIcon = createClass({
	displayName: 'DangerLightIcon',

	statics: {
		peek: {
			description: `
				DANGER WILL ROBINSON DANGER
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
					className,
					isDisabled && '&-is-disabled',
					isClickable && '&-is-clickable'
				)}
			>
				<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
				<path className={cx('&-x')} d='M5.5 5.5l5 5m0-5l-5 5' />
			</Icon>
		);
	},
});

export default DangerLightIcon;
