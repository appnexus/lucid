import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BarChartIcon');

interface IBarChartIconProps extends IIconProps {}

export const BarChartIcon = ({
	className,
	...passThroughs
}: IBarChartIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(BarChartIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(BarChartIcon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 7.5h3v8h-3zM6.5.5h3v15h-3zM12.5 4.5h3v11h-3z' />
		</Icon>
	);
};

BarChartIcon.displayName = 'BarChartIcon';
BarChartIcon.peek = {
	description: `
		A bar chart.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
BarChartIcon.propTypes = iconPropTypes;
BarChartIcon.defaultProps = Icon.defaultProps;

export default BarChartIcon;
