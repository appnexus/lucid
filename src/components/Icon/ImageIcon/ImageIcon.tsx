import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ImageIcon');

interface IImageIconProps extends IIconProps {}

const ImageIcon: FC<IImageIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(ImageIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5.5h15v15H.5z' />
			<circle cx='10' cy='5' r='2' />
			<path d='M.5 11.5l4.5-4 4.5 4 3-2 3 2' />
		</Icon>
	);
};

ImageIcon.displayName = 'ImageIcon';
ImageIcon.peek = {
	description: `
		An icon for a file.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ImageIcon.propTypes = iconPropTypes;

export default ImageIcon;
