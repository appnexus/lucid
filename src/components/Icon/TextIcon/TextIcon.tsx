import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-TextIcon');

interface ITextIconProps extends IIconProps {}

export const TextIcon: FC<ITextIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(TextIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 2.5v-2h15v2' />
			<path d='M8 15.5V.5' />
			<path d='M4.5 15.5h7' />
		</Icon>
	);
};

TextIcon.displayName = 'TextIcon';
TextIcon.peek = {
	description: `
		A text icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
TextIcon.propTypes = iconPropTypes;

export default TextIcon;
