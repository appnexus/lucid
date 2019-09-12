import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ViewTableIcon');

interface IViewTableIconProps extends IIconProps {}

const ViewTableIcon: FC<IViewTableIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(ViewTableIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M7.25 13.5h8.25' />
			<path d='M13.5 15.5l2-2-2-2m2-3v-8H.5v13h4' />
			<path d='M15.5 4.5H.5' />
		</Icon>
	);
};

ViewTableIcon.displayName = 'ViewTableIcon',
ViewTableIcon.peek = {
	description: `
		Would you just look at it?!
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ViewTableIcon.propTypes = {
	...Icon.propTypes,
};

export default ViewTableIcon;
