import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const cx = lucidClassNames.bind('&-EligibilityLightIcon');

export type EligibilityOptions = 'left' | 'right' | 'neither' | 'both';

export interface IEligibilityLightIconProps extends IIconProps {
	eligibility?: EligibilityOptions;
}

export const iconPropTypes = {
	/** Valid eligibility options for the Icon. */
	eligibility: PropTypes.oneOf(['left', 'right', 'neither', 'both']),

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

export const EligibilityLightIcon = ({
	className,
	eligibility = 'neither',
	isDisabled = false,
	...passThroughs
}: IEligibilityLightIconProps) => {
	return (
		<Icon
			// As color is fixed for this icon, editing the color prop is disallowed
			{..._.omit(passThroughs, ['initialState'])}
			isDisabled={isDisabled}
			className={cx('&', className)}
		>
			<g>
				<path
					className={cx('&-half-circle', {
						'&-is-selected': eligibility === 'left' || eligibility === 'both',
						'&-half-circle-is-disabled': isDisabled,
					})}
					d='M6 14.71A7.003 7.003 0 0 1 6 1.29v13.42z'
				/>
				<path
					className={cx('&-half-circle', {
						'&-is-selected': eligibility === 'right' || eligibility === 'both',
						'&-half-circle-is-disabled': isDisabled,
					})}
					d='M10 1.29a7.003 7.003 0 0 1 0 13.42V1.29z'
				/>
			</g>
		</Icon>
	);
};

EligibilityLightIcon.displayName = 'EligibilityLightIcon';

EligibilityLightIcon.propTypes = iconPropTypes;

EligibilityLightIcon.defaultProps = Icon.defaultProps;

export default EligibilityLightIcon;
