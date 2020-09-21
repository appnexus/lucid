import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LightbulbIcon');

interface ILightbulbIconProps extends IIconProps {}

export const LightbulbIcon = ({
	className,
	...passThroughs
}: ILightbulbIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(LightbulbIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M10 13.5H6M9 15.5H7' stroke='#000' />
			<path
				id='a_1_'
				d='M10 11.5h0c0-.788.617-1.562.995-1.845l.095-.075c1.261-.946 1.986-2.427 1.986-4.004C13.076 2.801 10.806.5 8 .5S2.924 2.801 2.924 5.576c0 1.576.725 3.058 1.986 4.004l.095.075C5.383 9.939 6 10.712 6 11.5h4z'
				fillRule='evenodd'
				clipRule='evenodd'
				fill='none'
				stroke='#000'
				strokeWidth='1.3'
				strokeLinecap='square'
				strokeMiterlimit='10'
			/>
			<path d='M8 11.474V6M7 6h2' stroke='#000' />
		</Icon>
	);
};

LightbulbIcon.displayName = 'LightbulbIcon';
LightbulbIcon.peek = {
	description: `
		A lightbulb icon, used as a symbol for good ideas or innovation or literaly as just an ordinary glass housing containing a wire filament that gives off light when heated to incandescence by electricity.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
LightbulbIcon.propTypes = iconPropTypes;
LightbulbIcon.defaultProps = Icon.defaultProps;

export default LightbulbIcon;
