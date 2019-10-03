import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';
import PropTypes from 'react-peek/prop-types';

const { oneOf } = PropTypes;

const cx = lucidClassNames.bind('&-OutwardArrowsIcon');

const paths = {
	horizontal: <path d='M4 8h8m-1.5 2l2-2-2-2m-5 4l-2-2 2-2m-5-2.5v9m15-9v9' />,
	vertical: <path d='M8 4v8m-2-1.5l2 2 2-2m-4-5l2-2 2 2m2.5-5h-9m9 15h-9' />,
	diagonal: (
		<>
			<path d='M11.828 4.172l-7.656 7.656m-.354-2.474v2.828h2.828m2.708-8.364h2.828v2.828' />
			<path d='M.5 8.5v7h7m8-8v-7h-7' />
		</>
	),
};

interface IOutwardArrowsIconProps extends IIconProps {
	/**	Determines the kind of arrows you want to display. \`horizontal\` is
		usually used for width. \`vertical\` is usually used for height.
		\`diagonal\` is usually used for aspect ratio. */
	kind: 'horizontal' | 'vertical' | 'diagonal';
}

export const OutwardArrowsIcon: FC<IOutwardArrowsIconProps> = ({
	className,
	kind = 'horizontal',
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(OutwardArrowsIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			{paths[kind]}
		</Icon>
	);
};

OutwardArrowsIcon.displayName = 'OutwardArrowsIcon';
OutwardArrowsIcon.peek = {
	description: `
		Typically used to denote width, height, or aspect ratio.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
OutwardArrowsIcon.propTypes = {
	...iconPropTypes,
	kind: oneOf(['horizontal', 'vertical', 'diagonal'])`
		Determines the kind of arrows you want to display. \`horizontal\` is
		usually used for width. \`vertical\` is usually used for height.
		\`diagonal\` is usually used for aspect ratio.
	`,
};

export default OutwardArrowsIcon;
