import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import { getAbsoluteBoundingClientRect } from '../../util/dom-helpers';

const cx = lucidClassNames.bind('&-StickySection');
const { node, number, object, string } = PropTypes;

/**
 * {"categories": ["helpers"]}
 *
 * `StickySection` can be wrapped around any content to make it _stick_ to the
 * top edge of the screen when a user scrolls beyond its initial location.
 */
const StickySection = createClass({
	displayName: 'StickySection',
	propTypes: {
		/**
		 * any valid React children
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Styles that are passed through to the root container.
		 */
		style: object,
		/**
		 * Pixel value from the top of the document. When scrolled passed, the
		 * sticky header is no longer sticky, and renders normally.
		 */
		lowerBound: number,
		/**
		 * Width of section when it sticks to the top edge of the screen. When
		 * omitted, it defaults to the last width of the section.
		 */
		viewportWidth: number,
	},

	getInitialState() {
		return {
			isAboveFold: false,
			containerRect: {},
		};
	},

	handleScroll() {
		const { lowerBound } = this.props;

		const { isAboveFold, containerRect } = this.state;

		const nextContainerRect = this.getContainerRect();

		if (window.pageYOffset >= nextContainerRect.top) {
			if (!isAboveFold) {
				this.setState({
					isAboveFold: true,
				});
			}
		} else {
			if (isAboveFold) {
				this.setState({
					isAboveFold: false,
				});
			}
		}

		if (_.isNumber(lowerBound) && window.pageYOffset >= lowerBound) {
			this.setState({
				isAboveFold: false,
			});
		}

		if (
			containerRect.bottom !== nextContainerRect.bottom ||
			containerRect.height !== nextContainerRect.height ||
			containerRect.left !== nextContainerRect.left ||
			containerRect.right !== nextContainerRect.right ||
			containerRect.top !== nextContainerRect.top ||
			containerRect.width !== nextContainerRect.width ||
			containerRect.scrollWidth !== nextContainerRect.scrollWidth ||
			containerRect.frameLeft !== nextContainerRect.frameLeft
		) {
			this.setState({
				containerRect: nextContainerRect,
			});
		}
	},

	getContainerRect() {
		const containerRect = getAbsoluteBoundingClientRect(
			this.refs.scrollContainer
		);
		const stickyRect = this.refs.stickySection.getBoundingClientRect();
		const frameRect = this.refs.stickyFrame.getBoundingClientRect();

		return {
			bottom: containerRect.top + stickyRect.height,
			height: stickyRect.height,
			left: containerRect.left,
			right: containerRect.left + stickyRect.width,
			top: containerRect.top,
			scrollWidth: this.refs.stickySection.scrollWidth,
			width: containerRect.width,
			frameLeft: frameRect.left,
		};
	},

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				containerRect: this.getContainerRect(),
			});
			this.handleScroll();
		}, 1);
		window.addEventListener('scroll', this.handleScroll, true);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll, true);
	},

	render() {
		const {
			children,
			className,
			style,
			viewportWidth,
			...passThroughs
		} = this.props;

		const { isAboveFold, containerRect } = this.state;

		return (
			<div
				{...omitProps(passThroughs, StickySection)}
				className={cx('&', className)}
				style={{
					...(isAboveFold
						? {
								height: containerRect.height,
							}
						: {}),
					...style,
				}}
				ref="scrollContainer"
			>
				<div
					className={cx('&-sticky-frame')}
					ref="stickyFrame"
					style={{
						...(isAboveFold
							? {
									position: 'fixed',
									top: 0,
									width: _.isNumber(viewportWidth)
										? viewportWidth
										: containerRect.width,
									height: containerRect.height,
									overflow: 'hidden',
								}
							: {}),
						...style,
					}}
				>
					<div
						className={cx('&-sticky-section')}
						ref="stickySection"
						style={{
							...(isAboveFold
								? {
										position: 'absolute',
										top: 0,
										left: containerRect.left - containerRect.frameLeft || 0,
										width: containerRect.scrollWidth,
										height: containerRect.height,
									}
								: {
										position: 'relative',
									}),
							...style,
						}}
					>
						{children}
					</div>
				</div>
			</div>
		);
	},
});

export default StickySection;
