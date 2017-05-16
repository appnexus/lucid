import _ from 'lodash';
import React from 'react';
import { common } from '../../util/generic-tests';
import { mount } from 'enzyme';
import Resizer from './Resizer';

jest.mock('element-resize-detector', () => {
	return function() {
		return {
			listenTo: jest.fn((_element, handleResize) => {
				handleResize({
					offsetWidth: 50,
					offsetHeight: 100,
				});
			}),
			removeListener: jest.fn(),
		};
	};
});

describe('Resizer', () => {
	common(Resizer, {
		exemptFunctionProps: ['children'],
		getDefaultProps: () => {
			return {
				children: () => <div />,
			};
		},
	});

	describe('render', () => {
		it('should call the correct function when unmounted', () => {
			const wrapper = mount(
				<Resizer>
					{_.noop}
				</Resizer>
			);

			expect(wrapper.node.resizeDetector.removeListener).not.toHaveBeenCalled();

			wrapper.unmount();
			expect(wrapper.node.resizeDetector.removeListener).toHaveBeenCalled();
		});
	});

	describe('props', () => {
		it('children should callback with width and height', () => {
			const children = jest.fn();
			mount(
				<Resizer>
					{children}
				</Resizer>
			);

			expect(children).toHaveBeenCalledWith(50, 100);
		});
	});
});
