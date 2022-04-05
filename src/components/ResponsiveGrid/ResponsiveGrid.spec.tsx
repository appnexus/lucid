import React from 'react';
import _, { keys, forEach, includes } from 'lodash';

import { common } from '../../util/generic-tests';
import { mount } from 'enzyme';
import assert from 'assert';
import ResponsiveGrid, {
	ResponsiveGrid as ResponsiveGridInner,
} from './ResponsiveGrid';

describe('ResponsiveGrid', () => {
	common(ResponsiveGrid);

	describe('props', () => {
		describe('passThroughs', () => {
			let wrapper: any;

			beforeEach(() => {
				const props = {
					width: 100,
					breakPoints: [980, 1260],
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { testData: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = mount(<ResponsiveGrid {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('should pass through some props to the resizer', () => {
				// ResponsiveGrid passes through its props to a Resizer component
				const rootProps = keys(wrapper.find('Resizer').first().props());

				// className is omitted but appears because it is directly added to the element
				// if it exists, callbackId should be passed to the resizer
				forEach(
					[
						'data-testid',
						'className',
						'width',
						'style',
						'callbackId',
						'children',
					],
					(prop) => {
						expect(includes(rootProps, prop)).toBe(true);
					}
				);
			});
			it('should omit some props from the resizer', () => {
				// ResponsiveGrid passes through its props to a Resizer component
				const rootProps = keys(wrapper.find('Resizer').first().props());

				forEach(['breakPoints', 'initialState'], (prop) => {
					expect(includes(rootProps, prop)).toBe(false);
				});
			});
		});

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
