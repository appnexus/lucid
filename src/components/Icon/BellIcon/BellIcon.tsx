import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { Overwrite } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BellIcon');

interface IBellIconPropsRaw extends IIconProps {
	/** Show or hide a dot on the bell to indicate a notification. */
	hasDot?: boolean;

	/** Featured color of the dot */
	featuredColor?: 'info' | 'success' | 'warning' | 'danger';
}

export type IBellIconProps = Overwrite<
	React.SVGAttributes<SVGGElement>,
	IBellIconPropsRaw
>;

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

	/** Show or hide a dot on the bell to indicate a notification. */
	hasDot: PropTypes.bool,

	/** Featured color of the dot */
	featuredColor: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
};

export const BellIcon = ({
	className,
	featuredColor = 'info',
	hasDot = false,
	...passThroughs
}: IBellIconProps) => {
	const showBellDot = hasDot;

	return (
		<Icon
			{..._.omit(passThroughs, ['initialState'])}
			className={cx('&', className)}
		>
			{showBellDot ? (
				<g>
					<path
						strokeLinecap='butt'
						d='M5.5 12.502v.5c0 1.381 1.119 2.5 2.5 2.5s2.5-1.119 2.5-2.5l.003-.495M3.056 7.432c-.54 2.214-1.556 3.07-1.556 3.07v2h13v-2s-1.884-1.587-1.884-6.024c0-.901-.909-3.976-4.616-3.976-.279 0-.543.017-.791.05'
					/>
					<path
						className={cx(
							'&',
							{
								'&-is-info': featuredColor === 'info',
								'&-is-success': featuredColor === 'success',
								'&-is-warning': featuredColor === 'warning',
								'&-is-danger': featuredColor === 'danger',
							},
							className
						)}
						d='M3.5-.148c1.737 0 3.15 1.413 3.15 3.15s-1.413 3.15-3.15 3.15S.35 4.739.35 3.002 1.763-.148 3.5-.148'
					/>
				</g>
			) : (
				<g>
					<path d='M5.5 12.5v.5a2.5 2.5 0 1 0 5 0l.003-.495M14.5 12.5v-2s-1.884-1.587-1.884-6.024C12.616 3.575 11.707.5 8 .5S3.384 3.575 3.384 4.476C3.384 8.913 1.5 10.5 1.5 10.5v2h13z' />
				</g>
			)}
		</Icon>
	);
};

BellIcon.displayName = 'BellIcon';
BellIcon.peek = {
	description: `Typically used for notifications. The dot indicates that there is an unread message.`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};

BellIcon.propTypes = iconPropTypes;

BellIcon.defaultProps = Icon.defaultProps;

export default BellIcon;
