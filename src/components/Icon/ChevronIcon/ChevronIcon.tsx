import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const { oneOf } = PropTypes;

const cx = lucidClassNames.bind('&-ChevronIcon');

interface IChevronIconProps extends IIconProps {
	direction?: 'up' | 'down' | 'left' | 'right';
}
export const ChevronIcon: FC<IChevronIconProps> = ({
	className,
	direction = 'down',
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(ChevronIcon.propTypes),
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
			<path d='M.5 4.5l7.5 7 7.5-7' />
		</Icon>
	);
};

ChevronIcon.displayName = 'ChevronIcon';
ChevronIcon.peek = {
	description: `
		A chevron icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ChevronIcon.propTypes = {
	...iconPropTypes,
	direction: oneOf(['up', 'down', 'left', 'right'])`
		direction variations of the icon
	`,
};

export default ChevronIcon;
