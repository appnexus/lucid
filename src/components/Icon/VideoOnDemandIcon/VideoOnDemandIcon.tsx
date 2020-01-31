import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-VideoOnDemandIcon');

interface IVideoOnDemandIconProps extends IIconProps {}

export const VideoOnDemandIcon = ({
	className,
	...passThroughs
}: IVideoOnDemandIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(VideoOnDemandIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M7.188 6.5V10l2.625-1.75z' />
			<path d='M12.256 6.01a4.515 4.515 0 00-8.742.989C1.857 6.999.5 8.343.5 10s1.343 3 3 3H12a3.5 3.5 0 003.5-3.5 3.508 3.508 0 00-3.244-3.49z' />
		</Icon>
	);
};

VideoOnDemandIcon.displayName = 'VideoOnDemandIcon';
VideoOnDemandIcon.peek = {
	description: `
		A video on demand (VOD) icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
VideoOnDemandIcon.propTypes = iconPropTypes;
VideoOnDemandIcon.defaultProps = Icon.defaultProps;

export default VideoOnDemandIcon;
