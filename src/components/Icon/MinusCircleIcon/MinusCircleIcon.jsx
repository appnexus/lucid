import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MinusCircleIcon');

const MinusCircleIcon = createClass({
	displayName: 'MinusCircleIcon',

	statics: {
		peek: {
			description: `
				Minus circle icon
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
				<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
				<path className={cx('&-dash')} d='M4.5 8h7' />
			</Icon>
		);
	},
});

export default MinusCircleIcon;
