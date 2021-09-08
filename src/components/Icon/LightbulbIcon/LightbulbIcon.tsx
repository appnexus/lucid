import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-LightbulbIcon');

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

export const LightbulbIcon = ({ className, ...passThroughs }: IIconProps) => {
	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			className={cx('&', className)}
		>
			<path d='M10 13.5H6M9 15.5H7' />
			<path
				id='a_1_'
				d='M10 11.5h0c0-.788.617-1.562.995-1.845l.095-.075c1.261-.946 1.986-2.427 1.986-4.004C13.076 2.801 10.806.5 8 .5S2.924 2.801 2.924 5.576c0 1.576.725 3.058 1.986 4.004l.095.075C5.383 9.939 6 10.712 6 11.5h4z'
				fillRule='evenodd'
				clipRule='evenodd'
				fill='none'
			/>
			<path d='M8 11.474V6M7 6h2' />
		</Icon>
	);
};

LightbulbIcon.displayName = 'LightbulbIcon';

LightbulbIcon.propTypes = iconPropTypes;

LightbulbIcon.defaultProps = Icon.defaultProps;

export default LightbulbIcon;
