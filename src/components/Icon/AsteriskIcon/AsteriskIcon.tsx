import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AsteriskIcon');

interface IAsteriskIconProps extends IIconProps {}

const AsteriskIcon: FC<IAsteriskIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(AsteriskIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M8 0v16m6.928-12L1.072 12m0-8l13.856 8' />
		</Icon>
	);
};

AsteriskIcon.displayName = 'AsteriskIcon';
AsteriskIcon.peek = {
	description: `
		An asterisk icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
AsteriskIcon.propTypes = iconPropTypes;

export default AsteriskIcon;
