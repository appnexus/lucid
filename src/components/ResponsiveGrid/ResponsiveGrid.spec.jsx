import React from 'react';
import { common } from '../../util/generic-tests';
import { mount } from 'enzyme';
import assert from 'assert';
import ResponsiveGrid, {
	ResponsiveGrid as ResponsiveGridInner,
} from './ResponsiveGrid';

describe('ResponsiveGrid', () => {
	common(ResponsiveGrid);

	describe('props', () => {
		describe('breakPoints', () => {
			it('should display one column for width less than the minimum break point', () => {
				const wrapper = mount(
					<ResponsiveGridInner breakPoints={[480, 960]} width={250} />
				);
				const columnWrapper = wrapper.find('.lucid-ResponsiveGrid-Column');

				assert.equal(
					columnWrapper.length,
					1,
					'must display one column for width less than the minimum break point'
				);
			});
			it('should display two columns for widths greater than the minimum break point and less than the maximum break point', () => {
				const wrapper = mount(
					<ResponsiveGridInner breakPoints={[480, 960]} width={500} />
				);
				const columnWrapper = wrapper.find('.lucid-ResponsiveGrid-Column');

				assert.equal(
					columnWrapper.length,
					2,
					'must display one column for width greater than the minimum break point and less than the maximum break point'
				);
			});
			it('should display three columns for widths greater than the maximum break point', () => {
				const wrapper = mount(
					<ResponsiveGridInner breakPoints={[480, 960]} width={1000} />
				);
				const columnWrapper = wrapper.find('.lucid-ResponsiveGrid-Column');

				assert.equal(
					columnWrapper.length,
					3,
					'must display one column for width greater than the maximum'
				);
			});
		});
	});
});
