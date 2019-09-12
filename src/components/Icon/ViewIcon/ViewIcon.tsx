import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ViewIcon');

interface IViewIconProps extends IIconProps {}

const ViewIcon: FC<IViewIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(ViewIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M15.5 8s-3-4.5-7.5-4.5S.5 8 .5 8 4 12.5 8 12.5 15.5 8 15.5 8z' />
			<circle cx='8' cy='8' r='1.25' />
		</Icon>
	);
};

ViewIcon.displayName = 'ViewIcon',
ViewIcon.peek = {
	description: `
		This icon is pretty generic and should be used a last case resort to
		another icon that's more descriptive.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ViewIcon.propTypes = {
	...Icon.propTypes,
};

export default ViewIcon;
