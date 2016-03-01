import React from 'react';
import assert from 'assert';
import describeWithDOM from '../../util/describe-with-dom';
import { mount } from 'enzyme';

import Portal from './Portal';

describeWithDOM('Portal', () => {

	it('prop portalId', () => {
		const wrapper = mount(
			<Portal portalId='test1234' />
		);

		assert(document.getElementById('test1234'));
		wrapper.unmount();
	});

	it('prop children', () => {
		const wrapper = mount(
			<Portal portalId='test1234'>
				<button>test</button>
			</Portal>
		);

		assert(document.getElementById('test1234').querySelector('button'));

		wrapper.unmount();
	});

});
