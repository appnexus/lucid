import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import SlidePanel from '../SlidePanel/SlidePanel';

const cx = lucidClassNames.bind('&-InfiniteSlidePanel');

const { func, node, number, oneOfType, string } = PropTypes;

const modulo = (n, a) => a - n * Math.floor(a / n);

/** {"categories": ["helpers"], "madeFrom": ["SlidePanel"]}
 *
 * A container for rendering an infinite set of horizontal slides. Translation
 * between slides is controlled by passing in a new `offset`.  Can hook into
 * touch events to update the `offset`. This component is made from SlidePanel,
 * so it accepts the same props.
 */
const InfiniteSlidePanel = createClass({
	displayName: 'InfiniteSlidePanel',
	_isPrivate: true,

	components: {
		Slide: createClass({
			displayName: 'InfiniteSlidePanel.Slide',
			propName: 'Slide',
		}),
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,

		/**
		 * The only allowed child is a render function which is passed the current
		 * slide's offset and returns the slide contents:
		 *   `(slideOffset) => { //returns React.PropTypes.node }`
		 * Alternatively, you could pass one <InfiniteSlidePanel.Slide {...}>
		 * element with the render function. The only reason do to the latter is to
		 * pass addiontal props to the slide element.
		 */
		children: oneOfType([node, func]),

		/**
		 * The offset of the left-most rendered slide.
		 */
		offset: number,

		/**
		 * Max number of viewable slides to show simultaneously.
		 */
		slidesToShow: number,

		/**
		 * Called when a user's swipe would change the offset. Callback passes
		 * number of slides by the user (positive for forward swipes, negative for
		 * backwards swipes).
		 *
		 * Signature: `(slidesSwiped, { event, props }) => {}`
		 */
		onSwipe: func,

		/**
		 * The number of slides rendered at any given time. A good rule-of-thumb is
		 * that this should be at least 4 times the `slidesToShow` value.
		 */
		totalSlides: number,
	},

	getDefaultProps() {
		return {
			offset: 0,
			slidesToShow: 1,
			onSwipe: _.noop,
			totalSlides: 8,
		};
	},

	render: function() {
		const {
			children,
			className,
			offset,
			slidesToShow,
			onSwipe,
			totalSlides,
			...passThroughs
		} = this.props;

		const slide = getFirst(
			this.props,
			InfiniteSlidePanel.Slide,
			<InfiniteSlidePanel.Slide>{children}</InfiniteSlidePanel.Slide>
		);
		const slideChildRenderFunction = slide.props.children;
		if (!_.isFunction(slideChildRenderFunction)) {
			throw new Error(
				'InfiniteSlidePanel children must be a single function `(slideOffset) => { /* returns React.PropTypes.node */ }`'
			);
		}

		const halfSlides = Math.floor(totalSlides / 2);
		const circularOffset = modulo(totalSlides, offset);
		const forwardSlideOffsets = _.times(
			totalSlides - halfSlides,
			n => offset + n
		);
		const backwardSlideOffsets = _.times(
			halfSlides,
			n => offset + n - halfSlides
		);
		const transposedSlideOffsets = forwardSlideOffsets.concat(
			backwardSlideOffsets
		);
		const slideOffsetArray = _.takeRight(
			transposedSlideOffsets,
			circularOffset
		).concat(_.take(transposedSlideOffsets, totalSlides - circularOffset));

		return (
			<SlidePanel
				{...omitProps(passThroughs, InfiniteSlidePanel, [], false)}
				className={cx('&', className)}
				offset={offset}
				slidesToShow={slidesToShow}
				onSwipe={onSwipe}
				isLooped
			>
				{_.map(slideOffsetArray, (slideOffset, elementOffset) => (
					<SlidePanel.Slide
						key={elementOffset}
						{...slide.props}
						className={cx(
							{
								'&-Slide-in-frame': slideOffset - offset < slidesToShow &&
									slideOffset - offset >= 0,
							},
							slide.props.className
						)}
					>
						{slideChildRenderFunction(slideOffset)}
					</SlidePanel.Slide>
				))}
			</SlidePanel>
		);
	},
});

export default InfiniteSlidePanel;
