import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import Badge from './Badge';

describe('Badge', () => {
	common(Badge);

	describe('text', () => {
		it('should allow children as content', () => {
			let text = 'Hello';
			const wrapper = shallow(<Badge>{text}</Badge>);
			assert.equal(wrapper.text(), text);
		});
	});
});
