import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MegaphoneIcon');

interface IMegaphoneIconProps extends IIconProps {}

export const MegaphoneIcon = ({
	className,
	...passThroughs
}: IMegaphoneIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(MegaphoneIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M2.597 10.397L5.5 2l8.429 8.5-8.326 2.903zM14.179 1.821l-1.858 1.858M9.929.5v2.071M15.5 6.071h-2.071' />
			<path
				d='M1.569 10.823h2.966v4.251H1.569z'
				transform='rotate(-45 3.0515 12.9485)'
				style={{ transformOrigin: '0 0' }}
			/>
			<path d='M5.603 13.403l2.105 2.104' />
		</Icon>
	);
};

MegaphoneIcon.displayName = 'MegaphoneIcon';
MegaphoneIcon.peek = {
	description: `
		A megaphone icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
MegaphoneIcon.propTypes = iconPropTypes;
MegaphoneIcon.defaultProps = Icon.defaultProps;

export default MegaphoneIcon;
