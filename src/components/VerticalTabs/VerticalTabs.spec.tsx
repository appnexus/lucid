import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import { VerticalTabsDumb as VerticalTabs } from './VerticalTabs';
import { VerticalListMenuDumb as VerticalListMenu } from '../VerticalListMenu/VerticalListMenu';

//👇 Destructure any child components that we will need
const { Tab, Title } = VerticalTabs;

describe('VerticalTabs', () => {
	common(VerticalTabs, {
		exemptChildComponents: ['Tab', 'Title'] as any,
	});

	describe('render', () => {
		it('should render', () => {
			const wrapper = shallow(
				<VerticalTabs>
					<VerticalTabs.Tab>
						<VerticalTabs.Title>One</VerticalTabs.Title>
						One content
					</VerticalTabs.Tab>
				</VerticalTabs>
			);
			expect(wrapper).toMatchSnapshot();
		});
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
					<VerticalTabs.Tab Title='Froyo'>Yolo fo sho</VerticalTabs.Tab>
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
					<VerticalTabs.Tab Title='Lollipop'>Yuck</VerticalTabs.Tab>
					<VerticalTabs.Tab Title='Slurpee'>Yum</VerticalTabs.Tab>
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
					<VerticalTabs.Tab Title='Lollipop'>Yuck</VerticalTabs.Tab>
					<VerticalTabs.Tab isSelected={true} Title='Slurpee'>
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
					<VerticalTabs.Tab Title='One'>One content</VerticalTabs.Tab>
					<VerticalTabs.Tab isSelected={true} Title='Two'>
						Two content
					</VerticalTabs.Tab>
					<VerticalTabs.Tab isSelected={true} Title='Three'>
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
			const onSelectMock: any = jest.fn();
			let wrapper: any;

			beforeEach(() => {
				onSelectMock.mockClear();
				wrapper = shallow(
					<VerticalTabs onSelect={onSelectMock}>
						<VerticalTabs.Tab>One</VerticalTabs.Tab>
						<VerticalTabs.Tab>Two</VerticalTabs.Tab>
					</VerticalTabs>
				);
			});

			it('should pass props onto `VerticalListMenu`', () => {
				wrapper.find(VerticalListMenu).props().onSelect('stuff');
				expect(onSelectMock).toBeCalledTimes(1);
				expect(onSelectMock.mock.calls[0][0]).toEqual('stuff');
			});
		});

		describe('root pass throughs', () => {
			let wrapper: any;

			beforeEach(() => {
				const props = {
					Tab: <Tab>One content</Tab>,
					Title: <Title>One</Title>,
					selectedIndex: 2,
					onSelect: noop,
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<VerticalTabs {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-VerticalTabs').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' is plucked from the pass through object
				// but still appears becuase it is also directly added to the root element as a prop
				forEach(
					['className', 'data-testid', 'style', 'children', 'Tab', 'Title'],
					(prop) => {
						expect(has(rootProps, prop)).toBe(true);
					}
				);
			});
			it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-VerticalTabs').props();

				forEach(
					['selectedIndex', 'onSelect', 'initialState', 'callbackId'],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});
	});
});
