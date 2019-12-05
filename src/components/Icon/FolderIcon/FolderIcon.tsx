import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FolderIcon');

interface IFolderIconProps extends IIconProps {}

export const FolderIcon = ({
	className,
	...passThroughs
}: IFolderIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(FolderIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 4.5h15v10H.5zm0 0v-3h5l2 3' />
		</Icon>
	);
};

FolderIcon.displayName = 'FolderIcon';
FolderIcon.peek = {
	description: `
		An edit icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
FolderIcon.propTypes = iconPropTypes;
FolderIcon.defaultProps = Icon.defaultProps;

export default FolderIcon;
