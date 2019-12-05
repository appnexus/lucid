import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DeleteIcon');

interface IDeleteIconProps extends IIconProps {}

export const DeleteIcon = ({
	className,
	...passThroughs
}: IDeleteIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(DeleteIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M1.5 3h13' />
			<path d='M2.5 3L3 15.5h10L13.5 3' />
			<path d='M6 6.503V12.5m4-5.997V12.5' />
			<path d='M5.5 3l1-2.5h3l1 2.5' />
		</Icon>
	);
};

DeleteIcon.displayName = 'DeleteIcon';
DeleteIcon.peek = {
	description: `
		A trash icon, used for indicating the deletion of a ui component.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
DeleteIcon.propTypes = iconPropTypes;
DeleteIcon.defaultProps = Icon.defaultProps;

export default DeleteIcon;
