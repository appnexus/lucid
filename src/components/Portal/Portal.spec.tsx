import React from 'react';
import assert from 'assert';
import { mount } from 'enzyme';

import Portal from './Portal';

describe('Portal', () => {
	describe('props', () => {
		describe('portalId', () => {
			it('should set the id of the portal DOM element portalId', () => {
				const wrapper = mount(<Portal portalId='test1234' />);

				assert(document.getElementById('test1234'));
				wrapper.unmount();
			});
		});

		describe('children', () => {
			it('should pass thru children', () => {
				const wrapper = mount(
					<Portal portalId='test1234'>
						<button>test</button>
					</Portal>
				);

				assert(
					(document as any).getElementById('test1234').querySelector('button')
				);

				wrapper.unmount();
			});
		});
	});

	it('removes itself on unmount', () => {
		const wrapper = mount(<Portal portalId='unmount-test' />);
		expect(document.getElementById('unmount-test')).toBeTruthy();
		wrapper.unmount();
		expect(document.getElementById('unmount-test')).toBeNull();
	});
});
