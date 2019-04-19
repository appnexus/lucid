import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const { node, string, oneOf, oneOfType, number } = PropTypes;

const cx = lucidClassNames.bind('&-NotchedTag');

const TYPE_FILLED = 'filled';
const TYPE_STROKE = 'stroke';
const TYPES = [TYPE_FILLED, TYPE_STROKE];

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
		width: oneOfType([number, string])`
			Width of the tag.
		`,
		height: oneOfType([number, string])`
			Height of the tag.
		`,
		strokeSize: oneOfType([number, string])`
			Stroke size when type is set to 'Stroke'.
		`,
		notchHeight: number`
			Height of the notch in pixels.  Notch width is calculated to preserve a 60 degree notch.
		`,
	},

	getDefaultProps() {
		return {
			width: 40,
			height: 25,
			strokeSize: 2,
			notchHeight: 6,
		};
	},

	render() {
		const {
			children,
			className,
			type,
			strokeSize,
			width,
			height,
			notchHeight,
			style,
			...passThroughs
		} = this.props;
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
				className={cx('&', className)}
				{...passThroughs}
				style={{
					...style,
					width,
					height,
					clipPath: slicePolygon,
				}}
			>
				<div
					className={cx(
						'&-container',
						type === TYPE_FILLED ? '&-container-filled' : ''
					)}
					style={{
						top: strokeSize,
						right: strokeSize,
						left: strokeSize,
						bottom: strokeSize,
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
