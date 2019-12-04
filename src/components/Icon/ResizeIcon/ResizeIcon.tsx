import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ResizeIcon');

interface IResizeIconProps extends IIconProps {}

export const ResizeIcon = ({
	className,
	...passThroughs
}: IResizeIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(ResizeIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M13.5 15.5l2-2m-6 2l6-6' />
		</Icon>
	);
};

ResizeIcon.displayName = 'ResizeIcon';
ResizeIcon.peek = {
	description: `
		An asterisk icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ResizeIcon.propTypes = iconPropTypes;
ResizeIcon.defaultProps = Icon.defaultProps;

export default ResizeIcon;
