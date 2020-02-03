import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-VideoShortIcon');

interface IVideoShortIconProps extends IIconProps {}

export const VideoShortIcon = ({
	className,
	...passThroughs
}: IVideoShortIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(VideoShortIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M6.5 4v5l3.75-2.5zM15.5 12.5H.5' />
			<path
				stroke-linecap='butt'
				d='M.5.5h15v15H.5zM8 12.5v3M2 15.5l3-3M.5 14L2 12.5M5 15.5l3-3'
			/>
		</Icon>
	);
};

VideoShortIcon.displayName = 'VideoShortIcon';
VideoShortIcon.peek = {
	description: `
		A video short icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
VideoShortIcon.propTypes = iconPropTypes;
VideoShortIcon.defaultProps = Icon.defaultProps;

export default VideoShortIcon;
