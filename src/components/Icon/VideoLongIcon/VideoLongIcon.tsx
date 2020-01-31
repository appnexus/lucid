import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-VideoIcon');

interface IVideoLongIconProps extends IIconProps {}

export const VideoLongIcon = ({
	className,
	...passThroughs
}: IVideoLongIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(VideoLongIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M6.5 4v5l3.75-2.5zM15.5 12.5H.5' />
			<path d='M.5.5h15v15H.5zM2 15.5l3-3M.5 14L2 12.5M5 15.5l3-3M8 15.5l3-3M11 15.5l3-3M14 15.5l1.5-1.5' />
		</Icon>
	);
};

VideoLongIcon.displayName = 'VideoLongIcon';
VideoLongIcon.peek = {
	description: `
		A video long icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
VideoLongIcon.propTypes = iconPropTypes;
VideoLongIcon.defaultProps = Icon.defaultProps;

export default VideoLongIcon;
