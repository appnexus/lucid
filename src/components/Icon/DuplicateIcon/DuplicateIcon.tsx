import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DuplicateIcon');

interface IDuplicateIconProps extends IIconProps {}

export const DuplicateIcon: FC<IDuplicateIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(DuplicateIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M1.5 4.5h9v11h-9z' />
			<path d='M10.5 11.5h4V.5h-9v4' />
		</Icon>
	);
};

DuplicateIcon.displayName = 'DuplicateIcon';
DuplicateIcon.peek = {
	description: `
		Typically used when something can be duplicated.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
DuplicateIcon.propTypes = iconPropTypes;

export default DuplicateIcon;
