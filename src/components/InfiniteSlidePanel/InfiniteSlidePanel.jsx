import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import SlidePanel from '../SlidePanel/SlidePanel';

const cx = lucidClassNames.bind('&-InfiniteSlidePanel');

const {
	func,
	node,
	number,
	oneOfType,
	string,
} = React.PropTypes;

const modulo = (n, a) => (a - (n * Math.floor(a/n)));

/** {"categories": ["helpers"], "madeFrom": ["SlidePanel"]}
 *
 * A container for rendering an infinite set of horizontal slides. Translation
 * between slides is controlled by passing in a new `index`.  Can hook into
 * touch events to update the `index`. This component is made from SlidePanel,
 * so it accepts the same props.
 */
const InfiniteSlidePanel = createClass({ displayName: 'InfiniteSlidePanel',
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
		 * slide's index and returns the slide contents:
		 *   `(slideIndex) => { //returns React.PropTypes.node }`
		 * Alternatively, you could pass one <InfiniteSlidePanel.Slide {...}>
		 * element with the render function. The only reason do to the latter is to
		 * pass addiontal props to the slide element.
		 */
		children: oneOfType([node, func]),

		/**
		 * The zero-index of the left-most rendered slide.
		 */
		index: number,

		/**
		 * Called when a user's swipe would change the index. Callback passes
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
			index: 0,
			onSwipe: _.noop,
			totalSlides: 8,
		};
	},

	render: function() {
		const {
			children,
			className,
			index,
			onSwipe,
			totalSlides,
			...passThroughs
		} = this.props;

		const slide = getFirst(this.props, InfiniteSlidePanel.Slide, <InfiniteSlidePanel.Slide>{children}</InfiniteSlidePanel.Slide>);
		const slideChildRenderFunction = slide.props.children;
		if (!_.isFunction(slideChildRenderFunction)) {
			throw new Error('InfiniteSlidePanel children must be a single function `(slideIndex) => { /* returns React.PropTypes.node */ }`');
		}

		const halfSlides = Math.floor(totalSlides / 2);
		const circularOffset = modulo(totalSlides, index);
		const forwardSlideIndices = _.times(totalSlides - halfSlides, (n) => (index + n));
		const backwardSlideIndices = _.times(halfSlides, (n) => (index + n - halfSlides));
		const transposedSlideIndices = forwardSlideIndices.concat(backwardSlideIndices);
		const slideIndexArray = _.takeRight(transposedSlideIndices, circularOffset).concat(_.take(transposedSlideIndices, totalSlides-circularOffset));

		return (
			<SlidePanel
				{...omitProps(passThroughs, InfiniteSlidePanel)}
				className={cx('&', className)}
				index={index}
				onSwipe={onSwipe}
				isLooped
			>
				{_.map(slideIndexArray, (slideIndex, elementIndex) => (
					<SlidePanel.Slide key={elementIndex} {...slide.props}>{slideChildRenderFunction(slideIndex)}</SlidePanel.Slide>
				))}
			</SlidePanel>
		);
	},
});

export default InfiniteSlidePanel;
