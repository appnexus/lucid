import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SwitchIcon');

interface ISwitchIconProps extends IIconProps {}

export const SwitchIcon: FC<ISwitchIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(SwitchIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M7 5.5h8m-1.5 2l2-2-2-2m-4.5 7H1m1.5 2l-2-2 2-2' />
		</Icon>
	);
};

SwitchIcon.displayName = 'SwitchIcon';
SwitchIcon.peek = {
	description: `
		A swap icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SwitchIcon.propTypes = iconPropTypes;

export default SwitchIcon;
