import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconWithDirectionProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-PinIcon');

export const iconPropTypes = {
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

	/** Sets the direction of the Icon, where applicable. */
	direction: PropTypes.oneOf(['left', 'right']),
};

export const PinIcon = ({
	className,
	direction = 'right',
	...passThroughs
}: IIconWithDirectionProps) => {
	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			className={cx(
				'&',
				{
					'&-is-left': direction === 'left',
					'&-is-right': direction === 'right',
				},
				className
			)}
		>
			<path d='M4.811.5l1.66 1.659-.731.731 3.169 2.03 1.709-.57 2.85 1.709-7.409 7.409-1.709-2.85.57-1.709L2.89 5.74l-.731.731L.5 4.811zM10 10l5.5 5.5' />
		</Icon>
	);
};

PinIcon.displayName = 'PinIcon';

PinIcon.defaultProps = Icon.defaultProps;

PinIcon.propTypes = iconPropTypes;

export default PinIcon;
