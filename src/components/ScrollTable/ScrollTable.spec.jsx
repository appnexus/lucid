import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
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
