import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-NewWindowIcon');

interface INewWindowIconProps extends IIconProps {}

const NewWindowIcon: FC<INewWindowIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(NewWindowIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M9.5.5h6v6m-10-6h-5v15h15v-5' />
			<path d='M15.5.5L7 9' />
		</Icon>
	);
};

NewWindowIcon.displayName = 'NewWindowIcon';
NewWindowIcon.peek = {
	description: `
		A new window icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
NewWindowIcon.propTypes = iconPropTypes;

export default NewWindowIcon;
