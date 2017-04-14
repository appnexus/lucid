import React from 'react';
import assert from 'assert';
import { mount } from 'enzyme';

import Portal from './Portal';

describe('Portal', () => {
	describe('props', () => {
		describe('portalId', () => {
			it('should set the id of the portal DOM element portalId', () => {
				const wrapper = mount(<Portal portalId="test1234" />);

				assert(document.getElementById('test1234'));
				wrapper.unmount();
			});
		});

		describe('children', () => {
			it('should pass thru children', () => {
				const wrapper = mount(
					<Portal portalId="test1234">
						<button>test</button>
					</Portal>
				);

				assert(document.getElementById('test1234').querySelector('button'));

				wrapper.unmount();
			});
		});
	});
});
