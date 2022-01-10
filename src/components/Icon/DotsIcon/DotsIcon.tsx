import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-DotsIcon');

export interface IDotsIconProps extends IIconProps {
	direction?: 'vertical' | 'horizontal';
}

export const iconPropTypes = {
	/** Sets the direction of the Icon. */
	direction: PropTypes.oneOf(['vertical', 'horizontal']),

	/** Size variations of the icons. \`size\` directly effects height and width
		but the developer should also be conscious of the relationship with
		\`viewBox\`. */
	size: PropTypes.number,

	/** Size handles width and height, whereas \`width\` can manually override the width that would be set by size. */
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/** Size handles width and height, whereas \`height\` can manually override the height that would be set by size. */
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/** \`viewBox\` is very important for SVGs. You can think of \`viewBox\` as
		the "artboard" for our SVG while \`size\` is the presented height and
		width. */
	viewBox: PropTypes.string,

	/** Sets the color of the Icon.  May not be applicable for icons that are tied
		to specific colors (e.g. DangerIcon). */
	color: PropTypes.oneOf([
		'neutral-dark',
		'neutral-light',
		'neutral-extra-light',
		'primary',
		'white',
		'success',
		'warning',
		'secondary-one',
		'secondary-two',
		'secondary-three',
		'secondary-five',
	]),

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

export const DotsIcon = ({
	className,
	direction = 'horizontal',
	color = 'primary',
	...passThroughs
}: IDotsIconProps) => {
	const isVerticalOrientation = direction === 'vertical';
	const leftOrTopPosition = {
		cx: isVerticalOrientation ? '8' : '14.5',
		cy: isVerticalOrientation ? '14.5' : '8',
	};
	const rightOrBottomPosition = {
		cx: isVerticalOrientation ? '8' : '1.5',
		cy: isVerticalOrientation ? '1.5' : '8',
	};

	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			color={color}
			className={cx('&', className)}
		>
			<circle className={cx(`&-color-${color}`)} cx='8' cy='8' r='1' />
			<circle className={cx(`&-color-${color}`)} {...leftOrTopPosition} r='1' />
			<circle
				className={cx(`&-color-${color}`)}
				{...rightOrBottomPosition}
				r='1'
			/>
		</Icon>
	);
};

DotsIcon.displayName = 'DotsIcon';

DotsIcon.propTypes = iconPropTypes;

DotsIcon.defaultProps = {
	...Icon.defaultProps,
	direction: 'horizontal',
};

export default DotsIcon;
