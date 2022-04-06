import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-InfoLightIcon');

export interface IInfoLightIconProps extends IIconProps {}

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

export const InfoLightIcon = ({
	className,
	isClickable,
	isDisabled,
	...passThroughs
}: IInfoLightIconProps) => {
	return (
		<Icon
			{...omit(passThroughs, ['initialState'])}
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx(
				'&',
				isDisabled && '&-is-disabled',
				isClickable && '&-is-clickable',
				className
			)}
		>
			<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
			<path className={cx('&-stem')} d='M7.99 12.5v-6' />
			<circle className={cx('&-dot')} cx='7.99' cy='4' r='.293' />
		</Icon>
	);
};

InfoLightIcon.displayName = 'InfoLightIcon';
InfoLightIcon.peek = {
	description: `
		DEPRECATED: this component should not be used and will be removed from the library in a future release.
		
		A light info icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
InfoLightIcon.propTypes = iconPropTypes;
InfoLightIcon.defaultProps = Icon.defaultProps;

export default InfoLightIcon;
