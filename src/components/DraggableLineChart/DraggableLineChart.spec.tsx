import React from 'react';
import { mount } from 'enzyme';
import assert from 'assert';

import DraggableLineChart from './DraggableLineChart';

describe('DraggableLineChart', () => {
	let wrapper: any;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	describe('render', () => {
		it('should render an svg chart', () => {
			wrapper = mount(
				<DraggableLineChart
					data={[
						{ x: new Date(), y: 1 },
						{ x: new Date(), y: 2 },
						{ x: new Date(), y: 3 },
					] as any}
				/>
			);

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
			data.push({x: '3:00', y: 6});
			wrapper.setProps({ data: data });

			expect(wrapper.instance().d3LineChart.updateLineChart).toBeCalledTimes(1);
		});
	});
});
