import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ClockIcon');

const ClockIcon = createClass({
	displayName: 'ClockIcon',

	statics: {
		peek: {
			description: `
				Typically used for time-sensitive stuff.
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
				<circle strokeLinecap='square' cx='8' cy='8' r='7.5' />
				<path strokeLinecap='square' class='st0' d='M8 3.5v5l2.75 2.25' />
			</Icon>
		);
	},
});

export default ClockIcon;
