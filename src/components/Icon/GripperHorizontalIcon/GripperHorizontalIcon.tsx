import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperHorizontalIcon');

export interface IGripperHorizontalIconProps extends IIconProps {}

export const GripperHorizontalIcon = ({
	className,
	...passThroughs
}: IGripperHorizontalIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(GripperHorizontalIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			width={16}
			height={2}
			viewBox='0 0 16 2'
			className={cx('&', className)}
		>
			<path d='M.5 0v2M4 0v2M8 0v2M12 0v2M15.5 0v2' />
		</Icon>
	);
};

GripperHorizontalIcon._isPrivate = true;
GripperHorizontalIcon.defaultProps = Icon.defaultProps;
GripperHorizontalIcon.displayName = 'GripperHorizontalIcon';
GripperHorizontalIcon.peek = {
	description: `
		A horizontal gripper icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
GripperHorizontalIcon.propTypes = iconPropTypes;
GripperHorizontalIcon.defaultProps = Icon.defaultProps;

export default GripperHorizontalIcon;
