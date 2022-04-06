import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-GripperVerticalIcon');

export interface IGripperVerticalIconProps extends IIconProps {}

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

export const GripperVerticalIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: IGripperVerticalIconProps) => {
	return (
		<Icon
			{...omit(passThroughs, ['initialState'])}
			width={2}
			height={16}
			viewBox='0 0 2 16'
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx('&', className)}
		>
			<path d='M0 .5h2M0 4h2M0 8h2M0 12h2M0 15.5h2' />
		</Icon>
	);
};

GripperVerticalIcon.defaultProps = Icon.defaultProps;
GripperVerticalIcon.displayName = 'GripperVerticalIcon';
GripperVerticalIcon.peek = {
	description: `A vertical gripper icon.`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
GripperVerticalIcon.propTypes = iconPropTypes;

export default GripperVerticalIcon;
