import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-VideoIcon');

interface IVideoIconProps extends IIconProps {}

export const VideoIcon: FC<IVideoIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(VideoIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<circle cx='8' cy='8' r='7.5' />
			<path d='M6.25 5v6l4.5-3z' />
		</Icon>
	);
};

VideoIcon.displayName = 'VideoIcon';
VideoIcon.peek = {
	description: `
		A video icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
VideoIcon.propTypes = iconPropTypes;

export default VideoIcon;
