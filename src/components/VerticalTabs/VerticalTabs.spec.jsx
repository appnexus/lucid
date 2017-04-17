import sinon from 'sinon';
import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';

import { VerticalTabsDumb as VerticalTabs } from './VerticalTabs';
import {
	VerticalListMenuDumb as VerticalListMenu,
} from '../VerticalListMenu/VerticalListMenu';

describe('VerticalTabs', () => {
	common(VerticalTabs, {
		exemptChildComponents: ['Tab', 'Title'],
	});

	describe('props', () => {
		it('Tab as children', () => {
			const wrapper = shallow(
				<VerticalTabs>
					<VerticalTabs.Tab>Foo Content</VerticalTabs.Tab>
					<VerticalTabs.Tab>Two</VerticalTabs.Tab>
				</VerticalTabs>
			);

			assert.equal(
				wrapper.find('.lucid-VerticalTabs-content').text(),
				'Foo Content'
			);
		});

		it('Tab as props', () => {
			const wrapper = shallow(
				<VerticalTabs Tab={[{ children: 'Bert' }, { children: 'Ernie' }]} />
			);

			assert.equal(wrapper.find('.lucid-VerticalTabs-Tab').length, 2);
			assert.equal(wrapper.find('.lucid-VerticalTabs-content').text(), 'Bert');
		});

		it('Tab as props with Title', () => {
			const wrapper = shallow(
				<VerticalTabs
					Tab={[
						{ Title: 'Coolest', children: 'Bert' },
						{ Title: 'Not so cool', children: 'Ernie' },
					]}
				/>
			);

			assert.equal(wrapper.find('.lucid-VerticalTabs-Tab').length, 2);
			assert.equal(
				wrapper.find('.lucid-VerticalTabs-Tab-is-active').children().text(),
				'Coolest'
			);
			assert.equal(wrapper.find('.lucid-VerticalTabs-content').text(), 'Bert');
		});

		it('Title as props', () => {
			const wrapper = shallow(
				<VerticalTabs>
					<VerticalTabs.Tab Title="Froyo">Yolo fo sho</VerticalTabs.Tab>
					<VerticalTabs.Tab>Broyoyo</VerticalTabs.Tab>
				</VerticalTabs>
			);

			assert.equal(
				wrapper.find('.lucid-VerticalTabs-Tab').first().children().text(),
				'Froyo'
			);
		});

		it('Title as children', () => {
			const wrapper = shallow(
				<VerticalTabs>
					<VerticalTabs.Tab>
						<VerticalTabs.Title>Froyo</VerticalTabs.Title>
						Yolo fo sho
					</VerticalTabs.Tab>
					<VerticalTabs.Tab>Broyoyo</VerticalTabs.Tab>
				</VerticalTabs>
			);

			assert.equal(
				wrapper.find('.lucid-VerticalTabs-Tab').first().children().text(),
				'Froyo'
			);
		});

		it('selectedIndex', () => {
			const wrapper = shallow(
				<VerticalTabs selectedIndex={1}>
					<VerticalTabs.Tab Title="Lollipop">Yuck</VerticalTabs.Tab>
					<VerticalTabs.Tab Title="Slurpee">Yum</VerticalTabs.Tab>
				</VerticalTabs>
			);

			assert.equal(
				wrapper.find('.lucid-VerticalTabs-Tab-is-active').children().text(),
				'Slurpee'
			);
			assert.equal(wrapper.find('.lucid-VerticalTabs-content').text(), 'Yum');
		});

		it('Tab.isSelected', () => {
			const wrapper = shallow(
				<VerticalTabs>
					<VerticalTabs.Tab Title="Lollipop">Yuck</VerticalTabs.Tab>
					<VerticalTabs.Tab isSelected={true} Title="Slurpee">
						Yum
					</VerticalTabs.Tab>
				</VerticalTabs>
			);

			assert.equal(
				wrapper.find('.lucid-VerticalTabs-Tab-is-active').children().text(),
				'Slurpee'
			);
			assert.equal(wrapper.find('.lucid-VerticalTabs-content').text(), 'Yum');
		});

		it('last Tab.isSelected beats selectedIndex', () => {
			const wrapper = shallow(
				<VerticalTabs selectedIndex={0}>
					<VerticalTabs.Tab Title="One">One content</VerticalTabs.Tab>
					<VerticalTabs.Tab isSelected={true} Title="Two">
						Two content
					</VerticalTabs.Tab>
					<VerticalTabs.Tab isSelected={true} Title="Three">
						Three content
					</VerticalTabs.Tab>
				</VerticalTabs>
			);

			assert.equal(
				wrapper.find('.lucid-VerticalTabs-Tab-is-active').children().text(),
				'Three'
			);
			assert.equal(
				wrapper.find('.lucid-VerticalTabs-content').text(),
				'Three content'
			);
		});

		describe('onSelect', () => {
			const onSelect = sinon.spy();
			let wrapper;

			beforeEach(() => {
				onSelect.reset();
				wrapper = shallow(
					<VerticalTabs onSelect={onSelect}>
						<VerticalTabs.Tab>One</VerticalTabs.Tab>
						<VerticalTabs.Tab>Two</VerticalTabs.Tab>
					</VerticalTabs>
				);
			});

			it('should pass props onto `VerticalListMenu`', () => {
				wrapper.find(VerticalListMenu).props().onSelect('stuff');
				assert(onSelect.called);
				assert.equal(onSelect.args[0], 'stuff');
			});
		});
	});
});
