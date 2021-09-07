import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-HelpIcon');

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

export const HelpIcon = ({
	className,
	isDisabled,
	isClickable,
	...passThroughs
}: IIconProps) => {
	return (
		<Icon
			// As color is static for this icon, editing the color prop is disallowed
			{..._.omit(passThroughs, ['initialState', 'color'])}
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx(
				'&',
				isDisabled && '&-is-disabled',
				isClickable && '&-is-clickable',
				className
			)}
		>
			<path d='M5.5 6.138C5.5 4.681 6.533 3.5 7.99 3.5s2.51 1.135 2.51 2.592c0 .696-.398 1.323-1.259 1.885-.806.525-1.251.861-1.251 1.536V10' />
			<circle className={cx('&-period')} cx='7.99' cy='12.001' r='.293' />
			<circle cx='8' cy='8' r='7.5' />
		</Icon>
	);
};

HelpIcon.displayName = 'HelpIcon';

HelpIcon.propTypes = iconPropTypes;

HelpIcon.defaultProps = Icon.defaultProps;

export default HelpIcon;
