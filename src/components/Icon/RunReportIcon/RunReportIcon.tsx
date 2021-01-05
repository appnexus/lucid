import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-RunReportIcon');

interface IRunReportIconProps extends IIconProps {}

export const RunReportIcon = ({
	className,
	...passThroughs
}: IRunReportIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(RunReportIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path
				fill='none'
				strokeWidth='1.3'
				strokeMiterlimit='10'
				d='M7 10.75h8'
			/>
			<path d='M13.5 12.75l2-2-2-2M13.75 15.5H2.25V3.25H4.5M11.5 3.25h2.25V6' />
			<path d='M9.5 2C9.5 1.172 8.828.5 8 .5S6.5 1.172 6.5 2h-2v2.75h7V2h-2z' />
		</Icon>
	);
};

RunReportIcon.displayName = 'RunReportIcon';
RunReportIcon.peek = {
	description: `
		Run a report.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
RunReportIcon.propTypes = iconPropTypes;
RunReportIcon.defaultProps = Icon.defaultProps;

export default RunReportIcon;
