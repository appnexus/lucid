import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, Overwrite } from '../../util/component-types';
import * as d3Shape from 'd3-shape';
import * as chartConstants from '../../constants/charts';
import { buildModernHybridComponent } from '../../util/state-management';

import Line from '../../components/Line/Line';
import {
	ToolTipDumb as ToolTip,
	IToolTipProps,
	nonPassThroughs as toolTipNonPassThroughs,
} from '../../components/ToolTip/ToolTip';

import reducers, { IPieChartState } from './PieChart.reducers';

const cx = lucidClassNames.bind('&-PieChart');

const { string, number, arrayOf, bool, shape, object, func } = PropTypes;

const DONUT_WIDTH = 15;
const HOVER_SCALE = 1.1; // duplicated in .less file
const INNER_RADIUS = 0.5;

interface IPieChartMargin {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
}

export interface IPieChartPropsRaw extends StandardProps {
	/** Height of the chart. */
	height: number;

	/** Width of the chart. */
	width: number;

	/**
	 * An object defining the margins of the chart. These margins typically
	 * contain the axis and labels.
	 */
	margin?: IPieChartMargin;

	/**
	 * Data for the chart. E.g.
	 *
	 * [
	 *	{ x: 'Monday'    , y: 1 } ,
	 *	{ x: 'Tuesday'   , y: 2 } ,
	 *  { x: 'Wednesday' , y: 3 } ,
	 *  { x: 'Thursday'  , y: 2 } ,
	 *  { x: 'Friday'    , y: 5 } ,
	 * ]
	 */
	data?: Array<{ [key: string]: string | number }>;

	/** Show tool tips on hover. */
	hasToolTips: boolean;

	/** Determines if the pie slices have a stroke around them. */
	hasStroke: boolean;

	/**			
	 * Takes one of the palettes exported from \`lucid.chartConstants\`.
			Available palettes:

			- \`PALETTE_7\` (default)
			- \`PALETTE_30\`
			- \`PALETTE_MONOCHROME_0_5\`
			- \`PALETTE_MONOCHROME_1_5\`
			- \`PALETTE_MONOCHROME_2_5\`
			- \`PALETTE_MONOCHROME_3_5\`
			- \`PALETTE_MONOCHROME_4_5\`
			- \`PALETTE_MONOCHROME_5_5\`
			- \`PALETTE_MONOCHROME_6_5\` 
	*/
	palette: string[];

	/** You can pass in an object if you want to map x values to
	\`lucid.chartConstants\` or custom colors:

		{
			'imps': COLOR_0,
			'rev': COLOR_3,
			'clicks': '#abc123',
		}*/
	colorMap?: object;

	/** 
	An object of ToolTip props that are passed through to the underlying
			ToolTip component.
			*/
	ToolTip: IToolTipProps;

	/** Show the pie chart as a donut with a hollow center. */
	isDonut: boolean;

	/** Controls the visibility of the tooltip and the size of the currently
			hovered slice. */
	isHovering: boolean;

	/**
	Determines which slice to scale up and which data to display in he
		tooltip. */
	hoveringIndex: number;

	/** Called when the user hovers over a slice. */
	onMouseOver: (
		index: number,
		{ event, props }: { event: React.MouseEvent; props: IPieChartProps }
	) => void;

	/** Called when the user hovers away from either the pie or the tooltip. */
	onMouseOut: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IPieChartProps;
	}) => void;

	/** Width of the donut in px. */
	donutWidth: number;

	/** The field we should look up your x data by. The data should be strings. */
	xAxisField: string;

	/** An optional function used to format your x axis data. */
	xAxisFormatter: (x: string | number) => string | number;

	/** The field we should look up your y data by. The data should be numeric. */
	yAxisField: string;

	/** An optional function used to format your y axis data. */
	yAxisFormatter: (y: number) => string | number;
}

const nonPassThroughs = [
	'style',
	'className',
	'height',
	'width',
	'margin',
	'data',
	'hasToolTips',
	'hasStroke',
	'palette',
	'colorMap',
	'ToolTip',
	'isDonut',
	'isHovering',
	'hoveringIndex',
	'onMouseOver',
	'onMouseOut',
	'donutWidth',
	'xAxisField',
	'xAxisFormatter',
	'yAxisField',
	'yAxisFormatter',
	'initialState',
	'callbackId',
];

export type IPieChartProps = Overwrite<
	React.SVGProps<SVGGElement>,
	IPieChartPropsRaw
>;

const defaultProps = {
	height: 200,
	width: 200,
	// duplicated because `statics` aren't available during getDefaultProps
	margin: {
		top: 10,
		right: 10,
		bottom: 10,
		left: 10,
	},
	palette: chartConstants.PALETTE_7,
	hasToolTips: true,
	hasStroke: true,
	isDonut: false,
	donutWidth: DONUT_WIDTH,
	ToolTip: ToolTip.defaultProps,

	isHovering: false,
	hoveringIndex: 0,
	onMouseOver: _.noop,
	onMouseOut: _.noop,

	xAxisField: 'x',
	xAxisFormatter: _.identity,

	yAxisField: 'y',
	yAxisFormatter: _.identity,
};

const PieChart = (props: IPieChartProps) => {
	const {
		style,
		className,
		height,
		width,
		margin: marginOriginal,
		data,
		hasToolTips,
		hasStroke,
		palette,
		colorMap,
		isDonut,
		donutWidth,
		ToolTip: toolTipProps,

		isHovering,
		hoveringIndex,

		xAxisField,
		xAxisFormatter,

		yAxisField,
		yAxisFormatter,

		...passThroughs
	} = props;

	const margin = {
		...PieChart.MARGIN,
		...marginOriginal,
	};

	const svgClasses = cx(className, '&');

	const pieChartProps: any = omit(
		omit(passThroughs, toolTipNonPassThroughs.concat(['callbackId'])),
		nonPassThroughs
	);

	// TODO: Consider displaying something specific when there is no data,
	// perhaps a loading indicator.
	if (_.isEmpty(data) || width < 1 || height < 1) {
		return (
			<svg
				{...pieChartProps}
				style={style}
				className={svgClasses}
				width={width}
				height={height}
			/>
		);
	}

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const outerRadius = Math.min(innerWidth, innerHeight) / 2;

	const pie = d3Shape.pie().sort(null); // needed to put the slices in proper order
	const pieData = pie(
		_.map(data as Array<{ [key: string]: number }>, yAxisField)
	);

	const arc = d3Shape
		.arc()
		.innerRadius(isDonut ? outerRadius - donutWidth : INNER_RADIUS)
		.outerRadius(outerRadius);

	// Useful for capturing hovers when we're in donut mode
	const arcFull = d3Shape.arc().innerRadius(0).outerRadius(outerRadius);

	const handleMouseOut = ({ event }: { event: React.MouseEvent }): void => {
		props.onMouseOut({
			props,
			event,
		});
	};

	const handleMouseOver = (index: number, event: React.MouseEvent): void => {
		props.onMouseOver(index, {
			props,
			event,
		});
	};

	return (
		<svg
			{...pieChartProps}
			style={style}
			className={svgClasses}
			width={width}
			height={height}
		>
			<ToolTip
				{...toolTipProps}
				isLight={true}
				isExpanded={hasToolTips && isHovering}
				onMouseOver={_.noop}
				onMouseOut={handleMouseOut}
			>
				<ToolTip.Target elementType='g'>
					<g transform={`translate(${margin.left}, ${margin.top})`}>
						<g transform={`translate(${innerWidth / 2}, ${innerHeight / 2})`}>
							{_.map(pieData, (pieDatum, index) => {
								/* Even though innerRadius and outerRadius are set when
									constructing arc and arcFull, these functions still expect a type
									that includes innerRadius and outerRadius */

								//@ts-ignore
								const arcFullData = arcFull(pieDatum);
								//@ts-ignore
								const arcData = arc(pieDatum);

								return (
									<g
										key={index}
										className={cx('&-slice-group', {
											'&-slice-group-is-hovering':
												isHovering && hoveringIndex === index,
										})}
									>
										<Line
											key={index}
											className={cx('&-slice', {
												'&-slice-has-stroke': hasStroke,
											})}
											d={arcData}
											color={_.get(
												colorMap,
												(data && data[index][xAxisField]) || '',
												palette[index % palette.length]
											)}
											transform={`scale(${
												isHovering && hoveringIndex === index ? HOVER_SCALE : 1
											})`}
										/>

										{/* This hidden path is useful for capturing hovers when we're in donut mode */}
										<path
											className={cx('&-slice-hover')}
											d={arcFullData}
											transform={`scale(${HOVER_SCALE})`}
											onMouseOver={_.partial(handleMouseOver, index)}
											onMouseOut={hasToolTips ? _.noop : handleMouseOut}
										/>
									</g>
								);
							})}
						</g>
					</g>
				</ToolTip.Target>

				<ToolTip.Title>
					{xAxisFormatter(_.get(data, `[${hoveringIndex}].${xAxisField}`))}
				</ToolTip.Title>

				<ToolTip.Body>
					{yAxisFormatter(_.get(data, `[${hoveringIndex}].${yAxisField}`))}
				</ToolTip.Body>
			</ToolTip>
		</svg>
	);
};

PieChart.displayName = 'PieChart';

PieChart.propTypes = {
	/**
			Styles that are passed through to the root container.
		*/
	style: object,

	/**
			Appended to the component-specific class names set on the root element.
		*/
	className: string,

	/**
			Height of the chart.
		*/
	height: number,

	/**
			Width of the chart.
		*/
	width: number,

	/**
		An object defining the margins of the chart. These margins typically
		contain the axis and labels.
	*/
	margin: shape({
		top: number,
		right: number,
		bottom: number,
		left: number,
	}),

	/**
			Data for the chart. E.g.

				[
					{ x: 'Monday'    , y: 1 } ,
					{ x: 'Tuesday'   , y: 2 } ,
					{ x: 'Wednesday' , y: 3 } ,
					{ x: 'Thursday'  , y: 2 } ,
					{ x: 'Friday'    , y: 5 } ,
				]
		*/
	data: arrayOf(object),

	/**
			Show tool tips on hover.
		*/
	hasToolTips: bool,

	/**
			Determines if the pie slices have a stroke around them.
		*/
	hasStroke: bool,

	/**
			Takes one of the palettes exported from \`lucid.chartConstants\`.
			Available palettes:

			- \`PALETTE_7\` (default)
			- \`PALETTE_30\`
			- \`PALETTE_MONOCHROME_0_5\`
			- \`PALETTE_MONOCHROME_1_5\`
			- \`PALETTE_MONOCHROME_2_5\`
			- \`PALETTE_MONOCHROME_3_5\`
			- \`PALETTE_MONOCHROME_4_5\`
			- \`PALETTE_MONOCHROME_5_5\`
			- \`PALETTE_MONOCHROME_6_5\`
		*/
	palette: arrayOf(string),

	/**
			You can pass in an object if you want to map x values to
			\`lucid.chartConstants\` or custom colors:

				{
					'imps': COLOR_0,
					'rev': COLOR_3,
					'clicks': '#abc123',
				}
		*/
	colorMap: object,

	/**
			An object of ToolTip props that are passed through to the underlying
			ToolTip component.
		*/
	ToolTip: shape(ToolTip.propTypes),

	/**
			Show the pie chart as a donut with a hollow center.
		*/
	isDonut: bool,

	/**
			Controls the visibility of the tooltip and the size of the currently
			hovered slice.
		*/
	isHovering: bool,

	/**
			Determines which slice to scale up and which data to display in he
			tooltip.
		*/
	hoveringIndex: number,

	/**
			Called when the user hovers over a slice.  Signature:
		*/
	onMouseOver: func,

	/**
			Called when the user hovers away from either the pie or the tooltip.
		*/
	onMouseOut: func,

	/**
			Width of the donut in px.
		*/
	donutWidth: number,

	/**
			The field we should look up your x data by. The data should be strings.
		*/
	xAxisField: string,

	/**
			An optional function used to format your x axis data.
		*/
	xAxisFormatter: func,

	/**
			The field we should look up your y data by. The data should be numeric.
		*/
	yAxisField: string,

	/**
			An optional function used to format your y axis data.
		*/
	yAxisFormatter: func,
};

PieChart.peek = {
	description: `\`PieChart\` is used for categorical data when you want to show the relative size of each category to the whole. We use similar "x" and "y" terms to keep parity with the other charts even though a pie chart is really just key value based.`,
	categories: ['visualizations', 'charts'],
	madeFrom: ['ToolTip'],
};

PieChart.MARGIN = {
	top: 10,
	right: 10,
	bottom: 10,
	left: 10,
};

PieChart.DONUT_WIDTH = DONUT_WIDTH;

PieChart.HOVER_SCALE = HOVER_SCALE;

PieChart.reducers = reducers;

PieChart.defaultProps = defaultProps;

export default buildModernHybridComponent<
	IPieChartProps,
	IPieChartState,
	typeof PieChart
>(PieChart as any, { reducers });
export { PieChart as PieChartDumb };
