import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AddURLIcon');

interface IAddURLIconProps extends IIconProps {}

export const AddURLIcon: FC<IAddURLIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(AddURLIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(AddURLIcon.propTypes))}
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
AddURLIcon.propTypes = iconPropTypes;

export default AddURLIcon;
