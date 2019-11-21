import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-HomeIcon');

interface IHomeIconProps extends IIconProps {}

export const HomeIcon = ({
	className,
	...passThroughs
}: IHomeIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(HomeIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M8 .5l-7.5 6v9h5v-7h5v7h5v-9z' />
		</Icon>
	);
};

HomeIcon.displayName = 'HomeIcon';
HomeIcon.peek = {
	description: `
		RUNHOME Jack! No, no, no, HOMERUN Jack!
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
HomeIcon.propTypes = iconPropTypes;
HomeIcon.defaultProps = Icon.defaultProps;

export default HomeIcon;
