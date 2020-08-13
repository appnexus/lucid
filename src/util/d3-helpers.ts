import { Selection } from 'd3-selection';
import _ from 'lodash';
import * as d3Array from 'd3-array';
import ReactDOM from 'react-dom';

enum Orientation {
	TOP = 'TOP',
	RIGHT = 'RIGHT',
	BOTTOM = 'BOTTOM',
	LEFT = 'LEFT',
}

export type IXAxisRenderProp = (xValue: string) => JSX.Element;

const setLineAttributes = (
	selection: any,
	orientation: any,
	range: [number, number]
) => {
	const [min, max] = range;

	if (orientation === Orientation.BOTTOM || orientation === Orientation.TOP) {
		selection
			.attr('x1', min)
			.attr('x2', max)
			.attr('y1', 0)
			.attr('y2', 0);
	} else {
		selection
			.attr('x1', 0)
			.attr('x2', 0)
			.attr('y1', min)
			.attr('y2', max);
	}
};

const setTickAttributes = (
	selection: any,
	orientation: Orientation,
	scale: any,
	tickSize: number
) => {
	const x1 = 0;
	let x2 = 0;
	const y1 = 0;
	let y2 = 0;
	switch (orientation) {
		case Orientation.BOTTOM:
			y2 = tickSize || 5;
			break;
		case Orientation.TOP:
			y2 = -tickSize || 5;
			break;
		case Orientation.RIGHT:
			x2 = tickSize || 5;
			break;
		case Orientation.LEFT:
			x2 = -(tickSize || 5);
			break;
	}
	selection
		.attr('x1', x1)
		.attr('x2', x2)
		.attr('y1', y1)
		.attr('y2', y2);
};

const lucidXAxis = (
	selection: Selection<SVGElement, {}, null, undefined>,
	{
		xScale,
		tickSize,
		xAxisRenderProp,
	}: {
		xScale: any;
		tickSize: number;
		xAxisRenderProp?: IXAxisRenderProp;
	}
): void => {
	const range = xScale.range();
	const domain = xScale.domain();
	const rMin = Number(d3Array.min(range)) || 0;
	const rMax = Number(d3Array.max(range)) || 0;
	const axisGroup = selection.append('g').classed('axis', true);
	axisGroup
		.append('line')
		.attr('stroke', 'black')
		.call(setLineAttributes, 'TOP', [rMin, rMax]);
	const ticks = axisGroup
		.selectAll('.ticks')
		.data(domain)
		.order();

	const tick = ticks
		.enter()
		.append('g')
		.classed('ticks', true)
		.attr('transform', (d: any) => `translate( ${xScale(d)}, 0)`);
	tick.append('line').call(setTickAttributes, 'TOP', xScale, tickSize);
	tick
		.append('foreignObject')
		.style('overflow', 'visible')
		.style('display', 'flex')
		.attr('x', 0)
		.attr('y', 0)
		.attr('height', 1)
		.attr('width', 1);
	if (!xAxisRenderProp) {
		tick.append('text').text((d: any) => d);
	} else {
		const tickObj = tick.selectAll('foreignObject').append('xhtml:div');
		tickObj
			.style('width', `${60}px`)
			.attr('id', (d: any) => d)
			.classed('tickRender', true)
			.html((xValue: string | any, num, node) => {
				if (xValue !== '' && !_.isNil(xValue)) {
					ReactDOM.render(
						// @ts-ignore
						xAxisRenderProp(xValue),
						node[0]
					);
				}
				// console.log(d,node[0])
				else return xValue;
			});
	}
};

export { lucidXAxis };
