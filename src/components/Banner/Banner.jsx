import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';

const cx = lucidClassNames.bind('&-Banner');

const { bool, element, func, node, oneOf, string } = PropTypes;

const Banner = createClass({
	displayName: 'Banner',

	statics: {
		peek: {
			description: `
				A basic Banner. Any props that are not explicitly called out below will
				be passed through to the native \`Banner\` component.

				Short single line content can be passed in as a simple string. Multi
				line messages should be passed wrapped in a \`<p>\` tag.

				It is valid to use \`strong\` or \`em\` within a \`Banner\` message.
			`,
			categories: ['communication'],
		},
	},

	propTypes: {
		icon: element`
			Pass in a icon component for custom icons within \`Banner\`.
		`,

		isCloseable: bool`
			Set this to \`true\` if you want to have a \`x\` close icon.
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
	},

	getDefaultProps() {
		return {
			icon: null,
			isCloseable: true,
			isSmall: false,
			kind: 'default',
			onClose: _.noop,
		};
	},

	handleClose(event) {
		const { onClose } = this.props;

		onClose({ event, props: this.props });
	},

	render() {
		const {
			icon,
			kind,
			className,
			children,
			isCloseable,
			isClosed,
			isSmall,
			...passThroughs
		} = this.props;

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
						{...omitProps(passThroughs, Banner)}
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
								onClick={this.handleClose}
							/>
						) : null}
					</section>
				) : null}
			</ReactTransitionGroup>
		);
	},
});

export default Banner;
