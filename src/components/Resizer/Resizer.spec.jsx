import _ from 'lodash';
import React from 'react';
import { common } from '../../util/generic-tests';
import { mount } from 'enzyme';

import Resizer, { ResizerBase } from './Resizer';

describe('Resizer', () => {
	common(Resizer, {
		exemptFunctionProps: ['children'],
		getDefaultProps: () => {
			return {
				children: () => (<div />),
			}
		},
	});

	describe('render', () => {
		it('should call the correct function when unmounted', () => {
			const removeListener = jest.fn();

			const wrapper = mount(
				<ResizerBase removeListener={removeListener}>
					{_.noop}
				</ResizerBase>
			);

			expect(removeListener).not.toHaveBeenCalled();

			wrapper.unmount();

			expect(removeListener).toHaveBeenCalled();
		});
	});

	describe('props', () => {
		it('children should callback with width and height', () => {
			const listenTo = jest.fn((_element, handleResize) => {
				handleResize({
					offsetWidth: 50,
					offsetHeight: 100,
				});
			});
			const children = jest.fn();
			mount(
				<ResizerBase listenTo={listenTo}>
					{children}
				</ResizerBase>
			);

			expect(children).toHaveBeenCalledWith(50, 100);
		});
	});

});
