import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
import { IIconProps } from '../Icon/Icon';

const cx = lucidClassNames.bind('&-Banner');

const bannerPropTypes = {
	/** Pass in a icon component for custom icons within `Banner`. */
	icon: PropTypes.element,

	/** Set this to `true` if you want to have a `x` close icon. */
	isCloseable: PropTypes.bool,

	/** Defaults to `true`. If set to `false` the banner will not be filled in. */
	isFilled: PropTypes.bool,

	/** If set to `true` the banner have smaller padding on the inside. */
	isSmall: PropTypes.bool,

	/** Class names that are appended to the defaults. */
	className: PropTypes.string,

	/** Any valid React children. */
	children: PropTypes.node,

	/** Style variations of the `Banner`. */
	kind: PropTypes.oneOf([
		'primary',
		'success',
		'warning',
		'danger',
		'info',
		'default',
	]),

	/** Called when the user closes the `Banner`.  Signature: `({ event, props }) => {}` */
	onClose: PropTypes.func,

	/** Controls the visibility of the `Banner`. */
	isClosed: PropTypes.bool,
};

export interface IBannerProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Pass in a icon component for custom icons within `Banner`. */
	icon?: React.ReactElement | null;

	/** Set this to `true` if you want to have a `x` close icon. */
	isCloseable?: boolean;

	/** If set to `false` the banner will not be filled in.
	 * @default = true
	 */
	isFilled?: boolean;

	/** If set to `true` the banner have smaller padding on the inside. */
	isSmall?: boolean;

	/** Style variations of the `Banner`. */
	kind?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

	/** Called when the user closes the `Banner`. */
	onClose: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IIconProps;
	}) => void;

	/** Controls the visibility of the `Banner`. */
	isClosed?: boolean;
}

const defaultProps = {
	icon: null,
	isCloseable: true,
	isFilled: true,
	isSmall: false,
	kind: 'default' as const,
	onClose: _.noop,
	isClosed: false,
};

export const Banner = (props: IBannerProps): React.ReactElement => {
	const {
		icon,
		kind,
		className,
		children,
		isCloseable,
		isClosed,
		isFilled,
		isSmall,
		onClose,
		...passThroughs
	} = props;

	const handleClose = ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IIconProps;
	}): void => {
		onClose({ event, props });
	};

	let displayedIcon: any = null;

	if (icon) {
		displayedIcon = icon;
	}

	return (
		<CSSTransition
			in={!isClosed}
			classNames={cx('&')}
			timeout={300}
			unmountOnExit
		>
			<section
				{...(passThroughs as any)}
				className={cx(
					'&',
					{
						'&-has-icon': displayedIcon,
						'&-has-close': isCloseable,
						'&-primary': kind === 'primary',
						'&-success': kind === 'success',
						'&-warning': kind === 'warning',
						'&-danger': kind === 'danger',
						'&-info': kind === 'info',
						'&-small': isSmall,
						'&-filled': isFilled,
					},
					className
				)}
			>
				{displayedIcon ? (
					<span className={cx('&-icon')}>{displayedIcon}</span>
				) : null}

				<span className={cx('&-content')}>{children}</span>

				{isCloseable ? (
					<CloseIcon
						isClickable
						size={8}
						className={cx('&-close')}
						onClick={handleClose}
					/>
				) : null}
			</section>
		</CSSTransition>
	);
};

Banner.defaultProps = defaultProps;
Banner.displayName = 'Banner';
Banner.peek = {
	description: `A banner that displays a prominent message.`,
	notes: {
		overview: `
			A banner that displays a prominent message.
		`,
		intendedUse: `
			Communicates information, success, a warning, or an error.

			**Styling notes**

			- Banners usually display at the top of a page.
			- Use the solid filled banner for single-line content.
			- Use the outlined banner for multi-line content.
			- Color use:
				- Use \`kind:"info"\` (blue) for information, like instructions for a feature.
				- Use \`kind:"success"\` (green) for success messages, like completing a task successfully.
				- Use \`kind:"warning"\` (yellow) for warnings, like a line item that is under-delivering.
				- Use \`kind:"danger"\` (orange) for danger messages, like an error message for missing required content.
				- Use grey banners for new feature announcements.
		`,
		technicalRecommendations: `
			Short single-line content can be passed in as a simple string. Multi-line messages should be passed wrapped in a \`<p>\` tag.
			You can apply styling as needed within a banner, for example using \`strong\`, \`a href\`, or \`em\`.
		`,
	},
	categories: ['communication'],
};
Banner.propTypes = bannerPropTypes;

export default Banner;
