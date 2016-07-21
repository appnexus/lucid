import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import Breadcrumb from './Breadcrumb';
import SeparatorIcon from '../Icon/SeparatorIcon/SeparatorIcon';

const { Item } = Breadcrumb;
const data = ['home', 'list', 'item'];

describe('Breadcrumb', () => {
	common(Breadcrumb);

	describe('render', () => {

		let wrapper;

		beforeEach(() => {
			wrapper = shallow(
				<Breadcrumb className='whole-grain'>
					{_.map(data, item => <Item key={item}>{item}</Item>)}
					bar
				</Breadcrumb>
			);
		});

		it('should render items', () => {
			assert(_.every(data, item => _.includes(wrapper.text(), item)));
		});

		it('should not render non-items', () => {
			assert(!_.includes(wrapper.text()), 'bar');
		});

		it('should render separators', () => {
			assert.equal(wrapper.find(SeparatorIcon).length, 2);
		});

		it('should render a `ul` with the appropriate class name', () => {
			assert(wrapper.find('ul').hasClass('lucid-Breadcrumb-List'));
		});

		it('should render `li`s for each item with the appropriate class name', () => {
			wrapper.find('li').forEach(li => assert(li.hasClass('lucid-Breadcrumb-Item')));
		});

	});

});
