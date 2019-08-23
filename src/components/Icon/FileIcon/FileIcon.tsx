import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FileIcon');

interface IFileIconProps extends IIconProps {}

const FileIcon: FC<IFileIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(FileIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M2.5.5v15h11v-11l-4-4z' />
			<path d='M13.25 5H9V.75' />
		</Icon>
	);
};

FileIcon.displayName = 'FileIcon',
FileIcon.peek = {
	description: `
		An icon for a file.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
FileIcon.propTypes = {
	...Icon.propTypes,
};

export default FileIcon;
