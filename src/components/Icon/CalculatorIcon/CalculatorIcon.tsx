import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CalculatorIcon');

interface ICalculatorIconProps extends IIconProps {}

export const CalculatorIcon = ({
	className,
	...passThroughs
}: ICalculatorIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(CalculatorIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M1.5.5h13v15h-13zM1.5 5.5h13' />
			<path d='M4 8h1M7.5 8h1M11 8h1M4 10.5h1M7.5 10.5h1M11 10.5h1V13h-1zM4 13h1M7.5 13h1' />
		</Icon>
	);
};

CalculatorIcon.displayName = 'CalculatorIcon';
CalculatorIcon.peek = {
	description: `
		A calculator icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CalculatorIcon.propTypes = iconPropTypes;
CalculatorIcon.defaultProps = Icon.defaultProps;

export default CalculatorIcon;
