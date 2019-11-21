import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DownloadIcon');

interface IDownloadIconProps extends IIconProps {}

export const DownloadIcon = ({
	className,
	...passThroughs
}: IDownloadIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(DownloadIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M8 0v12m5-5l-5 5-5-5' />
			<path d='M.5 13.5v2h15v-2' />
		</Icon>
	);
};

DownloadIcon.displayName = 'DownloadIcon';
DownloadIcon.peek = {
	description: `
		Typically used to denote that something is available for download.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
DownloadIcon.propTypes = iconPropTypes;
DownloadIcon.defaultProps = Icon.defaultProps;

export default DownloadIcon;
