import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-VideoLiveIcon');

interface IVideoLiveIconProps extends IIconProps {}

export const VideoLiveIcon = ({
	className,
	...passThroughs
}: IVideoLiveIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(VideoLiveIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M2.697 13.303a7.5 7.5 0 010-10.607M13.303 2.697a7.5 7.5 0 010 10.607M11.536 4.465a5 5 0 010 7.071M4.464 11.536a5 5 0 010-7.071M7.188 6.25v3.5L9.812 8z' />
		</Icon>
	);
};

VideoLiveIcon.displayName = 'VideoLiveIcon';
VideoLiveIcon.peek = {
	description: `
		A video live icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
VideoLiveIcon.propTypes = iconPropTypes;
VideoLiveIcon.defaultProps = Icon.defaultProps;

export default VideoLiveIcon;
