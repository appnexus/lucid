import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-AnalyzeDataIcon');

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
		'primary',
		'white',
		'success',
		'warning',
		'secondary-one',
		'secondary-two',
		'secondary-three',
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

export const AnalyzeDataIcon = ({ className, ...passThroughs }: IIconProps) => {
	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			className={cx('&', className)}
		>
			<path d='M0 15.5h16' />
			<path d='M2.5 10.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3-6a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
			<circle cx='13.5' cy='2.5' r='2' />
			<path d='M1.5 10.5l4-5 4 4 3.065-5.364' />
		</Icon>
	);
};

AnalyzeDataIcon.displayName = 'AnalyzeDataIcon';

AnalyzeDataIcon.defaultProps = Icon.defaultProps;

AnalyzeDataIcon.propTypes = iconPropTypes;

export default AnalyzeDataIcon;
