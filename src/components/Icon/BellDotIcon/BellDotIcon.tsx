import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BellDotIcon');

interface IBellDotIconProps extends IIconProps {}

export const BellDotIcon = ({
	className,
	...passThroughs
}: IBellDotIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(BellDotIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M5.5 12.502v.5c0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5l.003-.495M3.056 7.432c-.54 2.214-1.556 3.07-1.556 3.07v2h13v-2s-1.884-1.587-1.884-6.024c0-.901-.909-3.976-4.616-3.976-.279 0-.543.017-.791.05' />
			<path d='M3.5 6.152c-1.737 0-3.15-1.413-3.15-3.15S1.763-.148 3.5-.148s3.15 1.413 3.15 3.15-1.413 3.15-3.15 3.15z' />
			<path
				className={cx('&-background')}
				d='M3.5-.148c1.737 0 3.15 1.413 3.15 3.15s-1.413 3.15-3.15 3.15S.35 4.739.35 3.002 1.763-.148 3.5-.148'
			/>
		</Icon>
	);
};

BellDotIcon.displayName = 'BellDotIcon';
BellDotIcon.peek = {
	description: `
		Typically used for notifications that have an unread message.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
BellDotIcon.propTypes = iconPropTypes;
BellDotIcon.defaultProps = Icon.defaultProps;

export default BellDotIcon;
