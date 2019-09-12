import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ArrowIcon');

const { oneOf } = PropTypes;

interface IArrowIconProps extends IIconProps {
	direction?: 'up' | 'down' | 'left' | 'right';
}

const ArrowIcon: FC<IArrowIconProps> = ({
	className,
	direction = 'left',
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(ArrowIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
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
			<path d='M0 8h15.5m-6-6l6 6-6 6' />
		</Icon>
	);
};

ArrowIcon.displayName = 'ArrowIcon';
ArrowIcon.peek = {
	description: `
		An arrow icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
ArrowIcon.propTypes = {
	...Icon.propTypes,
	direction: oneOf(['up', 'down', 'left', 'right'])`
		direction variations of the icon
	`,
};

export default ArrowIcon;
