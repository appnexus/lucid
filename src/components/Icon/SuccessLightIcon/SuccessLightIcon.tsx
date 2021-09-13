import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-SuccessLightIcon');

export interface ISuccessLightIconProps extends IIconProps {
	/** Controls the active state of the Icon. Basically toggles the same "look n
		feel" as when you hover. */
	isActive?: boolean;
}

export const successLightIconPropTypes = {
	/** Controls the active state of the Icon. Basically toggles the same "look n
		feel" as when you hover. */
	isActive: PropTypes.bool,

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

export const SuccessLightIcon = ({
	className,
	isActive,
	isClickable,
	isDisabled,
	...passThroughs
}: ISuccessLightIconProps) => {
	return (
		<Icon
			{..._.omit(passThroughs, ['initialState', 'color'])}
			isClickable={isClickable}
			isDisabled={isDisabled}
			className={cx(
				'&',
				isDisabled && '&-is-disabled',
				isClickable && '&-is-clickable',
				isActive && '&-is-active',
				className
			)}
		>
			<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
			<path className={cx('&-check')} d='M4.5 8L7 10.5 11.5 6' />
		</Icon>
	);
};

SuccessLightIcon.displayName = 'SuccessLightIcon';

SuccessLightIcon.propTypes = successLightIconPropTypes;

SuccessLightIcon.defaultProps = Icon.defaultProps;

export default SuccessLightIcon;
