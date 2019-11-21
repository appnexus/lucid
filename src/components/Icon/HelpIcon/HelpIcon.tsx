import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-HelpIcon');

interface IHelpIconProps extends IIconProps {}

export const HelpIcon = ({
	className,
	isDisabled,
	isClickable,
	...passThroughs
}: IHelpIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(HelpIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx(
				'&',
				isDisabled && '&-is-disabled',
				isClickable && '&-is-clickable',
				className
			)}
		>
			<path d='M5.5 6.138C5.5 4.681 6.533 3.5 7.99 3.5s2.51 1.135 2.51 2.592c0 .696-.398 1.323-1.259 1.885-.806.525-1.251.861-1.251 1.536V10' />
			<circle className={cx('&-period')} cx='7.99' cy='12.001' r='.293' />
			<circle cx='8' cy='8' r='7.5' />
		</Icon>
	);
};

HelpIcon.displayName = 'HelpIcon';
HelpIcon.peek = {
	description: `
		Help me Rhonda.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
HelpIcon.propTypes = iconPropTypes;
HelpIcon.defaultProps = Icon.defaultProps;

export default HelpIcon;
