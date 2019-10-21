import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LinkedIcon');

interface ILinkedIconProps extends IIconProps {}

export const LinkedIcon: FC<ILinkedIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(LinkedIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M5 11l6-6' />
			<path d='M8.968 7.032a3.009 3.009 0 0 1 0-4.243l1.414-1.414a3.009 3.009 0 0 1 4.243 0 3.009 3.009 0 0 1 0 4.243l-1.414 1.414a3.009 3.009 0 0 1-4.243 0zm-7.593 7.593a3.009 3.009 0 0 1 0-4.243l1.414-1.414a3.009 3.009 0 0 1 4.243 0 3.009 3.009 0 0 1 0 4.243l-1.414 1.414a3.009 3.009 0 0 1-4.243 0z' />
		</Icon>
	);
};

LinkedIcon.displayName = 'LinkedIcon';
LinkedIcon.peek = {
	description: `
		Get linked in with this fresh new icon!
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
LinkedIcon.propTypes = iconPropTypes;

export default LinkedIcon;
