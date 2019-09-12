import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CrownIcon');

interface ICrownIconProps extends IIconProps {}

const CrownIcon: FC<ICrownIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(CrownIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M1.5 14.5h13' />
			<path d='M1.5 11.5h13l1-8-4 2L8 .5l-3.5 5-4-2z' />
		</Icon>
	);
};

CrownIcon.displayName = 'CrownIcon',
CrownIcon.peek = {
	description: `
		A crown icon, used for indicating super or admin users.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CrownIcon.propTypes = {
	...Icon.propTypes,
};

export default CrownIcon;
