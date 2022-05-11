import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring, PlainStyle } from 'react-motion';

import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';
import { lucidClassNames } from '../../util/style-helpers';
import { shiftChildren } from '../../util/dom-helpers';
import { findTypes, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-SlidePanel');

const { bool, func, node, number, string, any } = PropTypes;

const modulo = (n: number, a: number): number => a - n * Math.floor(a / n);

/** Slide Panel Slide */
export interface ISlidePanelSlideProps extends StandardProps {
	description?: string;
}
class SlidePanelSlide extends React.Component<ISlidePanelSlideProps, {}, {}> {
	static displayName = 'SlidePanel.Slide';
	static propName = 'Slide';

	render(): null {
		return null;
	}
}

/** Slide Panel */
export interface ISlidePanelProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Max number of viewable slides to show simultaneously. */
	slidesToShow: number;

	/** The offset of the left-most rendered slide. */
	offset: number;

	/** Animate slides transitions from changes in `offset`. */
	isAnimated: boolean;

	/** Slides are rendered in a continuous loop, where the first slide repeats
	 * after the last slide and vice-versa. DOM elements are re-ordered and
	 * re-used. */
	isLooped: boolean;

	/** Called when a user's swipe would change the offset. Callback passes
	 * number of slides by the user (positive for forward swipes, negative for
	 * backwards swipes). */
	onSwipe: (
		slidesSwiped: number,
		{ event, props }: { event: React.TouchEvent; props: ISlidePanelProps }
	) => void;
}

const nonPassThroughs = [
	'className',
	'children',
	'Slide',
	'slidesToShow',
	'offset',
	'isAnimated',
	'isLooped',
	'onSwipe',
	'initialState',
	'callbackId',
];
interface ISlidePanelState {
	translateXPixel: number;
	startX: number;
	isDragging: boolean;
	isAnimated: boolean;
}

class SlidePanel extends React.Component<
	ISlidePanelProps,
	ISlidePanelState,
	{}
> {
	static _isPrivate = true;
	static displayName = 'SlidePanel';
	static peek = {
		description: `A container for rendering a set of horizontal slides at at a particular offset. Translation between slides is controlled by passing in a new \`offset\`.  Can hook into touch events to update the \`offset\`.`,
		categories: ['helpers'],
	};
	static propTypes = {
		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			SlidePanel.Slide elements are passed in as children.
		*/
		children: node,

		/**
			This is the child component that will be displayed inside the SlidePanel.
		*/
		Slide: any,

		/**
			Max number of viewable slides to show simultaneously.
		*/
		slidesToShow: number,

		/**
			The offset of the left-most rendered slide.
		*/
		offset: number,

		/**
			Animate slides transitions from changes in \`offset\`.
		*/
		isAnimated: bool,

		/**
			Slides are rendered in a continuous loop, where the first slide repeats
			after the last slide and vice-versa. DOM elements are re-ordered and
			re-used.
		*/
		isLooped: bool,

		/**
			Called when a user's swipe would change the offset. Callback passes
			number of slides by the user (positive for forward swipes, negative for
			backwards swipes).  Signature: \`(slidesSwiped, { event, props }) => {}\`
		*/
		onSwipe: func,
	};

	private rootHTMLDivElement = React.createRef<HTMLDivElement>();
	private slideStrip = React.createRef<HTMLDivElement>();

	static Slide = SlidePanelSlide;

	offsetTranslate = this.props.isLooped
		? Math.floor(_.size(findTypes(this.props, SlidePanel.Slide)) / 2)
		: 0;

	state = {
		translateXPixel: 0,
		startX: 0,
		isAnimated: this.props.isAnimated as boolean,
		isDragging: false,
	};

	static defaultProps = {
		slidesToShow: 1,
		offset: 0,
		isAnimated: true,
		onSwipe: _.noop,
		isLooped: false,
	};

	handleTouchStart = (event: React.TouchEvent): void => {
		this.setState({
			startX: event.touches[0].screenX,
			isAnimated: false,
			isDragging: true,
		});
	};

	handleTouchMove = (event: React.TouchEvent): void => {
		const dX = event.touches[0].screenX - this.state.startX;
		this.setState({
			translateXPixel: dX,
		});
	};

	handleTouchEnd = (event: React.TouchEvent): void => {
		const dX = event.changedTouches[0].screenX - this.state.startX;
		const slideWidth =
			(this.rootHTMLDivElement.current as HTMLElement).getBoundingClientRect()
				.width / (this.props.slidesToShow as number);
		const slidesSwiped = Math.round(dX / slideWidth);

		if (slidesSwiped !== 0) {
			(
				this.props.onSwipe as (
					slidesSwiped: number,
					{ event, props }: { event: React.TouchEvent; props: ISlidePanelProps }
				) => void
			)(-1 * slidesSwiped, { event, props: this.props });
		}
		this.setState({
			translateXPixel: 0,
			isDragging: false,
			isAnimated: this.props.isAnimated as boolean,
		});
	};

	componentDidMount(): void {
		const slides = findTypes(this.props, SlidePanel.Slide);
		if (this.props.isLooped) {
			shiftChildren(
				this.slideStrip.current as HTMLElement,
				Math.floor(_.size(slides) / 2)
			);
		}
	}

	componentDidUpdate(
		prevProps: ISlidePanelProps,
		prevState: ISlidePanelState
	): void {
		const slides = findTypes(this.props, SlidePanel.Slide);
		const offsetDiff =
			(this.props.offset as number) - (prevProps.offset as number);
		if (offsetDiff !== 0 && this.props.isLooped) {
			this.offsetTranslate = modulo(
				_.size(slides),
				this.offsetTranslate - offsetDiff
			);

			_.delay((): void => {
				shiftChildren(this.slideStrip.current as HTMLElement, -offsetDiff);
				this.setState(
					{
						isAnimated: false,
					},
					(): void => {
						this.forceUpdate();
						this.setState({
							isAnimated: this.props.isAnimated as boolean,
						});
					}
				);
			}, 200);
		}
	}

	render(): React.ReactNode {
		const {
			className,
			slidesToShow,
			offset: realOffset,
			isLooped,
			...passThroughs
		} = this.props;
		const offset = (realOffset as number) + this.offsetTranslate;

		const slides = findTypes(this.props, SlidePanel.Slide);
		const translateXPercentage =
			-1 *
			(100 / (slidesToShow as number)) *
			(isLooped ? modulo(_.size(slides), offset) : offset);

		return (
			<div
				{...omit(passThroughs, nonPassThroughs)}
				ref={this.rootHTMLDivElement}
				className={cx('&', className)}
			>
				<Motion
					style={
						this.state.isAnimated
							? {
									translateXPercentage: spring(
										translateXPercentage,
										QUICK_SLIDE_MOTION
									),
									translateXPixel: spring(
										this.state.translateXPixel,
										QUICK_SLIDE_MOTION
									),
							  }
							: {
									translateXPercentage: translateXPercentage,
									translateXPixel: this.state.translateXPixel,
							  }
					}
				>
					{(tween: PlainStyle): JSX.Element => (
						<div
							{...omit(passThroughs, nonPassThroughs)}
							className={cx('&-slidestrip', className)}
							style={{
								transform: this.state.isDragging
									? `translateX(calc(${tween.translateXPercentage}% + ${this.state.translateXPixel}px))`
									: `translateX(calc(${tween.translateXPercentage}% + ${tween.translateXPixel}px))`,
							}}
							ref={this.slideStrip}
							onTouchStart={this.handleTouchStart}
							onTouchMove={this.handleTouchMove}
							onTouchEnd={this.handleTouchEnd}
							onTouchCancel={_.noop}
						>
							{_.map(
								slides,
								(slide: React.ReactElement, offset): React.ReactNode => (
									<div
										key={offset}
										{...slide.props}
										className={cx('&-Slide', slide.props.className)}
										style={{
											flexGrow: 1,
											flexShrink: 0,
											flexBasis: `${100 / (slidesToShow as number)}%`,
											...slide.props.style,
										}}
									/>
								)
							)}
						</div>
					)}
				</Motion>
			</div>
		);
	}
}

export default SlidePanel;
