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

			assert.equal(wrapper.find('.lucid-Tabs-bar-item').length, 2);
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Bert');
		});

		it('Tab as props with Title', () => {
			const wrapper = shallow(
				<Tabs Tab={[
					{ Title: 'Coolest', children: 'Bert' },
					{ Title: 'Not so cool', children: 'Ernie' },
				]} />
			);

			assert.equal(wrapper.find('.lucid-Tabs-bar-item').length, 2);
			assert.equal(wrapper.find('.lucid-Tabs-bar-item-is-active').text(), 'Coolest');
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Bert');
		});

		it('Title as props', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab Title='Froyo'>Yolo fo sho</Tabs.Tab>
					<Tabs.Tab>Broyoyo</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-bar-item').first().text(), 'Froyo');
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

			assert.equal(wrapper.find('.lucid-Tabs-bar-item').first().text(), 'Froyo');
		});

		it('selectedIndex', () => {
			const wrapper = shallow(
				<Tabs selectedIndex={1}>
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab Title='Slurpee'>Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-bar-item-is-active').text(), 'Slurpee');
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Yum');
		});

		it('onSelect', () => {
			const onSelect = sinon.spy();
			const wrapper = shallow(
				<Tabs onSelect={onSelect}>
					<Tabs.Tab>One</Tabs.Tab>
					<Tabs.Tab>Two</Tabs.Tab>
				</Tabs>
			);

			wrapper.find('.lucid-Tabs-bar-item').at(1).simulate('click');

			assert(onSelect.called);
			assert.equal(onSelect.args[0][0], 1);
		});

		it('isOpen', () => {
			const wrapper = shallow(
				<Tabs isOpen={false} selectedIndex={0}>
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab Title='Slurpee'>Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-bar-item-is-active-and-open').length, 0);
		});
	});
});
