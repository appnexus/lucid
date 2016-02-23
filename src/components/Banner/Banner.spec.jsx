import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import _ from 'lodash';
import { common } from '../../util/generic-tests';

import Banner from './Banner';

describe('Banner', () => {
	common(Banner);

	describe('text', () => {
		it('should allow children as content', () => {
			let text = 'Hello';
			const wrapper = shallow(<Banner>{text}</Banner>);
			assert.equal(wrapper.text(), text);
		});
	});

	describe('css classes', () => {
		// TODO: make this a generic test
		it('should have the Banner class', () => {
			const wrapper = shallow(<Banner />);
			let classNames = wrapper.find('button').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-Banner'), `'${classNames}' should include 'lucid-Banner'`);
		});
	});
});
