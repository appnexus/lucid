import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AudioIcon');

interface IAudioIconProps extends IIconProps {}

const AudioIcon: FC<IAudioIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(AudioIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 5.5v5h4l4 4v-13l-4 4zM10.786 11s1.714-.857 1.714-3-1.714-3-1.714-3' />
			<path d='M12.071 14S15.5 12.286 15.5 8s-3.429-6-3.429-6' />
		</Icon>
	);
};

AudioIcon.displayName = 'AudioIcon';
AudioIcon.peek = {
	description: `
		An audio icon. Can you hear me now? Good.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
AudioIcon.propTypes = iconPropTypes;

export default AudioIcon;
