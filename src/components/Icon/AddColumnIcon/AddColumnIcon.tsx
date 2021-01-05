import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AddColumnIcon');

interface IAddColumnIconProps extends IIconProps {}

export const AddColumnIcon = ({
	className,
	...passThroughs
}: IAddColumnIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(AddColumnIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(AddColumnIcon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M.5.5h4v15h-4zM8.5 7.554V.5h-4v15h4v-.375M9.5 11.25H13M11.25 9.5V13' />
			<circle cx='11.25' cy='11.25' r='4.25' />
		</Icon>
	);
};

AddColumnIcon.displayName = 'AddColumnIcon';
AddColumnIcon.peek = {
	description: `
		Add a column.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
AddColumnIcon.propTypes = iconPropTypes;
AddColumnIcon.defaultProps = Icon.defaultProps;

export default AddColumnIcon;
