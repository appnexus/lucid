import _ from 'lodash';
import React from 'react';
import Icon, { propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import {
	IIconWithDirectionProps,
	omitProps,
} from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DoubleChevronIcon');

export const DoubleChevronIcon = ({
	className,
	direction = 'down',
	...passThroughs
}: IIconWithDirectionProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(DoubleChevronIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx(
				'&',
				{
					'&-is-down': direction === 'down',
					'&-is-up': direction === 'up',
					'&-is-left': direction === 'left',
					'&-is-right': direction === 'right',
				},
				className
			)}
		>
			<path d='M.5 1.5l7.5 7 7.5-7' />
			<path d='M.5 7.5l7.5 7 7.5-7' />
		</Icon>
	);
};

DoubleChevronIcon.displayName = 'DoubleChevronIcon';

DoubleChevronIcon.propTypes = {
	...iconPropTypes,
};

DoubleChevronIcon.defaultProps = Icon.defaultProps;

export default DoubleChevronIcon;
