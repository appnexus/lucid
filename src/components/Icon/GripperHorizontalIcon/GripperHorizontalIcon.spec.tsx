import _, { keys, forEach, includes, noop } from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';

import { icons, common } from '../../../util/generic-tests';
import GripperHorizontalIcon from './GripperHorizontalIcon';
import { greatestIndex } from 'd3-array';

describe('GripperHorizontalIcon', () => {
	common(GripperHorizontalIcon);
	icons(GripperHorizontalIcon);

	describe('passThroughs', () => {
		let wrapper: any;

		beforeEach(() => {
			const props = {
				width: 32,
				height: 4,
				className: 'wut',
				viewbox: '0 0 32 32',
				aspectRatio: 'xMidYMid meet',
				color: 'primary' as any,
				size: 32,
				isClickable: true,
				isDisabled: false,
				onClick: noop,
				onSelect: noop,
				children: <span></span>,
				style: { marginRight: 10 },
				initialState: { testData: true },
				callbackId: 1,
				'data-testid': 2,
			};
			wrapper = shallow(<GripperHorizontalIcon {...props} />);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('should pass through some props', () => {
			const rootProps = keys(wrapper.first().props());

			console.log(rootProps);
			console.log(wrapper.debug());

			// className is omitted but appears because it is directly added to the element
			forEach(
				[
					'data-testid',
					'className',
					'width',
					'height',
					'style',
					'viewbox',
					'className',
					'size',
					'aspectRatio',
					'isClickable',
					'isDisabled',
					'onClick',
					'onSelect',
					'children',
					'color',
				],
				(prop) => {
					expect(includes(rootProps, prop)).toBe(true);
				}
			);

			expect(wrapper.first().prop(['data-testid'])).toBe(2);
			expect(wrapper.first().prop(['width'])).toBe(16);
			expect(wrapper.first().prop(['height'])).toBe(2);
			expect(wrapper.first().prop(['aspectRatio'])).toBe('xMidYMid meet');
			expect(wrapper.first().prop(['className'])).toContain('wut');
			expect(wrapper.first().prop(['style'])).toMatchObject({
				marginRight: 10,
			});
		});
		it('should omit some props', () => {
			const rootProps = keys(wrapper.first().props());

			forEach(['initialState'], (prop) => {
				expect(includes(rootProps, prop)).toBe(false);
			});
		});
	});
});
