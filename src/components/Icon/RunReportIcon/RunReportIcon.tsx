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
			<path d='M7 10.75h8' />
			<path d='M13.5 12.75l2-2-2-2M13.5 15.5h-11v-13h3M10.5 2.5h3V6' />
			<path d='M9 1.5a1 1 0 00-2 0H5.5V4h5V1.5H9z' />
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
