import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const { node, string, oneOf, oneOfType, number } = PropTypes;

const cx = lucidClassNames.bind('&-NotchedTag');

const TAG_STYLE_ONE = 'style-one';
const TAG_STYLE_TWO = 'style-two';
const TAG_STYLE_THREE = 'style-three';
const TAG_STYLES = [TAG_STYLE_ONE, TAG_STYLE_TWO, TAG_STYLE_THREE];

const TYPE_FILLED = 'filled';
const TYPE_STROKE = 'stroke';
const TYPES = [TYPE_FILLED, TYPE_STROKE];

const NOTCH_HEIGHT_LARGE = 5;
const NOTCH_HEIGHT_SMALL = 4;

const SIZE_LARGE = 'large';
const SIZE_SMALL = 'small';
const SIZES = [SIZE_LARGE, SIZE_SMALL];

const SIZE_DIMENSION_MAP = {
	[SIZE_LARGE]: {
		height: '24px',
		width: '40px',
	},
	[SIZE_SMALL]: {
		height: '18px',
		width: '30px',
	},
};

const SIZE_NOTCH_MAP = {
	[SIZE_LARGE]: NOTCH_HEIGHT_LARGE,
	[SIZE_SMALL]: NOTCH_HEIGHT_SMALL,
};

const STROKE_SIZE = '2px';

const NotchedTag = createClass({
	displayName: 'NotchedTag',

	statics: {
		peek: {
			description: `
				A tag with a notched edge. 
			`,
			categories: ['visual design'],
		},
	},

	propTypes: {
		children: node`
			Any valid React children.
		`,
		className: string,
		type: oneOf(TYPES)`
			Style variations.
		`,
		size: oneOf(SIZES),
		tagStyle: oneOf(TAG_STYLES),
	},

	getDefaultProps() {
		return {
			size: SIZE_LARGE,
			tagStyle: TAG_STYLE_ONE,
		};
	},

	render() {
		const {
			children,
			className,
			type,
			style,
			size,
			tagStyle,
			...passThroughs
		} = this.props;

		const notchHeight = SIZE_NOTCH_MAP[size];
		const notchWidth = notchHeight * Math.sqrt(3); //we want to maintain a 60 degree slice (30,60,90 triangle)

		//clips off a corner of the element to create the notched effect
		const slicePolygon = `
			polygon(
				${notchHeight}px 0,
				100% 0,
				100% 100%,
				0 100%,
				0 ${notchWidth}px
			)`;

		//used for creating an inset element to create a stroke effect (instead of fill)
		const sliceInnerPolygon = `
			polygon(
				${notchHeight - 1}px 0,
				100% 0,
				100% 100%,
				0 100%,
				0 ${notchWidth - 1}px
			)`;

		return (
			<div
				className={cx(
					'&',
					className,
					tagStyle,
					size,
					type === TYPE_FILLED ? 'no-border' : ''
				)}
				{...passThroughs}
				style={{
					...style,
					...SIZE_DIMENSION_MAP[size],
					clipPath: slicePolygon,
				}}
			>
				<div
					className={cx(
						'&-container',
						type === TYPE_FILLED ? '&-container-filled' : ''
					)}
					style={{
						top: STROKE_SIZE,
						right: STROKE_SIZE,
						left: STROKE_SIZE,
						bottom: STROKE_SIZE,
						clipPath: sliceInnerPolygon,
					}}
				>
					<div className={cx('&-container-centered')}>{children}</div>
				</div>
			</div>
		);
	},
});

export default NotchedTag;
