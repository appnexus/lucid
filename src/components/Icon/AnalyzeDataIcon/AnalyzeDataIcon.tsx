import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AnalyzeDataIcon');

interface IAnalyzeDataIconProps extends IIconProps {}

export const AnalyzeDataIcon = ({
	className,
	...passThroughs
}: IAnalyzeDataIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(AnalyzeDataIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
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
AnalyzeDataIcon.propTypes = iconPropTypes;
AnalyzeDataIcon.defaultProps = Icon.defaultProps;

export default AnalyzeDataIcon;
