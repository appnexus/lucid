import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-HamburgerMenuIcon');

export const iconPropTypes = {
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

export const HamburgerMenuIcon = ({
	className,
	...passThroughs
}: IIconProps) => {
	return (
		<Icon
			// As size, height, width and viewbox are static for this icon, editing those props is disallowed
			{..._.omit(passThroughs, [
				'initialState',
				'size',
				'height',
				'width',
				'viewbox',
			])}
			className={cx('&', className)}
			width={16}
			height={16}
			viewBox='0 0 16 16'
		>
			<path d='M.5 8h15M.5 13.5h15M.5 2.5h15' />
		</Icon>
	);
};

HamburgerMenuIcon.displayName = 'HamburgerMenuIcon';

HamburgerMenuIcon.propTypes = iconPropTypes;

HamburgerMenuIcon.defaultProps = Icon.defaultProps;

export default HamburgerMenuIcon;
