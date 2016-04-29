import sinon from 'sinon';
import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';

import Tabs from './Tabs';

describe('Tabs', () => {
	common(Tabs);

	describe('props', () => {
		it('Tab as children', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab>Foo Content</Tabs.Tab>
					<Tabs.Tab>Two</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Foo Content')
		});

		it('Tab as props', () => {
			const wrapper = shallow(
				<Tabs Tab={[{children: 'Bert'}, {children: 'Ernie'}]} />
			);

			assert.equal(wrapper.find('.lucid-Tabs-Tab').length, 2);
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Bert');
		});

		it('Tab as props with Title', () => {
			const wrapper = shallow(
				<Tabs Tab={[
					{ Title: 'Coolest', children: 'Bert' },
					{ Title: 'Not so cool', children: 'Ernie' },
				]} />
			);

			assert.equal(wrapper.find('.lucid-Tabs-Tab').length, 2);
			assert.equal(wrapper.find('.lucid-Tabs-Tab-is-active').text(), 'Coolest');
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Bert');
		});

		it('Title as props', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab Title='Froyo'>Yolo fo sho</Tabs.Tab>
					<Tabs.Tab>Broyoyo</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-Tab').first().text(), 'Froyo');
		});

		it('Title as children', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab>
						<Tabs.Title>Froyo</Tabs.Title>
						Yolo fo sho
					</Tabs.Tab>
					<Tabs.Tab>Broyoyo</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-Tab').first().text(), 'Froyo');
		});

		it('selectedIndex', () => {
			const wrapper = shallow(
				<Tabs selectedIndex={1}>
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab Title='Slurpee'>Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-Tab-is-active').text(), 'Slurpee');
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Yum');
		});

		it('Tab.isSelected', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title='Slurpee'>Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-Tab-is-active').text(), 'Slurpee');
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Yum');
		});

		it('last Tab.isSelected beats selectedIndex', () => {
			const wrapper = shallow(
				<Tabs selectedIndex={0}>
					<Tabs.Tab Title='One'>One content</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title='Two'>Two content</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title='Three'>Three content</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-Tab-is-active').text(), 'Three');
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Three content');
		});

		it('onSelect', () => {
			const onSelect = sinon.spy();
			const clickEvent = 'event';
			const wrapper = shallow(
				<Tabs onSelect={onSelect}>
					<Tabs.Tab>One</Tabs.Tab>
					<Tabs.Tab>Two</Tabs.Tab>
				</Tabs>
			);

			wrapper.find('.lucid-Tabs-Tab').at(1).simulate('click', clickEvent);

			assert(onSelect.called);
			assert.equal(onSelect.args[0][0], 1);
			assert.equal(onSelect.args[0][1]['event'], clickEvent);
			assert.deepEqual(onSelect.args[0][1]['props'], {children: 'Two'});
		});

		it('isOpen', () => {
			const wrapper = shallow(
				<Tabs isOpen={false} selectedIndex={0}>
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab Title='Slurpee'>Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-Tab-is-active-and-open').length, 0);
		});
	});
});
