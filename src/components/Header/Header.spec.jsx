import React from 'react';
import _ from 'lodash';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header', () => {
	common(Header);

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
		it('should have a header with the "-hasBorder" class when hasBorder is true', () => {
			const wrapper = shallow(<Header hasBorder={true} />);
			let classNames = wrapper.find('header').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-Header-has-border'), `'${classNames}' should include 'lucid-Header-has-border'`);
		});
	});
});
