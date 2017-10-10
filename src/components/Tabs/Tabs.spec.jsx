import sinon from 'sinon';
import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';

import { TabsDumb as Tabs } from './Tabs';

describe('Tabs', () => {
	common(Tabs, {
		exemptChildComponents: ['Tab', 'Title'],
	});

	describe('props', () => {
		it('Tab as children', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab>Foo Content</Tabs.Tab>
					<Tabs.Tab>Two</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Foo Content');
		});

		it('Tab as props', () => {
			const wrapper = shallow(
				<Tabs Tab={[{ children: 'Bert' }, { children: 'Ernie' }]} />
			);

			assert.equal(wrapper.find('.lucid-Tabs-bar').children().length, 2);
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Bert');
		});

		it('Tab as props with Title', () => {
			const wrapper = shallow(
				<Tabs
					Tab={[
						{ Title: 'Coolest', children: 'Bert' },
						{ Title: 'Not so cool', children: 'Ernie' },
					]}
				/>
			);

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert.equal(tabBar.children().length, 2);
			assert.equal(tabBar.childAt(0).prop('Title'), 'Coolest');
			assert(tabBar.childAt(0).prop('isSelected'));
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Bert');
		});

		it('Title as props', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab Title="Froyo">Yolo fo sho</Tabs.Tab>
					<Tabs.Tab>Broyoyo</Tabs.Tab>
				</Tabs>
			);

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert.equal(tabBar.childAt(0).prop('Title'), 'Froyo');
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

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert.equal(tabBar.childAt(0).prop('Title'), 'Froyo');
		});

		it('selectedIndex', () => {
			const wrapper = shallow(
				<Tabs selectedIndex={1}>
					<Tabs.Tab Title="Lollipop">Yuck</Tabs.Tab>
					<Tabs.Tab Title="Slurpee">Yum</Tabs.Tab>
				</Tabs>
			);

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert(!tabBar.childAt(0).prop('isSelected'));
			assert(tabBar.childAt(1).prop('isSelected'));
		});

		it('Tab.isSelected', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab Title="Lollipop">Yuck</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title="Slurpee">Yum</Tabs.Tab>
				</Tabs>
			);

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert(!tabBar.childAt(0).prop('isSelected'));
			assert(tabBar.childAt(1).prop('isSelected'));
		});

		it('last Tab.isSelected beats selectedIndex', () => {
			const wrapper = shallow(
				<Tabs selectedIndex={0}>
					<Tabs.Tab Title="One">One content</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title="Two">Two content</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title="Three">Three content</Tabs.Tab>
				</Tabs>
			);

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert(!tabBar.childAt(0).prop('isSelected'));
			assert(tabBar.childAt(1).prop('isSelected'));
			assert(tabBar.childAt(2).prop('isSelected'));
		});

		describe('onSelect', () => {
			const onSelect = sinon.spy();
			let clickEvent;
			let wrapper;
			let tabBar;

			beforeEach(() => {
				onSelect.reset();
				clickEvent = 'event';
				wrapper = shallow(
					<Tabs onSelect={onSelect}>
						<Tabs.Tab isDisabled={true}>One</Tabs.Tab>
						<Tabs.Tab>Two</Tabs.Tab>
					</Tabs>
				);
				tabBar = wrapper.find('.lucid-Tabs-bar').shallow();
			});

			it('should call onSelect with the correct arguments', () => {
				tabBar.childAt(1).shallow().simulate('click', clickEvent);
				const selectedIndex = onSelect.args[0][0];
				const meta = onSelect.args[0][1];
				assert(onSelect.called);
				assert.equal(selectedIndex, 1);
				assert.equal(meta.event, clickEvent);
				assert.deepEqual(meta.props, {
					isLastTab: true,
					isOpen: true,
					isProgressive: false,
					isSelected: false,
					Title: '',
					children: 'Two',
					isNavigation: false,
				});
			});

			it('should not call onSelect if the `Tab` isDisabled', () => {
				tabBar.childAt(0).shallow().simulate('click', clickEvent);
				assert(!onSelect.called);
			});
		});

		it('isOpen', () => {
			const wrapper = shallow(
				<Tabs isOpen={false} selectedIndex={0}>
					<Tabs.Tab Title="Lollipop">Yuck</Tabs.Tab>
					<Tabs.Tab Title="Slurpee">Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(
				wrapper.find('.lucid-Tabs-Tab-is-active-and-open').length,
				0
			);
		});

		it('hasFullWidthTabs', () => {
			const wrapper = shallow(
				<Tabs hasFullWidthTabs={false}>
					<Tabs.Tab Title="Lollipop">Yuck</Tabs.Tab>
					<Tabs.Tab Title="Slurpee">Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-variable-width').length, 1);
		});

		it('isNavigation', () => {
			const wrapper = shallow(
				<Tabs isNavigation={true}>
					<Tabs.Tab Title="Lollipop">Yuck</Tabs.Tab>
					<Tabs.Tab Title="Slurpee">Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-navigation-tabs').length, 1);
		});
	});
});
