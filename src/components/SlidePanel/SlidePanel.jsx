import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';
import { lucidClassNames } from '../../util/style-helpers';
import { shiftChildren } from '../../util/dom-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-SlidePanel');

const { bool, func, node, number, string } = PropTypes;

const modulo = (n, a) => a - n * Math.floor(a / n);

/**
 * {"categories": ["helpers"]}
 *
 * A container for rendering a set of horizontal slides at at a particular
 * offset. Translation between slides is controlled by passing in a new `offset`.
 * Can hook into touch events to update the `offset`.
 */
const SlidePanel = createClass({
	displayName: 'SlidePanel',
	_isPrivate: true,

	components: {
		Slide: createClass({
			displayName: 'SlidePanel.Slide',
			propName: 'Slide',
		}),
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,

		/**
		 * SlidePanel.Slide elements are passed in as children.
		 */
		children: node,

		/**
		 * Max number of viewable slides to show simultaneously.
		 */
		slidesToShow: number,

		/**
		 * The offset of the left-most rendered slide.
		 */
		offset: number,

		/**
		 * Animate slides transitions from changes in `offset`.
		 */
		isAnimated: bool,

		/**
		 * Slides are rendered in a continuous loop, where the first slide repeats
		 * after the last slide and vice-versa. DOM elements are re-ordered and
		 * re-used.
		 */
		isLooped: bool,

		/**
		 * Called when a user's swipe would change the offset. Callback passes
		 * number of slides by the user (positive for forward swipes, negative for
		 * backwards swipes).
		 *
		 * Signature: `(slidesSwiped, { event, props }) => {}`
		 */
		onSwipe: func,
	},

	getDefaultProps() {
		return {
			slidesToShow: 1,
			offset: 0,
			isAnimated: true,
			onSwipe: _.noop,
			isLooped: false,
		};
	},

	getInitialState() {
		return {
			translateXPixel: 0,
		};
	},

	handleTouchStart(event) {
		this.startX = event.touches[0].screenX;
		this.isAnimated = false;
		this.isDragging = true;
	},

	handleTouchMove(event) {
		const dX = event.touches[0].screenX - this.startX;
		this.setState({
			translateXPixel: dX,
		});
	},

	handleTouchEnd(event) {
		const dX = event.changedTouches[0].screenX - this.startX;
		const slideWidth =
			this.rootNode.getBoundingClientRect().width / this.props.slidesToShow;
		const slidesSwiped = Math.round(dX / slideWidth);

		if (slidesSwiped !== 0) {
			this.props.onSwipe(-1 * slidesSwiped, { event, props: this.props });
		}
		this.setState({
			translateXPixel: 0,
		});
		this.isAnimated = this.props.isAnimated;
		this.isDragging = false;
	},

	componentWillMount() {
		const slides = findTypes(this.props, SlidePanel.Slide);
		this.isAnimated = this.props.isAnimated;
		this.isDragging = false;
		this.offsetTranslate = this.props.isLooped
			? Math.floor(_.size(slides) / 2)
			: 0;
	},

	componentDidMount() {
		const slides = findTypes(this.props, SlidePanel.Slide);
		this.slideStrip = this.rootNode.querySelector(
			'.lucid-SlidePanel-slidestrip'
		);
		if (this.props.isLooped) {
			shiftChildren(this.slideStrip, Math.floor(_.size(slides) / 2));
		}
	},

	componentDidUpdate(prevProps, prevState) {
		const slides = findTypes(this.props, SlidePanel.Slide);
		const offsetDiff = this.props.offset - prevProps.offset;
		if (offsetDiff !== 0) {
			if (this.props.isLooped) {
				this.offsetTranslate = modulo(
					_.size(slides),
					this.offsetTranslate - offsetDiff
				);
				_.delay(() => {
					shiftChildren(this.slideStrip, -offsetDiff);
					this.isAnimated = false;
					this.forceUpdate();
					this.isAnimated = this.props.isAnimated;
				}, 200);
			}
		}
	},

	render: function() {
		const {
			className,
			slidesToShow,
			offset: realOffset,
			isLooped,
			...passThroughs
		} = this.props;
		const offset = realOffset + this.offsetTranslate;

		const slides = findTypes(this.props, SlidePanel.Slide);
		const translateXPercentage =
			-1 *
			(100 / slidesToShow) *
			(isLooped ? modulo(_.size(slides), offset) : offset);

		return (
			<div
				{...omitProps(passThroughs, SlidePanel)}
				ref={domNode => {
					this.rootNode = domNode;
				}}
				className={cx('&', className)}
			>
				<Motion
					style={
						this.isAnimated
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
					{tween => (
						<div
							{...omitProps(passThroughs, SlidePanel)}
							className={cx('&-slidestrip', className)}
							style={{
								transform: this.isDragging
									? `translateX(calc(${tween.translateXPercentage}% + ${this.state.translateXPixel}px))`
									: `translateX(calc(${tween.translateXPercentage}% + ${tween.translateXPixel}px))`,
							}}
							onTouchStart={this.handleTouchStart}
							onTouchMove={this.handleTouchMove}
							onTouchEnd={this.handleTouchEnd}
							onTouchCancel={_.noop}
						>
							{_.map(slides, (slide, offset) => (
								<div
									key={offset}
									{...slide.props}
									className={cx('&-Slide', slide.props.className)}
									style={{
										flexGrow: 1,
										flexShrink: 0,
										flexBasis: `${100 / slidesToShow}%`,
										...slide.props.style,
									}}
								/>
							))}
						</div>
					)}
				</Motion>
			</div>
		);
	},
});

export default SlidePanel;
