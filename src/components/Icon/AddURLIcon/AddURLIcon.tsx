import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AddURLIcon');

interface IAddURLIconProps extends IIconProps {}

const AddURLIcon: FC<IAddURLIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...passThroughs}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M10.7 12.781l1.267 2.719 2.357-1.098-1.267-2.719 2.693-.614L8.5 4.98l-.002 9.468z' />
			<path d='M15.5.5H.5v10h6' />
		</Icon>
	);
};

AddURLIcon.displayName = 'AddURLIcon';
AddURLIcon.peek = {
	description: `
		Add URL
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
AddURLIcon.propTypes = {
	...Icon.propTypes,
};


export default AddURLIcon;
