import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ReportIcon');

interface IReportIconProps extends IIconProps {}

export const ReportIcon = ({
	className,
	...passThroughs
}: IReportIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(ReportIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(ReportIcon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M11.5 3.25h2.25V15.5H2.25V3.25H4.5' />
			<path d='M9.5 2C9.5 1.172 8.828.5 8 .5S6.5 1.172 6.5 2h-2v2.75h7V2h-2z' />
		</Icon>
	);
};

ReportIcon.displayName = 'ReportIcon';
ReportIcon.peek = {
	description: `
		An icon that indicates a report.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ReportIcon.propTypes = iconPropTypes;
ReportIcon.defaultProps = Icon.defaultProps;

export default ReportIcon;
