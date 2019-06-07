import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

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
		const { className, ...passThroughs } = this.props;

		return (
			<Icon {...passThroughs} className={cx('&', className)}>
				<circle cx='8' cy='8' r='7.5' />
				<path d='M4.5 8h7' />
			</Icon>
		);
	},
});

export default MinusCircleLightIcon;
