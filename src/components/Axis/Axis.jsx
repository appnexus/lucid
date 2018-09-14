import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { discreteTicks } from '../../util/chart-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Axis');

const { string, array, func, number, oneOf } = PropTypes;

const Axis = createClass({
	displayName: 'Axis',

	statics: {
		peek: {
			description: `
				*For use within an \`svg\`*

				Axes are used to help render human-readable reference marks on charts.
				They can either be horizontal or vertical and really only need a scale
				to be able to draw properly.

				This component is a very close sister to d3's svg axis and most of the
				logic pwas ported from there.
			`,
			categories: ['visualizations', 'chart primitives'],
		},
	},

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		scale: func.isRequired`
			Must be a d3 scale. Lucid exposes the \`lucid.d3Scale\` library for use
			here.
		`,

		innerTickSize: number`
			Size of the ticks for each discrete tick mark.
		`,

		outerTickSize: number`
			Size of the tick marks found at the beginning and end of the axis. It's
			common to set this to \`0\` to remove them.
		`,

		tickFormat: func`
			An optional function that can format ticks. Generally this shouldn't be
			needed since d3 has very good default formatters for most data.
			Signature: \`(tick) => {}\`
		`,

		ticks: array`
			If you need fine grained control over the axis ticks, you can pass them
			in this array.
		`,

		tickPadding: number`
			Determines the spacing between each tick and its text.
		`,

		orient: oneOf(['top', 'bottom', 'left', 'right'])`
			Determines the orientation of the ticks. \`left\` and \`right\` will
			generate a vertical axis, whereas \`top\` and \`bottom\` will generate a
			horizontal axis.
		`,

		tickCount: number`
			Control the number of ticks displayed. If the scale is time based or
			linear, this number acts a "hint" per the default behavior of D3. If it's
			an ordinal scale, this number is treated as an absolute number of ticks
			to display and is powered by our own utility function \`discreteTicks\`.
		`,

		textOrientation: oneOf(['vertical', 'horizontal', 'diagonal'])`
			Determines the orientation of the tick text. This may override what the orient prop
			tries to determine. This defaults to \`horizontal\`.
		`,
	},

	getDefaultProps() {
		return {
			innerTickSize: 6, // same as d3
			outerTickSize: 6, // same as d3
			tickPadding: 3, // same as d3
			textOrientation: 'horizontal',
			orient: 'bottom',
			tickCount: null,
		};
	},

	render() {
		const {
			scale,
			className,
			orient,
			tickCount,
			ticks = scale.ticks
				? scale.ticks(tickCount)
				: discreteTicks(scale.domain(), tickCount), // ordinal scales don't have `ticks` but they do have `domains`
			innerTickSize,
			outerTickSize,
			tickFormat = scale.tickFormat ? scale.tickFormat() : _.identity,
			tickPadding,
			textOrientation,
			...passThroughs
		} = this.props;

		const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

		// Domain
		const range = scale.range();
		const sign = orient === 'top' || orient === 'left' ? -1 : 1;
		const isH = orient === 'top' || orient === 'bottom'; // is horizontal
		const getOrientationProperties = (orient, textOrientation) => {
			let textAnchor, x, y, dy;
			let orientationSign = sign;
			switch (orient) {
				case 'bottom':
					if (textOrientation === 'vertical') {
						orientationSign = -orientationSign;
					}
					textAnchor =
						textOrientation === 'vertical'
							? 'end'
							: textOrientation === 'diagonal' ? 'end' : 'middle';
					x =
						textOrientation === 'vertical'
							? orientationSign * tickSpacing
							: textOrientation === 'diagonal'
								? -orientationSign * tickSpacing
								: 0;
					y =
						textOrientation === 'vertical' ? 0 : orientationSign * tickSpacing;
					dy = textOrientation === 'vertical' ? '.32em' : '.71em';
					break;
				case 'top':
					if (textOrientation === 'vertical') {
						orientationSign = -orientationSign;
					}
					textAnchor =
						textOrientation === 'vertical'
							? 'start'
							: textOrientation === 'diagonal' ? 'start' : 'middle';
					x =
						textOrientation === 'vertical' || textOrientation === 'diagonal'
							? -orientationSign * tickSpacing
							: 0;
					y =
						textOrientation === 'vertical' ? 0 : orientationSign * tickSpacing;
					dy =
						textOrientation === 'vertical' || textOrientation === 'diagonal'
							? '.32em'
							: '0em';
					break;
				case 'right':
					textAnchor = textOrientation === 'vertical' ? 'middle' : 'start';
					x =
						textOrientation === 'vertical' ? 0 : orientationSign * tickSpacing;
					y =
						textOrientation === 'vertical'
							? orientationSign * tickSpacing
							: textOrientation === 'horizontal'
								? 0
								: orientationSign * tickSpacing;
					dy = textOrientation === 'vertical' ? '.71em' : '.32em';
					break;
				case 'left':
					textAnchor = textOrientation === 'vertical' ? 'middle' : 'end';
					x =
						textOrientation === 'vertical' ? 0 : orientationSign * tickSpacing;
					y =
						textOrientation === 'vertical' || textOrientation === 'diagonal'
							? orientationSign * tickSpacing
							: 0;
					dy =
						textOrientation === 'vertical'
							? '0em'
							: textOrientation === 'horizontal' ? '.32em' : '.71em';
					break;
			}
			return {
				transform:
					textOrientation === 'vertical'
						? 'rotate(-90)'
						: textOrientation === 'horizontal' ? '' : 'rotate(-30)',
				textAnchor,
				x,
				y,
				dy,
			};
		};
		const orientationProperties = {
			vertical: getOrientationProperties(orient, 'vertical'),
			horizontal: getOrientationProperties(orient, 'horizontal'),
			diagonal: getOrientationProperties(orient, 'diagonal'),
		};
		const orientationKey = textOrientation || 'horizontal';

		let scaleNormalized = scale;

		// Only band scales have `bandwidth`, this conditional helps center the
		// ticks on the bands
		if (scale.bandwidth) {
			const bandModifier = scale.bandwidth() / 2;
			scaleNormalized = d => scale(d) + bandModifier;
		}

		return (
			<g {...omitProps(passThroughs, Axis)} className={cx(className, '&')}>
				{isH ? (
					<path
						className={cx('&-domain')}
						d={`M${range[0]},${sign * outerTickSize}V0H${range[1]}V${sign *
							outerTickSize}`}
					/>
				) : (
					<path
						className={cx('&-domain')}
						d={`M${sign * outerTickSize},${range[0]}H0V${range[1]}H${sign *
							outerTickSize}`}
					/>
				)}
				{_.map(ticks, tick => (
					<g
						key={tick}
						transform={`translate(${isH ? scaleNormalized(tick) : 0}, ${
							isH ? 0 : scaleNormalized(tick)
						})`}
					>
						<line
							className={cx('&-tick')}
							x2={isH ? 0 : sign * innerTickSize}
							y2={isH ? sign * innerTickSize : 0}
						/>
						<text
							className={cx('&-tick-text')}
							x={orientationProperties[orientationKey].x}
							y={orientationProperties[orientationKey].y}
							dy={orientationProperties[orientationKey].dy}
							style={{
								textAnchor: orientationProperties[orientationKey].textAnchor,
							}}
							transform={orientationProperties[orientationKey].transform}
						>
							{tickFormat(tick)}
						</text>
					</g>
				))}
			</g>
		);
	},
});

export default Axis;
