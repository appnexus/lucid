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
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path class='st0' d='M4.5 8L7 10.5 11.5 6' />
				<circle class='st0' cx='8' cy='8' r='7.5' />
			</Icon>
		);
	},
});

export default SuccessLightIcon;
