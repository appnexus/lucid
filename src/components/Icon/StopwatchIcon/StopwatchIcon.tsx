import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StopwatchIcon');

interface IStopwatchIconProps extends IIconProps {}

export const StopwatchIcon: FC<IStopwatchIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(StopwatchIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M7.5.5h3M9 .5v1.98M.5 6h5m-5 3h3m-3 3h4' />
			<path d='M5.5 14.471A6.455 6.455 0 0 0 9 15.5a6.5 6.5 0 1 0 0-13c-1.29 0-2.489.38-3.5 1.029' />
			<path d='M9 9l2.5-2.5' />
		</Icon>
	);
};

StopwatchIcon.displayName = 'StopwatchIcon';
StopwatchIcon.peek = {
	description: `
		A Stopwatch Icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
StopwatchIcon.propTypes = iconPropTypes;

export default StopwatchIcon;
