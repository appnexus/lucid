import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-GripperHorizontalIcon');

export interface IGripperHorizontalIconProps extends IIconProps {}

const iconPropTypes = {
	/** Classes that are appended to the component defaults. This prop is run
		through the \`classnames\` library. */
	className: PropTypes.string,

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

	/** Sets the color of the Icon.  May not be applicable for icons that are tied
		to specific colors (e.g. DangerIcon). */
	color: PropTypes.oneOf([
		'neutral-dark',
		'neutral-light',
		'primary',
		'white',
		'success',
		'warning',
		'secondary-one',
		'secondary-two',
		'secondary-three',
	]),
};

export const GripperHorizontalIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: IGripperHorizontalIconProps) => {
	return (
		<Icon
			{...omit(passThroughs, ['initialState'])}
			width={16}
			height={2}
			viewBox='0 0 16 2'
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx('&', className)}
		>
			<path d='M.5 0v2M4 0v2M8 0v2M12 0v2M15.5 0v2' />
		</Icon>
	);
};

GripperHorizontalIcon.defaultProps = Icon.defaultProps;
GripperHorizontalIcon.displayName = 'GripperHorizontalIcon';
GripperHorizontalIcon.peek = {
	description: `A horizontal gripper icon.`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
GripperHorizontalIcon.propTypes = iconPropTypes;

export default GripperHorizontalIcon;
