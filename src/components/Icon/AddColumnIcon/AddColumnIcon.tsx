import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconWithDirectionProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-AddColumnIcon');

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

export const AddColumnIcon = ({
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
			<path d='M.5.5h4v15h-4zM8.5 7.554V.5h-4v15h4v-.375M9.5 11.25H13M11.25 9.5V13' />
			<circle cx='11.25' cy='11.25' r='4.25' />
		</Icon>
	);
};

AddColumnIcon.displayName = 'AddColumnIcon';

AddColumnIcon.defaultProps = Icon.defaultProps;

AddColumnIcon.propTypes = iconPropTypes;

export default AddColumnIcon;
