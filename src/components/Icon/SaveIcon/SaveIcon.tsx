import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SaveIcon');

interface ISaveIconProps extends IIconProps {}

export const SaveIcon: FC<ISaveIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(SaveIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M15.5 15.5H.5V.5h12l3 3z' />
			<circle cx='8' cy='10' r='2.25' />
			<path d='M12 .5v4H4v-4' />
		</Icon>
	);
};

SaveIcon.displayName = 'SaveIcon';
SaveIcon.peek = {
	description: `
		A save icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SaveIcon.propTypes = iconPropTypes;

export default SaveIcon;
