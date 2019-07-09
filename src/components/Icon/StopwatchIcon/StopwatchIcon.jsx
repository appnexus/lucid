import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StopwatchIcon');

const StopwatchIcon = createClass({
	displayName: 'StopwatchIcon',

	statics: {
		peek: {
			description: `
				A Stopwatch Icon.
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
				{...omitProps(passThroughs, StopwatchIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M7.5.5h3M9 .5v1.98M.5 6h5m-5 3h3m-3 3h4' />
				<path d='M5.5 14.471A6.455 6.455 0 0 0 9 15.5a6.5 6.5 0 1 0 0-13c-1.29 0-2.489.38-3.5 1.029' />
				<path d='M9 9l2.5-2.5' />
			</Icon>
		);
	},
});

export default StopwatchIcon;
