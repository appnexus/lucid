import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AnalyzeDataIcon');

interface IAnalyzeDataIconProps extends IIconProps {}

const AnalyzeDataIcon: FC<IAnalyzeDataIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...passThroughs}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M0 15.5h16' />
			<path d='M2.5 10.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3-6a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
			<circle cx='13.5' cy='2.5' r='2' />
			<path d='M1.5 10.5l4-5 4 4 3.065-5.364' />
		</Icon>
	);
};

AnalyzeDataIcon.displayName = 'AnalyzeDataIcon';
AnalyzeDataIcon.peek = {
	description: `
		Typically used to show the user that further data analysis is
		available.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
AnalyzeDataIcon.propTypes = {
	...Icon.propTypes,
};

export default AnalyzeDataIcon;
