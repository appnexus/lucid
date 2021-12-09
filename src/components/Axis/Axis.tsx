import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import * as d3scale from 'd3-scale';

import { lucidClassNames } from '../../util/style-helpers';
import { discreteTicks } from '../../util/chart-helpers';
import { StandardProps, Overwrite } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Axis');

const { string, array, func, number, oneOf } = PropTypes;

export interface IAxisPropsRaw extends StandardProps {
	/** Must be a d3 scale. Lucid exposes the \`lucid.d3Scale\` library for use here.
	 We support `ScaleTime | ScaleBand | ScalePoint` and possibly more. */
	scale:
		| d3scale.ScaleBand<number>
		| d3scale.ScalePoint<number>
		| d3scale.ScaleContinuousNumeric<number, number>
		| d3scale.ScaleTime<number, number>;
	// | d3scale.ScalePower<number, number>
	// | d3scale.ScaleLogarithmic<number, number>;

	/** Size of the ticks for each discrete tick mark. */
	innerTickSize: number;

	/** Size of the tick marks found at the beginning and end of the axis. It's
		common to set this to \`0\` to remove them. */
	outerTickSize: number;

	/** An optional function that can format ticks. Generally this shouldn't be
		needed since d3 has very good default formatters for most data. */
	tickFormat?: (d: number | Date) => string;

	/** If you need fine grained control over the axis ticks, you can pass them
		in this array. */
	ticks?: Array<number | Date>;

	/** Determines the spacing between each tick and its text. */
	tickPadding: number;

	/** Determines the orientation of the ticks. \`left\` and \`right\` will
		generate a vertical axis, whereas \`top\` and \`bottom\` will generate a
		horizontal axis. */
	orient: 'top' | 'bottom' | 'left' | 'right';

	/** Control the number of ticks displayed. If the scale is time based or
		linear, this number acts a "hint" per the default behavior of D3. If it's
		an ordinal scale, this number is treated as an absolute number of ticks
		to display and is powered by our own utility function \`discreteTicks\`. */
	tickCount: number | null;

	/** Determines the orientation of the tick text. This may override what the orient prop
		tries to determine. This defaults to `horizontal`.  */
	textOrientation: 'vertical' | 'horizontal' | 'diagonal';
}

export type IAxisProps = Overwrite<
	React.SVGAttributes<SVGGElement>,
	IAxisPropsRaw
>;

const defaultProps = {
	innerTickSize: 6, // same as d3
	outerTickSize: 6, // same as d3
	tickPadding: 3, // same as d3
	textOrientation: 'horizontal' as const,
	orient: 'bottom' as const,
	tickCount: null,
};

export const Axis = (props: IAxisProps): React.ReactElement => {
	const {
		className,
		scale,
		orient,
		tickCount,
		ticks = 'ticks' in scale
			? scale.ticks(tickCount as number)
			: discreteTicks(scale.domain(), tickCount), // ordinal scales don't have `ticks` but they do have `domains`
		innerTickSize,
		outerTickSize,
		tickFormat = 'tickFormat' in scale ? scale.tickFormat() : _.identity,
		tickPadding,
		textOrientation,
		...passThroughs
	} = props;

	const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

	// Domain
	const range = scale.range();
	const sign = orient === 'top' || orient === 'left' ? -1 : 1;
	const isH = orient === 'top' || orient === 'bottom'; // is horizontal
	const getOrientationProperties = (
		orient: string,
		textOrientation: string
	): {
		transform: string;
		textAnchor: 'end' | 'middle' | 'start';
		x: number;
		y: number;
		dy: string;
	} => {
		let textAnchor: 'end' | 'middle' | 'start',
			x: number,
			y: number,
			dy: string;
		let orientationSign = sign;

		const transform =
			textOrientation === 'vertical'
				? 'rotate(-90)'
				: textOrientation === 'horizontal'
				? ''
				: 'rotate(-30)';

		switch (orient) {
			case 'bottom':
				if (textOrientation === 'vertical') {
					orientationSign = -orientationSign;
				}
				textAnchor =
					textOrientation === 'vertical'
						? 'end'
						: textOrientation === 'diagonal'
						? 'end'
						: 'middle';
				x =
					textOrientation === 'vertical'
						? orientationSign * tickSpacing
						: textOrientation === 'diagonal'
						? -orientationSign * tickSpacing
						: 0;
				y = textOrientation === 'vertical' ? 0 : orientationSign * tickSpacing;
				dy = textOrientation === 'vertical' ? '.32em' : '.71em';
				break;
			case 'top':
				if (textOrientation === 'vertical') {
					orientationSign = -orientationSign;
				}
				textAnchor =
					textOrientation === 'vertical'
						? 'start'
						: textOrientation === 'diagonal'
						? 'start'
						: 'middle';
				x =
					textOrientation === 'vertical' || textOrientation === 'diagonal'
						? -orientationSign * tickSpacing
						: 0;
				y = textOrientation === 'vertical' ? 0 : orientationSign * tickSpacing;
				dy =
					textOrientation === 'vertical' || textOrientation === 'diagonal'
						? '.32em'
						: '0em';
				break;
			case 'right':
				textAnchor = textOrientation === 'vertical' ? 'middle' : 'start';
				x = textOrientation === 'vertical' ? 0 : orientationSign * tickSpacing;
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
				x = textOrientation === 'vertical' ? 0 : orientationSign * tickSpacing;
				y =
					textOrientation === 'vertical' || textOrientation === 'diagonal'
						? orientationSign * tickSpacing
						: 0;
				dy =
					textOrientation === 'vertical'
						? '0em'
						: textOrientation === 'horizontal'
						? '.32em'
						: '.71em';
				break;
			default:
				textAnchor = 'start';
				x = 0;
				y = 0;
				dy = 'null';
		}
		return {
			transform,
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

	// Only band scales have `bandwidth`, this conditional helps center the
	// ticks on the bands
	const scaleNormalized =
		'bandwidth' in scale
			? (d: number): number => (scale(d) as number) + scale.bandwidth() / 2
			: scale;

	return (
		<g {...(passThroughs as any)} className={cx(className, '&')}>
			{isH ? (
				<path
					className={cx('&-domain')}
					d={`M${range[0]},${sign * outerTickSize}V0H${range[1]}V${
						sign * outerTickSize
					}`}
				/>
			) : (
				<path
					className={cx('&-domain')}
					d={`M${sign * outerTickSize},${range[0]}H0V${range[1]}H${
						sign * outerTickSize
					}`}
				/>
			)}
			{_.map(
				ticks,
				(tick: number): JSX.Element => (
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
							{tickFormat(tick as any)}
						</text>
					</g>
				)
			)}
		</g>
	);
};

Axis.defaultProps = defaultProps;
Axis.displayName = 'Axis';
Axis.peek = {
	description: `\`Axis\` is used within an \`svg\`. An \`Axis\` is used to help render human-readable reference marks on charts. It can either be horizontal or vertical and really only needs a scale to be able to draw properly. This component is a very close sister to d3's svg axis and most of the logic was ported from there.`,
	categories: ['visualizations', 'chart primitives'],
};
Axis.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Must be a d3 scale. Lucid exposes the \`lucid.d3Scale\` library for use
		here.
	*/
	scale: func.isRequired,

	/**
		Size of the ticks for each discrete tick mark.
	*/
	innerTickSize: number,

	/**
		Size of the tick marks found at the beginning and end of the axis. It's
		common to set this to \`0\` to remove them.
	*/
	outerTickSize: number,

	/**
		An optional function that can format ticks. Generally this shouldn't be
		needed since d3 has very good default formatters for most data.
		Signature: \`(tick) => {}\`
	*/
	tickFormat: func,

	/**
		If you need fine grained control over the axis ticks, you can pass them
		in this array.
	*/
	ticks: array,

	/**
		Determines the spacing between each tick and its text.
	*/
	tickPadding: number,

	/**
		Determines the orientation of the ticks. \`left\` and \`right\` will
		generate a vertical axis, whereas \`top\` and \`bottom\` will generate a
		horizontal axis.
	*/
	orient: oneOf(['top', 'bottom', 'left', 'right']),

	/**
		Control the number of ticks displayed. If the scale is time based or
		linear, this number acts a "hint" per the default behavior of D3. If it's
		an ordinal scale, this number is treated as an absolute number of ticks
		to display and is powered by our own utility function \`discreteTicks\`.
	*/
	tickCount: number,

	/**
		Determines the orientation of the tick text. This may override what the orient prop
		tries to determine. This defaults to \`horizontal\`.
	*/
	textOrientation: oneOf(['vertical', 'horizontal', 'diagonal']),
};

export default Axis;
