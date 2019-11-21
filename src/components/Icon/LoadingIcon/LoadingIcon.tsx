import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LoadingIcon');

const { oneOf } = PropTypes;

export enum durations {
	fast = '0.75s',
	normal = '1.25s',
	slow = '4s',
}

interface ILoadingIconProps extends IIconProps {
	/**	The speed of rotation of the spinner. */
	speed?: keyof typeof durations;
}

export const LoadingIcon = ({
	className,
	speed = 'normal',
	style,
	isDisabled,
	...passThroughs
}: ILoadingIconProps): React.ReactElement => {
	const animationDuration = `${durations[speed] || durations.normal}`;

	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(LoadingIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			viewBox='0 0 100 100'
			className={cx('&', className)}
			style={{ animationDuration, ...style }}
			isDisabled={isDisabled}
		>
			<rect x='0' y='0' width='100' height='100' fill='none' />
			<circle className={cx('&-circle')} cx='50' cy='50' r='40' />
			<circle
				style={{ animationDuration }}
				className={cx('&-spinner', { '&-spinner-is-disabled': isDisabled })}
				cx='50'
				cy='50'
				r='40'
			/>
		</Icon>
	);
};

LoadingIcon.displayName = 'LoadingIcon';
LoadingIcon.peek = {
	description: `
		A loading icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
LoadingIcon.propTypes = {
	...iconPropTypes,
	speed: oneOf(_.keys(durations))`
		The speed of rotation of the spinner.
	`,
};
LoadingIcon.defaultProps = Icon.defaultProps;

export default LoadingIcon;
