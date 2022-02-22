import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import TextFieldPlain from './TextFieldPlain';

describe('TextField', () => {
	common(TextFieldPlain);

	test('input should have the correct value', () => {
		const value = 'test value';
		const wrapper = shallow(<TextFieldPlain value={value} />);
		expect(wrapper.find('input').props().value).toEqual(value);
	});

	test('multiline textarea should have the correct value', () => {
		const value = 'test value';
		const wrapper = shallow(<TextFieldPlain value={value} isMultiLine />);
		expect(wrapper.find('textarea').props().value).toEqual(value);
	});
});
