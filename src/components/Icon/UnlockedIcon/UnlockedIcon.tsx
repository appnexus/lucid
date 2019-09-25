import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UnlockedIcon');

interface IUnlockedIconProps extends IIconProps {}

const UnlockedIcon: FC<IUnlockedIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(UnlockedIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M1.5 6.5h13v9h-13zm2 0V5a4.5 4.5 0 0 1 8.741-1.508M7.99 13.293v-3' />
			<circle cx='8' cy='10' r='.5' />
		</Icon>
	);
};

UnlockedIcon.displayName = 'UnlockedIcon';
UnlockedIcon.peek = {
	description: `
		Unlock it.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
UnlockedIcon.propTypes = iconPropTypes;

export default UnlockedIcon;
