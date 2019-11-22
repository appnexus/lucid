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
			<circle cx='8' cy='10' r='2.25' />
			<path
				fill='none'
				stroke='#000'
				stroke-width='1.3'
				stroke-miterlimit='10'
				d='M12 .5v4H4v-4'
			/>
		</Icon>
	);
};

SaveIcon.displayName = 'SearchIcon';
SaveIcon.peek = {
	description: `
		A search icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SaveIcon.propTypes = iconPropTypes;

export default SaveIcon;
