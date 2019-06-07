import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-QuestionMarkIcon');

const QuestionMarkIcon = createClass({
	displayName: 'QuestionMarkIcon',

	statics: {
		peek: {
			description: `
				Question mark circle icon
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
				<path d='M3.752 5C3.752 2.515 5.514.5 8 .5s4.28 1.936 4.28 4.421c0 1.187-.679 2.257-2.148 3.214C8.759 9.032 8 9.604 8 10.755v1.652' />
				<circle cx='8' cy='15' r='.5' />
			</Icon>
		);
	},
});

export default QuestionMarkIcon;
