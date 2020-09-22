import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-HostedIcon');

interface IHostedIconProps extends IIconProps {}

export const HostedIcon = ({
	className,
	...passThroughs
}: IHostedIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(HostedIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5.5h15v5H.5zM8 10.5V15M12 3h1M8.5 3h1' />
			<circle cx='3' cy='3' r='.25' />
			<path d='M.5 5.5h15v5H.5zM6.125 14.5h3.75v1h-3.75zM15.5 15H.5M12 8h1M8.5 8h1' />
			<circle cx='3' cy='8' r='.25' />
		</Icon>
	);
};

HostedIcon.displayName = 'HostedIcon';
HostedIcon.peek = {
	description: `
		A hosted icon, used for indicating a computer or other device providing data or services that a remote computer can access.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
HostedIcon.propTypes = iconPropTypes;
HostedIcon.defaultProps = Icon.defaultProps;

export default HostedIcon;
