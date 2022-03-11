import _ from 'lodash';
import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import { TabsDumb as Tabs } from './Tabs';

describe('Tabs', () => {
	common(Tabs, {
		exemptChildComponents: ['Tab', 'Title'] as any,
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
				<Tabs Tab={[{ children: 'Bert' }, { children: 'Ernie' }] as any} />
			);

			assert.equal(wrapper.find('.lucid-Tabs-bar').children().length, 2);
			assert.equal(wrapper.find('.lucid-Tabs-content').text(), 'Bert');
		});

		it('Tab as props with Title', () => {
			const wrapper = shallow(
				<Tabs
					Tab={
						[
							{ Title: 'Coolest', children: 'Bert' },
							{ Title: 'Not so cool', children: 'Ernie' },
						] as any
					}
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
					<Tabs.Tab Title='Froyo'>Yolo fo sho</Tabs.Tab>
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
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab Title='Slurpee'>Yum</Tabs.Tab>
				</Tabs>
			);

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert(!tabBar.childAt(0).prop('isSelected'));
			assert(tabBar.childAt(1).prop('isSelected'));
		});

		it('Tab.isSelected', () => {
			const wrapper = shallow(
				<Tabs>
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title='Slurpee'>
						Yum
					</Tabs.Tab>
				</Tabs>
			);

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert(!tabBar.childAt(0).prop('isSelected'));
			assert(tabBar.childAt(1).prop('isSelected'));
		});

		it('last Tab.isSelected beats selectedIndex', () => {
			const wrapper = shallow(
				<Tabs selectedIndex={0}>
					<Tabs.Tab Title='One'>One content</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title='Two'>
						Two content
					</Tabs.Tab>
					<Tabs.Tab isSelected={true} Title='Three'>
						Three content
					</Tabs.Tab>
				</Tabs>
			);

			const tabBar = wrapper.find('.lucid-Tabs-bar').shallow();

			assert(!tabBar.childAt(0).prop('isSelected'));
			assert(tabBar.childAt(1).prop('isSelected'));
			assert(tabBar.childAt(2).prop('isSelected'));
		});

		describe('onSelect', () => {
			const onSelectMock: any = jest.fn();
			let clickEvent: any;
			let wrapper: any;
			let tabBar: any;

			beforeEach(() => {
				onSelectMock.mockClear();
				clickEvent = {
					event: { index: 1 },
					props: {
						index: 1,
						isLastTab: true,
						isOpen: true,
						isProgressive: false,
						isSelected: false,
						onSelect: () => {},
						Title: '',
						children: 'One',
					},
				};

				wrapper = shallow(
					<Tabs onSelect={onSelectMock}>
						<Tabs.Tab isDisabled={true}>Zero</Tabs.Tab>
						<Tabs.Tab>One</Tabs.Tab>
					</Tabs>
				);
				tabBar = wrapper.find('.lucid-Tabs-bar').shallow();
			});

			it('should call onSelect with the correct arguments', () => {
				tabBar.childAt(1).shallow().simulate('click', clickEvent);
				const selectedIndex = onSelectMock.mock.calls[0][0];
				const meta = onSelectMock.mock.calls[0][1].event;
				expect(onSelectMock).toBeCalledTimes(1);
				expect(selectedIndex).toEqual(1);
				expect(meta).toEqual(clickEvent);
			});

			it('should not call onSelect if the `Tab` isDisabled', () => {
				tabBar.childAt(0).shallow().simulate('click', clickEvent);
				expect(onSelectMock).not.toBeCalled();
			});
		});

		it('isOpen', () => {
			const wrapper = shallow(
				<Tabs isOpen={false} selectedIndex={0}>
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab Title='Slurpee'>Yum</Tabs.Tab>
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
					<Tabs.Tab Title='Lollipop'>Yuck</Tabs.Tab>
					<Tabs.Tab Title='Slurpee'>Yum</Tabs.Tab>
				</Tabs>
			);

			assert.equal(wrapper.find('.lucid-Tabs-variable-width').length, 1);
		});
	});
});
