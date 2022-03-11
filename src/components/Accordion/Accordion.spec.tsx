import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import { mount, shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import { AccordionDumb as Accordion } from './Accordion';
import { ExpanderPanelDumb as ExpanderPanel } from '../ExpanderPanel/ExpanderPanel';

describe('Accordion', () => {
	common(Accordion, { exemptChildComponents: ['Header'] as any });

	describe('props', () => {
		describe('Item', () => {
			it('renders ExpanderPanel components on it', () => {
				const wrapper = mount(
					<Accordion>
						<Accordion.Item Header='Header One'>One</Accordion.Item>
						<Accordion.Item Header='Header Two'>Two</Accordion.Item>
					</Accordion>
				);

				assert(wrapper.find(ExpanderPanel), 2 as any);
			});

			it('Item as children', () => {
				const wrapper = shallow(
					<Accordion>
						<Accordion.Item Header='Header One'>One</Accordion.Item>
						<Accordion.Item Header='Header Two'>Two</Accordion.Item>
					</Accordion>
				);

				assert.strictEqual(wrapper.find('.lucid-Accordion-Item').length, 2);
			});
		});

		describe('Header', () => {
			it('Header as props', () => {
				const wrapper = mount(
					<Accordion>
						<Accordion.Item Header='Froyo'>Yolo fo sho</Accordion.Item>
						<Accordion.Item>Broyoyo</Accordion.Item>
					</Accordion>
				);

				const firstItem = wrapper.find('.lucid-Accordion-Item').first();

				assert.strictEqual(
					firstItem.find('.lucid-ExpanderPanel-header').first().text(),
					'Froyo'
				);
			});

			it('Header as children', () => {
				const wrapper = mount(
					<Accordion>
						<Accordion.Item>
							<Accordion.Header>Froyo</Accordion.Header>
							Yolo fo sho
						</Accordion.Item>
						<Accordion.Item>Broyoyo</Accordion.Item>
					</Accordion>
				);

				const firstItem = wrapper.find('.lucid-Accordion-Item').first();

				assert.strictEqual(
					firstItem.find('.lucid-ExpanderPanel-header').first().text(),
					'Froyo'
				);
			});
		});

		describe('selectedIndex', () => {
			it('should have an expanded item when set via props', () => {
				const wrapper = mount(
					<Accordion selectedIndex={1}>
						<Accordion.Item Header='Header Test'>test</Accordion.Item>
						<Accordion.Item Header='Header Test'>test</Accordion.Item>
						<Accordion.Item Header='Header Test'>test</Accordion.Item>
					</Accordion>
				);

				assert(
					wrapper.find('.lucid-ExpanderPanel-content-is-expanded'),
					1 as any
				);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element', () => {
				const wrapper = shallow(
					<Accordion
						className='wut'
						style={{ marginRight: 10 }}
						{...{
							foo: 1,
							bar: 2,
						}}
					/>
				);
				const rootProps = wrapper.find('.lucid-Accordion').props();

				assert(_.has(rootProps, 'foo'), 'props missing "foo" prop');
				assert(_.has(rootProps, 'bar'), 'props missing "bar" prop');
			});

			it('passes through Item className to the rendered item element', () => {
				const wrapper = shallow(
					<Accordion>
						<Accordion.Item className='TestOne'>One</Accordion.Item>
						<Accordion.Item className='TestTwo'>Two</Accordion.Item>
					</Accordion>
				);
				const itemsWrapper = wrapper.find('.lucid-Accordion-Item');

				assert.strictEqual(
					itemsWrapper.find('.TestOne').length,
					1,
					'must find one item with className `TestOne`'
				);
				assert.strictEqual(
					itemsWrapper.find('.TestTwo').length,
					1,
					'must find one item with className `TestTwo`'
				);
			});
		});
	});
});

describe('Accordion', () => {
	let wrapper: any;
	const onSelectMock: any = jest.fn();
	let mountTestDiv: any;

	describe('user picks one of the items', () => {
		beforeEach(() => {
			mountTestDiv = document.createElement('div');
			document.body.appendChild(mountTestDiv);
			wrapper = mount(
				<Accordion onSelect={onSelectMock}>
					<Accordion.Item Header='Header One'>One</Accordion.Item>
					<Accordion.Item Header='Header Two' isDisabled>
						Two
					</Accordion.Item>
				</Accordion>,
				{
					attachTo: mountTestDiv,
				}
			);
		});

		afterEach(() => {
			onSelectMock.mockClear();
			wrapper && wrapper.unmount();
			mountTestDiv && mountTestDiv.parentNode.removeChild(mountTestDiv);
		});

		it('should call the function passed in as the `onSelect` prop', () => {
			const firstPanel = wrapper.find('.lucid-ExpanderPanel').at(0);

			firstPanel.find('.lucid-ExpanderPanel-header').first().simulate('click');
			firstPanel.find('.lucid-ExpanderPanel-icon').first().simulate('click');

			expect(onSelectMock).toBeCalledTimes(2);
		});

		it('should not call the function passed in as the `onSelect` prop when Item is disabled', () => {
			const secondPanel = wrapper.find('.lucid-ExpanderPanel').at(2);

			secondPanel.find('.lucid-ExpanderPanel-header').first().simulate('click');
			secondPanel.find('.lucid-ExpanderPanel-icon').first().simulate('click');

			expect(onSelectMock).toBeCalledTimes(0);
		});
	});
});
