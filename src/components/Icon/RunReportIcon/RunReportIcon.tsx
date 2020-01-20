import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ShoppingCartIcon');

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
			<path d='M13.5 14a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM7 13.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z' />
			<path d='M14.5 11.5h-9l-2-7h12z' />
			<path d='M3.5 4.5l-1-2h-2' />
		</Icon>
	);
};

RunReportIcon.displayName = 'RunReportIcon';
RunReportIcon.peek = {
	description: `
		Buy buy buy!
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
RunReportIcon.propTypes = iconPropTypes;
RunReportIcon.defaultProps = Icon.defaultProps;

export default RunReportIcon;
