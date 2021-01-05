import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-InheritedSettingsIcon');

interface IInheritedSettingsIconProps extends IIconProps {}

export const InheritedSettingsIcon = ({
	className,
	...passThroughs
}: IInheritedSettingsIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(InheritedSettingsIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(InheritedSettingsIcon.propTypes))}
			className={cx('&', className)}
		>
			<circle cx='8' cy='3.25' r='2.75' />
			<path d='M2.75 15.5C3.993 15.5 5 14.493 5 13.25S3.993 11 2.75 11 .5 12.007.5 13.25s1.007 2.25 2.25 2.25zM13.25 15.5c1.243 0 2.25-1.007 2.25-2.25S14.493 11 13.25 11 11 12.007 11 13.25s1.007 2.25 2.25 2.25zM2.75 10.75V8.5h10.5v2.25M8 8.25v-2' />
		</Icon>
	);
};

InheritedSettingsIcon.displayName = 'InheritedSettingsIcon';
InheritedSettingsIcon.peek = {
	description: `
		An icon that indicates when settings are inherited.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
InheritedSettingsIcon.propTypes = iconPropTypes;
InheritedSettingsIcon.defaultProps = Icon.defaultProps;

export default InheritedSettingsIcon;
