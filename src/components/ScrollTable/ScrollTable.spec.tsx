import _, { forEach, has } from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import ScrollTable from './ScrollTable';
import Table from '../Table/Table';

const { Thead, Tbody, Tr, Th, Td } = ScrollTable;

describe('ScrollTable', () => {
	common(ScrollTable);

	describe('render', () => {
		it('should render a container with a Table inside', () => {
			const wrapper = shallow(<ScrollTable />);

			assert(
				wrapper.is('.lucid-ScrollTable'),
				'root must be a container element'
			);
			assert(wrapper.not(Table), 'root must not be a Table');
			assert.equal(
				wrapper.find(Table).length,
				1,
				'must contain a Table component'
			);
		});
	});

	describe('props', () => {
		describe('tableWidth', () => {
			it('should set the width style of the underlying Table component', () => {
				const wrapper = shallow(<ScrollTable tableWidth={789} />);
				const tableWrapper = wrapper.find(Table);

				assert.equal(
					_.get(tableWrapper.prop('style'), 'width'),
					789,
					'must set Table style.width'
				);
			});
		});

		describe('hasWordWrap', () => {
			it('should set the `hasWordWrap` props of the underlying Table component', () => {
				const wrapper = shallow(<ScrollTable hasWordWrap={true} />);
				const tableWrapper = wrapper.find(Table);

				assert.equal(
					tableWrapper.prop('hasWordWrap'),
					true,
					'must set Table hasWordWrap'
				);
			});
		});

		describe('root pass throughs', () => {
			let wrapper: any;
			const defaultProps = ScrollTable.defaultProps;

			beforeEach(() => {
				const props = {
					...defaultProps,
					tableWidth: 200,
					hasWordWrap: true, // default is false
					hasBorder: true, // default is false
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = mount(<ScrollTable {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});
			it('passes through its props to the root element.', () => {
				const rootProps = wrapper.first().props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['hasBorder'])).toBe(true);
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);
				expect(wrapper.first().prop(['callbackId'])).toBe(1);

				forEach(
					[
						'data-testid',
						'tableWidth',
						'className',
						'initialState',
						'style',
						'callbackId',
						'hasWordWrap',
						'hasBorder',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(true);
					}
				);
			});
			it('passes through props not defined in `propTypes` to the child Table element.', () => {
				const tableProps = wrapper.find(Table).props();

				// The Table child component omits the ScrollTable props and applies its own defaults
				expect(wrapper.find(Table).prop(['hasBorder'])).toBe(false);

				// Table is paased the ScrollTable value for 'hasWordWrap' and 'style' and any pass throughs
				expect(wrapper.find(Table).prop(['hasWordWrap'])).toBe(true);
				expect(wrapper.find(Table).prop(['style'])).toMatchObject({
					width: 200,
				});

				// The Table passes through callbackId because it is not a DOM element
				expect(wrapper.find(Table).prop(['callbackId'])).toBe(1);

				// Table also gets its default props
				forEach(
					[
						'callbackId',
						'data-testid',
						'style',
						'children',
						'hasWordWrap',
						'hasBorder',
						'density',
						'hasLightHeader',
						'hasHover',
					],
					(prop) => {
						expect(has(tableProps, prop)).toBe(true);
					}
				);
			});
			it('omits select props defined in `propTypes` (plus, in addition, `initialState`) from the root element', () => {
				const tableProps = wrapper.find(Table).props();

				// The table component adds by default, 'density', 'hasBorder', 'hasWordWrap', 'hasLightHeader' and 'hasHover'
				forEach(['tableWidth', 'initialState'], (prop) => {
					expect(has(tableProps, prop)).toBe(false);
				});
			});
		});
	});

	describe('children', () => {
		it('should match the child elements of the Table component', () => {
			assert.equal(
				Thead,
				Table.Thead,
				'Thead child component must match Table.Thead'
			);
			assert.equal(
				Tbody,
				Table.Tbody,
				'Thead child component must match Table.Tbody'
			);
			assert.equal(Tr, Table.Tr, 'Thead child component must match Table.Tr');
			assert.equal(Th, Table.Th, 'Thead child component must match Table.Th');
			assert.equal(Td, Table.Td, 'Thead child component must match Table.Td');
		});
	});
});
