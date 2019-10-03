import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ChatIcon');

interface IChatIconProps extends IIconProps {}

export const ChatIcon: FC<IChatIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(ChatIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M4.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM8 5.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm4 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z' />
			<path d='M7.5 11.5H10c3.025 0 5.5-2.475 5.5-5.5S13.025.5 10 .5H6C2.975.5.5 2.975.5 6c0 2.118 1.234 3.967 3 4.884V14.5l4-3z' />
		</Icon>
	);
};

ChatIcon.displayName = 'ChatIcon';
ChatIcon.peek = {
	description: `
		A chat icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ChatIcon.propTypes = iconPropTypes;

export default ChatIcon;
