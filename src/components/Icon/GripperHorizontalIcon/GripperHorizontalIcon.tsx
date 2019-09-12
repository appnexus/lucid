import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperHorizontalIcon');

interface IGripperHorizontalIconProps extends IIconProps {}

const GripperHorizontalIcon: FC<IGripperHorizontalIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(GripperHorizontalIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			width={16}
			height={2}
			viewBox='0 0 16 2'
			className={cx('&', className)}
		>
			<path d='M.5 0v2M4 0v2M8 0v2M12 0v2M15.5 0v2' />
		</Icon>
	);
};

GripperHorizontalIcon._isPrivate = true,
GripperHorizontalIcon.displayName = 'GripperHorizontalIcon',
GripperHorizontalIcon.peek = {
	description: `
		A horizontal gripper icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
GripperHorizontalIcon.propTypes = {
	...Icon.propTypes,
};

export default GripperHorizontalIcon;
