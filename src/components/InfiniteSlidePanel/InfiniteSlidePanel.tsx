import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { Overwrite, getFirst } from '../../util/component-types';
import SlidePanel, {
	ISlidePanelProps,
	ISlidePanelSlideProps,
} from '../SlidePanel/SlidePanel';

const cx = lucidClassNames.bind('&-InfiniteSlidePanel');

const { func, node, number, oneOfType, string } = PropTypes;

const modulo = (n: number, a: number): number => {
	return a - n * Math.floor(a / n);
};

export interface IInfiniteSlidePanelSlideProps extends ISlidePanelSlideProps {}
const InfiniteSlidePanelSlide = (_props: IInfiniteSlidePanelSlideProps): null =>
	null;
InfiniteSlidePanelSlide.displayName = 'InfiniteSlidePanel.Slide';
InfiniteSlidePanelSlide.propName = 'Slide';
InfiniteSlidePanelSlide.peek = { description: `The slide.` };

export interface IInfiniteSlidePanelPropsRaw {
	/**	The only allowed child is a render function which is passed the current
		slide's offset and returns the slide contents. Alternatively, you could pass one
		`<InfiniteSlidePanelSlide {...}>` element with the render function.
		The only reason do to the latter is to pass addiontal props to the slide
		element. */
	children?: React.ReactNode | ((slideOffset: number) => React.ReactNode);

	/** The number of slides rendered at any given time. A good rule-of-thumb is
	that this should be at least 4 times the \`slidesToShow\` value. */
	totalSlides: number;

	/** Animate slides transitions from changes in `offset`. */
	isAnimated: boolean;

	/** Slides are rendered in a continuous loop, where the first slide repeats
	 * after the last slide and vice-versa. DOM elements are re-ordered and
	 * re-used. */
	isLooped: boolean;

	/** Child components of SlidePanel */
	Slide?: React.ReactNode;
}

type IInfiniteSlidePanelProps = Overwrite<
	ISlidePanelProps,
	IInfiniteSlidePanelPropsRaw
>;

const defaultProps = {
	offset: 0,
	slidesToShow: 1,
	onSwipe: _.noop,
	totalSlides: 8,
	isAnimated: SlidePanel.defaultProps.isAnimated,
	isLooped: SlidePanel.defaultProps.isLooped,
};

export const InfiniteSlidePanel = (
	props: IInfiniteSlidePanelProps
): React.ReactElement => {
	const {
		children,
		className,
		offset,
		slidesToShow,
		onSwipe,
		totalSlides,
		...passThroughs
	} = props;

	const slide = getFirst(
		props,
		InfiniteSlidePanel.Slide,
		<InfiniteSlidePanelSlide>{children}</InfiniteSlidePanelSlide>
	) as React.ReactElement;
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
		(n: number): number => offset + n
	);
	const backwardSlideOffsets = _.times(
		halfSlides,
		(n: number): number => offset + n - halfSlides
	);
	const transposedSlideOffsets =
		forwardSlideOffsets.concat(backwardSlideOffsets);
	const slideOffsetArray = _.takeRight(
		transposedSlideOffsets,
		circularOffset
	).concat(_.take(transposedSlideOffsets, totalSlides - circularOffset));

	return (
		<SlidePanel
			{...omit(passThroughs, ['Slide', 'initialState'] as any)}
			className={cx('&', className)}
			offset={offset}
			slidesToShow={slidesToShow}
			onSwipe={onSwipe}
			isLooped
		>
			{_.map(
				slideOffsetArray,
				(slideOffset, elementOffset): React.ReactElement => (
					<SlidePanel.Slide
						key={elementOffset}
						{...slide.props}
						className={cx(
							{
								'&-Slide-in-frame':
									slideOffset - offset < slidesToShow &&
									slideOffset - offset >= 0,
							},
							slide.props.className
						)}
					>
						{slideChildRenderFunction(slideOffset)}
					</SlidePanel.Slide>
				)
			)}
		</SlidePanel>
	);
};

InfiniteSlidePanel.defaultProps = defaultProps;
InfiniteSlidePanel.Slide = InfiniteSlidePanelSlide;
InfiniteSlidePanel._isPrivate = true;
InfiniteSlidePanel.displayName = 'InfiniteSlidePanel';
InfiniteSlidePanel.peek = {
	description: `A container for rendering an infinite set of horizontal slides. Translation between slides is controlled by passing in a new \`offset\`.  Can hook into touch events to update the \`offset\`. This component is made from \`SlidePanel\`, so it accepts the same props.`,
	categories: ['helpers'],
	madeFrom: ['SlidePanel'],
};
InfiniteSlidePanel.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	children: oneOfType([node, func]) /**
		The only allowed child is a render function which is passed the current
		slide's offset and returns the slide contents: \`(slideOffset) => {
		//returns React.PropTypes.node }\` Alternatively, you could pass one
		\`<InfiniteSlidePanel.Slide {...}>\` element with the render function.
		The only reason do to the latter is to pass addiontal props to the slide
		element.
	*/,

	/**
		The offset of the left-most rendered slide.
	*/
	offset: number,

	/**
		Max number of viewable slides to show simultaneously.
	*/
	slidesToShow: number,

	/**
		Called when a user's swipe would change the offset. Callback passes
		number of slides by the user (positive for forward swipes, negative for
		backwards swipes).  Signature: \`(slidesSwiped, { event, props }) => {}\`
	*/
	onSwipe: func,

	/**
		The number of slides rendered at any given time. A good rule-of-thumb is
		that this should be at least 4 times the \`slidesToShow\` value.
	*/
	totalSlides: number,

	/** Child components of SlidePanel */
	Slide: node,
};

export default InfiniteSlidePanel;
