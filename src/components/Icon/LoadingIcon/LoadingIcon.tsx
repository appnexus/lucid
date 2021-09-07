import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-LoadingIcon');

export enum durations {
	fast = '0.75s',
	normal = '1.25s',
	slow = '4s',
}

export interface ILoadingIconProps extends IIconProps {
	/**	The speed of rotation of the spinner. */
	speed?: keyof typeof durations;
}

export const loadingIconPropTypes = {
	/**	The speed of rotation of the spinner. */
	speed: PropTypes.oneOf(['fast', 'normal', 'slow']),

	/** Size variations of the icons. \`size\` directly effects height and width
		but the developer should also be conscious of the relationship with
		\`viewBox\`. */
	size: PropTypes.number,

	/** Size handles width and height, whereas \`width\` can manually override the width that would be set by size. */
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/** Size handles width and height, whereas \`height\` can manually override the height that would be set by size. */
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/** Any valid SVG aspect ratio. */
	aspectRatio: PropTypes.string,

	/** Adds styling that makes the icon appear clickable. */
	isClickable: PropTypes.bool,

	/** Adds styling that makes the icon appear disabled.  Also forces
		isClickable to be false. */
	isDisabled: PropTypes.bool,

	/** Called when the user clicks the \`Icon\`. Signature:
		\`({event, props}) => {}\` */
	onClick: PropTypes.func,

	/** Called when the user clicks an active, clickable \`Icon\`. Signature:
		\`({event, props}) => {}\` */
	onSelect: PropTypes.func,

	/** Any valid React children. */
	children: PropTypes.element,

	/** Classes that are appended to the component defaults. This prop is run
		through the \`classnames\` library. */
	className: PropTypes.string,
};

export const LoadingIcon = ({
	className,
	speed = 'normal',
	style,
	isDisabled,
	...passThroughs
}: ILoadingIconProps) => {
	const animationDuration = `${durations[speed] || durations.normal}`;

	return (
		<Icon
			{..._.omit(passThroughs, ['initialState', 'viewbox', 'color'])}
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

LoadingIcon.propTypes = loadingIconPropTypes;

LoadingIcon.defaultProps = Icon.defaultProps;

export default LoadingIcon;
