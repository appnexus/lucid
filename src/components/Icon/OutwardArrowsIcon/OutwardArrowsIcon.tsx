import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-OutwardArrowsIcon');

const paths = {
	horizontal: <path d='M4 8h8m-1.5 2l2-2-2-2m-5 4l-2-2 2-2m-5-2.5v9m15-9v9' />,
	vertical: <path d='M8 4v8m-2-1.5l2 2 2-2m-4-5l2-2 2 2m2.5-5h-9m9 15h-9' />,
	diagonal: (
		<>
			<path d='M11.828 4.172l-7.656 7.656m-.354-2.474v2.828h2.828m2.708-8.364h2.828v2.828' />
			<path d='M.5 8.5v7h7m8-8v-7h-7' />
		</>
	),
};

export interface IOutwardArrowsIconProps extends IIconProps {
	/**	Determines the kind of arrows you want to display. \`horizontal\` is
		usually used for width. \`vertical\` is usually used for height.
		\`diagonal\` is usually used for aspect ratio. */
	kind?: 'horizontal' | 'vertical' | 'diagonal';
}

export const outwardArrowsIconPropTypes = {
	/**	Determines the kind of arrows you want to display. \`horizontal\` is
		usually used for width. \`vertical\` is usually used for height.
		\`diagonal\` is usually used for aspect ratio. */
	kind: PropTypes.oneOf(['horizontal', 'vertical', 'diagonal']),

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

export const OutwardArrowsIcon = ({
	className,
	kind = 'horizontal',
	...passThroughs
}: IOutwardArrowsIconProps) => {
	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			className={cx('&', className)}
		>
			{paths[kind]}
		</Icon>
	);
};

OutwardArrowsIcon.displayName = 'OutwardArrowsIcon';

OutwardArrowsIcon.propTypes = outwardArrowsIconPropTypes;

OutwardArrowsIcon.defaultProps = Icon.defaultProps;

export default OutwardArrowsIcon;
