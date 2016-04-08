import _ from 'lodash';
import React from 'react';
import assert from 'assert';
import { shallow, mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import describeWithDOM from '../../util/describe-with-dom';
import VerticalListMenu from './VerticalListMenu';
import sinon from 'sinon';

describe('VerticalListMenu', () => {
	common(VerticalListMenu);

	it('should have the correct number of children', () => {
		const wrapper = shallow(
			<VerticalListMenu>
				<VerticalListMenu.Item />
				<VerticalListMenu.Item />
				<VerticalListMenu.Item />
			</VerticalListMenu>
		);

		assert.equal(wrapper.find('.lucid-VerticalListMenu-Item').length, 3);
	});

	it('should render the Item content correctly', () => {
		const wrapper = shallow(
			<VerticalListMenu>
				<VerticalListMenu.Item>blarg</VerticalListMenu.Item>
			</VerticalListMenu>
		);

		assert.equal(wrapper.find('.lucid-VerticalListMenu-Item').text(), 'blarg');
	});

	it('should correctly recognize other VerticalListMenu\'s as children', () => {
		const wrapper = shallow(
			<VerticalListMenu>
				<VerticalListMenu.Item>
					<div>Other random content</div>
					<VerticalListMenu>
						<VerticalListMenu.Item />
					</VerticalListMenu>
				</VerticalListMenu.Item>
			</VerticalListMenu>
		);

		assert.equal(wrapper.find('.lucid-VerticalListMenu-Item-nested-list').children().length, 1);
	});

	it('should favor child props over parent level indicies', () => {
		const wrapper = shallow(
			<VerticalListMenu selectedIndices={[0]} expandedIndices={[2]}>
				<VerticalListMenu.Item>
					Selected one
				</VerticalListMenu.Item>

				<VerticalListMenu.Item isSelected={true}>
					Selected two
				</VerticalListMenu.Item>

				<VerticalListMenu.Item>
					Expanded one
				</VerticalListMenu.Item>

				<VerticalListMenu.Item isExpanded={true}>
					Expanded two
				</VerticalListMenu.Item>
			</VerticalListMenu>
		);

		assert.equal(wrapper.find('.lucid-VerticalListMenu-Item-content-is-selected').length, 2);
		assert.equal(wrapper.find('.lucid-VerticalListMenu-Item-nested-list-is-expanded').length, 2);
	});

	it('should fire onSelect', () => {
		const onSelect = sinon.spy();
		const wrapper = shallow(
			<VerticalListMenu onSelect={onSelect}>
				<VerticalListMenu.Item>One</VerticalListMenu.Item>
				<VerticalListMenu.Item>Two</VerticalListMenu.Item>
			</VerticalListMenu>
		);

		wrapper.find('.lucid-VerticalListMenu-Item-content').at(1).simulate('click');

		assert(onSelect.called);
		assert.equal(onSelect.args[0][0], 1, 'wrong index on the onSelect callback');
		assert(_.has(onSelect.args[0][1], 'event'), 'missing `event` on the onSelect callback');
		assert(_.has(onSelect.args[0][1], 'props'), 'missing `props` on the onSelect callback');
	});

	it('should fire onSelect on the child', () => {
		const onSelect = sinon.spy();
		const wrapper = shallow(
			<VerticalListMenu>
				<VerticalListMenu.Item>One</VerticalListMenu.Item>
				<VerticalListMenu.Item onSelect={onSelect}>Two</VerticalListMenu.Item>
			</VerticalListMenu>
		);

		wrapper.find('.lucid-VerticalListMenu-Item-content').at(1).simulate('click');

		assert(onSelect.called);
		assert.equal(onSelect.args[0][0], 1, 'wrong index on the onSelect callback');
		assert(_.has(onSelect.args[0][1], 'event'), 'missing `event` on the onSelect callback');
		assert(_.has(onSelect.args[0][1], 'props'), 'missing `props` on the onSelect callback');
	});

	it('should not fire onSelect when isDisabled on the parent', () => {
		const onSelect = sinon.spy();
		const wrapper = shallow(
			<VerticalListMenu onSelect={onSelect} isDisabled={true}>
				<VerticalListMenu.Item>One</VerticalListMenu.Item>
				<VerticalListMenu.Item>Two</VerticalListMenu.Item>
			</VerticalListMenu>
		);

		wrapper.find('.lucid-VerticalListMenu-Item-content').at(1).simulate('click');

		assert(!onSelect.called);
	});

	it('should not fire onSelect when isDisabled on the child', () => {
		const onSelect = sinon.spy();
		const wrapper = shallow(
			<VerticalListMenu onSelect={onSelect}>
				<VerticalListMenu.Item>One</VerticalListMenu.Item>
				<VerticalListMenu.Item isDisabled={true}>Two</VerticalListMenu.Item>
			</VerticalListMenu>
		);

		wrapper.find('.lucid-VerticalListMenu-Item-content').at(1).simulate('click');

		assert(!onSelect.called);
	});

	it('should show expanders based on hasExpander', () => {

		const wrapper = shallow(
			<VerticalListMenu>
				<VerticalListMenu.Item />
				<VerticalListMenu.Item hasExpander={true} />
				<VerticalListMenu.Item hasExpander={true} />
			</VerticalListMenu>
		);

		assert.equal(wrapper.find('.lucid-VerticalListMenu-Item-expander').length, 2);
	});
});

describeWithDOM('VerticalListMenu', () => {
	// Since onToggle uses a Button under the hood, we need to do a `mount` test
	// to make sure it's passing the `event` object around correctly
	it('should fire onToggle', () => {
		const onToggle = sinon.spy();
		const wrapper = mount(
			<VerticalListMenu onToggle={onToggle}>
				<VerticalListMenu.Item hasExpander={true} />
				<VerticalListMenu.Item hasExpander={true} />
			</VerticalListMenu>
		);

		wrapper.find('.lucid-VerticalListMenu-Item-expander').at(0).simulate('click');

		assert(onToggle.called);
		assert.equal(onToggle.args[0][0], 0, 'wrong index on the onToggle callback');
		assert(_.has(onToggle.args[0][1], 'event'), 'missing `event` on the onToggle callback');
		assert(_.has(onToggle.args[0][1], 'props'), 'missing `props` on the onToggle callback');
	});

	it('should fire onToggle on the child', () => {
		const onToggle = sinon.spy();
		const wrapper = mount(
			<VerticalListMenu>
				<VerticalListMenu.Item hasExpander={true} onToggle={onToggle} />
				<VerticalListMenu.Item hasExpander={true} />
			</VerticalListMenu>
		);

		wrapper.find('.lucid-VerticalListMenu-Item-expander').at(0).simulate('click');

		assert(onToggle.called);
		assert.equal(onToggle.args[0][0], 0, 'wrong index on the onToggle callback');
		assert(_.has(onToggle.args[0][1], 'event'), 'missing `event` on the onToggle callback');
		assert(_.has(onToggle.args[0][1], 'props'), 'missing `props` on the onToggle callback');
	});

	it('should not fire onToggle when isDisabled on the parent', () => {
		const onToggle = sinon.spy();
		const wrapper = mount(
			<VerticalListMenu onToggle={onToggle} isDisabled={true}>
				<VerticalListMenu.Item hasExpander={true} />
				<VerticalListMenu.Item hasExpander={true} />
			</VerticalListMenu>
		);

		wrapper.find('.lucid-VerticalListMenu-Item-expander').at(0).simulate('click');

		assert(!onToggle.called);
	});

	it('should not fire onToggle when isDisabled on the child', () => {
		const onToggle = sinon.spy();
		const wrapper = mount(
			<VerticalListMenu onToggle={onToggle}>
				<VerticalListMenu.Item hasExpander={true} isDisabled={true} />
				<VerticalListMenu.Item hasExpander={true} />
			</VerticalListMenu>
		);

		wrapper.find('.lucid-VerticalListMenu-Item-expander').at(0).simulate('click');

		assert(!onToggle.called);
	});

});
