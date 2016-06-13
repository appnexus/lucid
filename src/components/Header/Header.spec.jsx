import React from 'react';
import _ from 'lodash';
import assert from 'assert';
import { common, controls } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header', () => {
	common(Header);
	controls(Header, {
		controlSelector: '.lucid-Header',
	});

	describe('text', () => {
		it('should allow children as content', () => {
			let text = 'Hello';
			const wrapper = shallow(<Header>{text}</Header>);
			assert.equal(wrapper.text(), text);
		});
	});

	describe('css classes', () => {
		// TODO: make this a generic test
		it('should have the Header class', () => {
			const wrapper = shallow(<Header />);
			let classNames = wrapper.find('header').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-Header'), `'${classNames}' should include 'lucid-Header'`);
		});
	});
});
