import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FileIcon');

interface IFileIconProps extends IIconProps {}

export const FileIcon: FC<IFileIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(FileIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M2.5.5v15h11v-11l-4-4z' />
			<path d='M13.25 5H9V.75' />
		</Icon>
	);
};

FileIcon.displayName = 'FileIcon';
FileIcon.peek = {
	description: `
		An icon for a file.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
FileIcon.propTypes = iconPropTypes;

export default FileIcon;
