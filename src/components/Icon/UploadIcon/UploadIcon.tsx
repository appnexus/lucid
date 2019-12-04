import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UploadIcon');

interface IUploadIconProps extends IIconProps {}

export const UploadIcon = ({
	className,
	...passThroughs
}: IUploadIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(UploadIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M8 12V.5m5 5l-5-5-5 5' />
			<path d='M.5 13.5v2h15v-2' />
		</Icon>
	);
};

UploadIcon.displayName = 'UploadIcon';
UploadIcon.peek = {
	description: `
		Upload files
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
UploadIcon.propTypes = iconPropTypes;
UploadIcon.defaultProps = Icon.defaultProps;

export default UploadIcon;
