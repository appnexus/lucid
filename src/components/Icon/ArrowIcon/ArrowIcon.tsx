import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ArrowIcon');

const { oneOf } = PropTypes;

interface IArrowIconProps extends IIconProps {
	direction?: 'up' | 'down' | 'left' | 'right';
}

export const ArrowIcon = ({
	className,
	direction = 'left',
	...passThroughs
}: IArrowIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(ArrowIcon.propTypes),
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
	...iconPropTypes,
	direction: oneOf(['up', 'down', 'left', 'right'])`
		direction variations of the icon
	`,
};
ArrowIcon.defaultProps = Icon.defaultProps;

export default ArrowIcon;
