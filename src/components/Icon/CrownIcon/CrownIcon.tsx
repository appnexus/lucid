import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-CrownIcon');

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

export const CrownIcon = ({ className, ...passThroughs }: IIconProps) => {
	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			className={cx('&', className)}
		>
			<path d='M1.5 14.5h13' />
			<path d='M1.5 11.5h13l1-8-4 2L8 .5l-3.5 5-4-2z' />
		</Icon>
	);
};

CrownIcon.displayName = 'CrownIcon';

CrownIcon.propTypes = iconPropTypes;

CrownIcon.defaultProps = Icon.defaultProps;

export default CrownIcon;
