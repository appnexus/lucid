import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { lucidClassNames } from '../../util/style-helpers';
import {
	FC,
	omitProps,
	StandardProps,
	FixDefaults,
} from '../../util/component-types';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
import { IIconProps } from '../Icon/Icon';

const cx = lucidClassNames.bind('&-Banner');

const { bool, element, func, node, oneOf, string } = PropTypes;

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
	onClose?: ({
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

const Banner: FC<IBannerProps> = (props): React.ReactElement => {
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
	} = props as FixDefaults<IBannerProps, typeof defaultProps>;

	const handleClose = ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IIconProps;
	}): void => {
		onClose({ event, props });
	};

	let displayedIcon = null;

	if (icon) {
		displayedIcon = icon;
	}

	return (
		<ReactTransitionGroup
			transitionName={cx('&')}
			transitionEnterTimeout={300}
			transitionLeaveTimeout={300}
		>
			{!isClosed ? (
				<section
					{...omitProps(passThroughs, undefined, _.keys(Banner.propTypes))}
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
			) : null}
		</ReactTransitionGroup>
	);
};

Banner.defaultProps = defaultProps;
Banner.displayName = 'Banner';
Banner.peek = {
	description: `
		A basic Banner. Any props that are not explicitly called out below will
		be passed through to the native \`Banner\` component.

		Short single line content can be passed in as a simple string. Multi
		line messages should be passed wrapped in a \`<p>\` tag.

		It is valid to use \`strong\` or \`em\` within a \`Banner\` message.
	`,
	categories: ['communication'],
};
Banner.propTypes = {
	icon: element`
		Pass in a icon component for custom icons within \`Banner\`.
	`,

	isCloseable: bool`
		Set this to \`true\` if you want to have a \`x\` close icon.
	`,

	isFilled: bool`
		Defaults to true.
		If set to \`false\` the banner will not be filled in.
	`,

	isSmall: bool`
		If set to \`true\` the banner have smaller padding on the inside.
	`,

	className: string`
		Class names that are appended to the defaults.
	`,

	children: node`
		Any valid React children.
	`,

	kind: oneOf(['primary', 'success', 'warning', 'danger', 'info', 'default'])`
		Style variations of the \`Banner\`.
	`,

	onClose: func`
		Called when the user closes the \`Banner\`.  Signature:
		\`({ event, props }) => {}\`
	`,

	isClosed: bool`
		Controls the visibility of the \`Banner\`.
	`,
};

export default Banner;
