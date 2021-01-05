import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-TicketIcon');

interface ITicketIconProps extends IIconProps {}

export const TicketIcon = ({
	className,
	...passThroughs
}: ITicketIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(TicketIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(TicketIcon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M13.5 8c0-1.105.895-2 2-2V2.5H.5V6c1.105 0 2 .895 2 2s-.895 2-2 2v3.5h15V10c-1.105 0-2-.895-2-2zM8 2.5v1M8 13.5v-1M8 6.7v-.6M8 9.883v-.6' />
		</Icon>
	);
};

TicketIcon.displayName = 'TicketIcon';
TicketIcon.peek = {
	description: `
		A ticket icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
TicketIcon.propTypes = iconPropTypes;
TicketIcon.defaultProps = Icon.defaultProps;

export default TicketIcon;
