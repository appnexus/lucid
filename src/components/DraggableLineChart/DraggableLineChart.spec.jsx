import React from 'react';
import { mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';

import DraggableLineChart from './DraggableLineChart';

describe('DraggableLineChart', () => {
	let wrapper;

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
					]}
				/>
			);

			assert.equal(
				wrapper.find('svg').length,
				1,
				'did not render an svg'
			);
		});
	});
});
