import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-BookIcon');

export const iconPropTypes = {
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

export const BookIcon = ({ className, ...passThroughs }: IIconProps) => {
	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			className={cx('&', className)}
		>
			<path d='M2.5 2.5h-2v13h15v-13h-2' />
			<path d='M8 2.5c-1.5-3-5-2-5-2v12.484S6.5 12.5 7.519 15.5h.962C9.5 12.5 13 12.984 13 12.984V.5s-3.5-1-5 2zm0 0v12.962' />
		</Icon>
	);
};

BookIcon.displayName = 'BookIcon';

BookIcon.propTypes = iconPropTypes;

BookIcon.defaultProps = Icon.defaultProps;

export default BookIcon;
