import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import { getAbsoluteBoundingClientRect } from '../../util/dom-helpers';

const cx = lucidClassNames.bind('&-StickySection');
const { node, number, object, string } = PropTypes;

export interface IStickySectionProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Pixel value from the top of the document. When scrolled passed, the
	 * sticky header is no longer sticky, and renders normally. */
	lowerBound?: number;

	/** Width of section when it sticks to the top edge of the screen. When
	 * omitted, it defaults to the last width of the section. */
	viewportWidth?: number;

	/** Top offset threshold before sticking to the top. The sticky content will
	 * display with this offset. */
	topOffset?: number;
}

interface IContainerRect extends Omit<ClientRect, 'x' | 'y' | 'toJSON'> {
	scrollWidth: number;
	frameLeft: number;
}

interface IStickySectionState {
	isAboveFold: boolean;
	containerRect: IContainerRect;
}

class StickySection extends React.Component<
	IStickySectionProps,
	IStickySectionState,
	{}
> {
	static displayName = 'StickySection';

	static peek = {
		description: `\`StickySection\` can be wrapped around any content to make it _stick_ to the top edge of the screen when a user scrolls beyond its initial location.`,
		categories: ['helpers'],
	};

	static propTypes = {
		/**
			any valid React children
		*/
		children: node,
		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,
		/**
			Styles that are passed through to the root container.
		*/
		style: object,
		/**
			Pixel value from the top of the document. When scrolled passed, the
			sticky header is no longer sticky, and renders normally.
		*/
		lowerBound: number,
		/**
			Top offset threshold before sticking to the top. The sticky content will
			display with this offset.
		*/
		topOffset: number,
	};

	private scrollContainer = React.createRef<HTMLDivElement>();
	private stickySection = React.createRef<HTMLDivElement>();
	private stickyFrame = React.createRef<HTMLDivElement>();

	state = {
		isAboveFold: false,
		containerRect: {
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0,
			frameLeft: 0,
			scrollWidth: 0,
		},
	};

	handleScroll = (): void => {
		const { lowerBound, topOffset = 0 } = this.props;

		const { isAboveFold, containerRect } = this.state;

		const nextContainerRect = this.getContainerRect();

		if (window.pageYOffset + topOffset >= nextContainerRect.top) {
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
	};

	getContainerRect = (): IContainerRect => {
		const containerRect = getAbsoluteBoundingClientRect(
			this.scrollContainer.current as HTMLElement
		);
		const stickyRect = (
			this.stickySection.current as HTMLElement
		).getBoundingClientRect();
		const frameRect = (
			this.stickyFrame.current as HTMLElement
		).getBoundingClientRect();

		return {
			bottom: containerRect.top + stickyRect.height,
			height: stickyRect.height,
			left: containerRect.left,
			right: containerRect.left + stickyRect.width,
			top: containerRect.top,
			scrollWidth: (this.stickySection.current as HTMLElement).scrollWidth,
			width: containerRect.width,
			frameLeft: frameRect.left,
		};
	};

	componentDidMount(): void {
		setTimeout((): void => {
			this.setState({
				containerRect: this.getContainerRect(),
			});
			this.handleScroll();
		}, 1);
		window.addEventListener('scroll', this.handleScroll, true);
	}

	componentWillUnmount(): void {
		window.removeEventListener('scroll', this.handleScroll, true);
	}

	render(): React.ReactNode {
		const {
			children,
			className,
			style,
			topOffset = 0,
			viewportWidth,
			...passThroughs
		} = this.props;

		const { isAboveFold, containerRect } = this.state;

		return (
			<div
				{...omit(passThroughs, [
					'lowerBound',
					'topOffset',
					'initialState',
					'callbackId',
				])}
				className={cx('&', className)}
				style={{
					...(isAboveFold
						? {
								height: containerRect.height,
								visibility: 'hidden',
						  }
						: {}),
					...style,
				}}
				ref={this.scrollContainer}
			>
				<div
					className={cx('&-sticky-frame')}
					ref={this.stickyFrame}
					style={{
						...(isAboveFold
							? {
									visibility: 'visible',
									position: 'fixed',
									top: topOffset,
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
						ref={this.stickySection}
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
	}
}

export default StickySection;
