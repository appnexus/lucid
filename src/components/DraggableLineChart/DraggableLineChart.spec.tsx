import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';

import DraggableLineChart from './DraggableLineChart';

describe('DraggableLineChart', () => {
	common(DraggableLineChart);

	const data = [
		{ x: new Date(), y: 1 },
		{ x: new Date(), y: 2 },
		{ x: new Date(), y: 3 },
	] as any;

	let wrapper: any;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	describe('render', () => {
		it('should render an svg chart', () => {
			wrapper = mount(<DraggableLineChart data={data} />);

			assert.equal(wrapper.find('svg').length, 1, 'did not render an svg');
		});
	});
	describe('when props update,', () => {
		it('should call d3LineChart.updateLineChart', () => {
			const data = [
				{ x: '12:00', y: 1 },
				{ x: '1:00', y: 2 },
				{ x: '2:00', y: 3 },
			];
			wrapper = mount(<DraggableLineChart data={data} />);
			wrapper.instance().d3LineChart.updateLineChart = jest.fn();
			data.push({ x: '3:00', y: 6 });
			wrapper.setProps({ data: data });

			expect(wrapper.instance().d3LineChart.updateLineChart).toBeCalledTimes(1);
		});
	});
	describe('pass throughs', () => {
		const defaultProps = DraggableLineChart.defaultProps;
		const props = {
			...defaultProps,
			data,
			onDragEnd: noop,
			onPreselect: noop,
			xAxisTicksVertical: true,
			dataIsCentered: true,
			yAxisMin: 0,
			preSelectText: 'test text',
			yAxisFormatter: (value) => `string ${value}`,
			className: 'wut',
			style: { marginRight: 10 },
			initialState: { test: true },
			callbackId: 1,
			'data-testid': 10,
		};

		it('passes through props not defined in `propTypes` to the root element.', () => {
			wrapper = mount(<DraggableLineChart {...props} />);

			const rootProps = wrapper.find('.lucid-DraggableLineChart').props();
			expect(wrapper.first().prop(['className'])).toContain('wut');
			expect(wrapper.first().prop(['style'])).toMatchObject({
				marginRight: 10,
			});
			expect(wrapper.first().prop(['data-testid'])).toBe(10);

			// 'className', 'width', 'height' and 'style' are plucked from the pass through object
			// but still appears becuase each one is also directly added to the root element as a prop
			forEach(
				['className', 'data-testid', 'style', 'width', 'height'],
				(prop) => {
					expect(has(rootProps, prop)).toBe(true);
				}
			);
		});
		it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
			wrapper = mount(<DraggableLineChart {...props} />);

			const rootProps = wrapper.find('.lucid-DraggableLineChart').props();
			forEach(
				[
					'margin',
					'data',
					'onDragEnd',
					'xAxisTicksVertical',
					'dataIsCentered',
					'yAxisMin',
					'xAxisRenderProp',
					'onPreselect',
					'preSelectText',
					'yAxisFormatter',
					'initialState',
					'callbackId',
				],
				(prop) => {
					expect(has(rootProps, prop)).toBe(false);
				}
			);
		});
	});
});
