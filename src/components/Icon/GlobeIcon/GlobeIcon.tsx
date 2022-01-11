import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-GlobeIcon');

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

export const GlobeIcon = ({ className, ...passThroughs }: IIconProps) => {
	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			className={cx('&', className)}
		>
			<circle
				cx='8'
				cy='8'
				r='7.8'
				fill='none'
				strokeWidth='1.3'
				strokeLinecap='square'
				strokeMiterlimit='10'
			/>
			<path d='M9.397.631c-.212.759-.468 2.019.325 2.541.874.576 2.396-.221 3.073-.818M14.702 4.754l-2.335-.018c-.575-.004-1.047.338-1.287.85-.346.738-.251 1.421.477 1.834.854.483 1.819.961 1.479 2.119-.191.651-.273.577-.242 1.264.018.395.724 1.62 1.083 1.854M1.775 3.861c-.079.296-.107.827.432 1.342.808.772 1.382 1.131 1.508 1.275.126.143.655 1.393.622 1.847-.03.408.078.785.376 1.077.236.231.529.394.785.603.537.437.836 1.058.811 1.752-.036 1.023-.027 1.601.034 1.712.032.057.071.09.055-.015-.027-.173.043-.565.386-.937.233-.253.609-.303.841-.556.273-.296.309-.762.442-1.126.202-.555.59-1.028.79-1.587.285-.797-.193-1.165-.802-1.558-.757-.489-1.498-.747-2.411-.752-.464-.002-1.114.319-1.525.008-.976-.739-.551-2.377.53-2.418.522-.02 1.071-.064 1.436-.49.432-.504.921-.096.935-.088.177.14.008-.007.001-.024-.047-.098-.293-.67-.289-.93.013-.785-.172-1.563-.372-2.317' />
		</Icon>
	);
};

GlobeIcon.displayName = 'GlobeIcon';

GlobeIcon.propTypes = iconPropTypes;

GlobeIcon.defaultProps = Icon.defaultProps;

export default GlobeIcon;
