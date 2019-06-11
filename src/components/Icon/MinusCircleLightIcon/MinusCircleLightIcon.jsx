import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinusCircleLightIcon');

const MinusCircleLightIcon = createClass({
	displayName: 'MinusCircleLightIcon',

	statics: {
		peek: {
			description: `
				Minus circle light icon
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
				{...omitProps(passThroughs, MinusCircleLightIcon, [], false)}
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
				<path className={cx('&-dash')} d='M4.5 8h7' />
			</Icon>
		);
	},
});

export default MinusCircleLightIcon;
