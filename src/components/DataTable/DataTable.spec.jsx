import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import DataTable from './DataTable';
import ScrollTable from '../ScrollTable/ScrollTable';
import Checkbox from '../Checkbox/Checkbox';

const { Column, ColumnGroup } = DataTable;

const testData = [
	{
		'id': '01',
		'first_name': 'Isaac',
		'last_name': 'Newton',
		'email': 'inewton@example.com',
		'occupation': 'Physicist',
	},
	{
		'id': '02',
		'first_name': 'Albert',
		'last_name': 'Einstein',
		'email': 'aeinstein@example.com',
		'occupation': 'Physicist',
	},
	{
		'id': '03',
		'first_name': 'Leonardo',
		'last_name': 'da Vinci',
		'email': 'ldvinci@example.com',
		'occupation': 'Engineer',
	},
	{
		'id': '04',
		'first_name': 'Aristotle',
		'last_name': '--',
		'email': 'aristotle@example.com',
		'occupation': 'Tutor',
	},
	{
		'id': '05',
		'first_name': 'Galileo',
		'last_name': 'Galilei',
		'email': 'ggalilei@example.com',
		'occupation': 'Physicist',
	},
	{
		'id': '06',
		'first_name': 'Charles',
		'last_name': 'Darwin',
		'email': 'cdarwin@example.com',
		'occupation': 'Biologist',
	},
	{
		'id': '07',
		'first_name': 'Alexander',
		'last_name': 'Macedon',
		'email': 'amacedon@example.com',
		'occupation': 'Head of State',
	},
	{
		'id': '08',
		'first_name': 'Plato',
		'last_name': 'Plato',
		'email': 'plato@example.com',
		'occupation': 'Philosopher',
	},
	{
		'id': '09',
		'first_name': 'Mahatma',
		'last_name': 'Gandhi',
		'email': 'mgandhi@example.com',
		'occupation': 'Politician',
	},
	{
		'id': '10',
		'first_name': 'William',
		'last_name': 'Shakespeare',
		'email': 'wshakespear@example.com',
		'occupation': 'Playwright',
	},
];

describe('DataTable', () => {
	common(DataTable);

	describe('render', () => {
		it('should render an minimal ScrollTable', () => {
			const wrapper = shallow(
				<DataTable />
			);

			const scrollTableWrapper = wrapper
				.find(ScrollTable).shallow();

			assert(wrapper.is(ScrollTable), 'must render a ScrollTable');
			assert(wrapper.is('.lucid-DataTable'), 'must have the component className');
			assert.equal(scrollTableWrapper.find(ScrollTable.Thead).length, 1, 'must contain a Thead');
			assert.equal(scrollTableWrapper.find(ScrollTable.Tbody).length, 1, 'must contain a Tbody');
		});
	});

	describe('props', () => {
		describe('data', () => {
			it('should render a row for each element in the array', () => {
				const wrapper = shallow(
					<DataTable data={testData} />
				);

				const TrWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Tbody).shallow()
							.find(ScrollTable.Tr);

				assert.equal(TrWrapper.length, testData.length, 'number of rendered rows must match size of the data array');
			});

			it('should render a cell in each row for each object property in the array elements', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID'/>
						<Column field='first_name' title='First'/>
						<Column field='last_name' title='Last'/>
						<Column field='email' title='Email'/>
						<Column field='occupation' title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table
				const trsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Tbody).shallow()
							.find(ScrollTable.Tr);

				// for each row check that the correct cells are rendered in order
				trsWrapper.forEach((trWrapper, index) => {
					const tdsWrapper = trWrapper.shallow().find(ScrollTable.Td);
					const tdArray = tdsWrapper.map((tdWrapper) => tdWrapper.shallow());

					assert.equal(tdArray[0].text(), _.get(testData[index], 'id'), 'first cell must match id of current row');
					assert.equal(tdArray[1].text(), _.get(testData[index], 'first_name'), 'second cell must match first_name of current row');
					assert.equal(tdArray[2].text(), _.get(testData[index], 'last_name'), 'third cell must match last_name of current row');
					assert.equal(tdArray[3].text(), _.get(testData[index], 'email'), 'fourth cell must match email of current row');
					assert.equal(tdArray[4].text(), _.get(testData[index], 'occupation'), 'fifth cell must match occupation of current row');
				});
			});
		});

		describe('hasExtraWhitespace', () => {
			it('should pass thru to the underlying ScrollTable', () => {
				const wrapper = shallow(
					<DataTable hasExtraWhitespace={true} />
				);

				const scrollTableWrapper = wrapper
					.find(ScrollTable);

				assert.equal(scrollTableWrapper.prop('hasExtraWhitespace'), true, 'must pass `hasExtraWhitespace` thru to the underlying ScrollTable');
			});

			it('should default to false', () => {
				const wrapper = shallow(
					<DataTable />
				);

				const scrollTableWrapper = wrapper
					.find(ScrollTable);

				assert.equal(scrollTableWrapper.prop('hasExtraWhitespace'), false, 'must pass false value as `hasExtraWhitespace` to the underlying ScrollTable');
			});
		});

		describe('isSelectable', () => {
			it('should render a checkbox in the first column of each row', () => {
				const wrapper = shallow(
					<DataTable isSelectable data={testData}>
						<Column field='id' title='ID'/>
						<Column field='first_name' title='First'/>
						<Column field='last_name' title='Last'/>
						<Column field='email' title='Email'/>
						<Column field='occupation' title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table head
				//const headTrsWrapper = wrapper
				//	.find(ScrollTable).shallow()
				//		.find(ScrollTable.Thead).shallow()
				//			.find(ScrollTable.Tr);

				// select the rows of the rendered table body
				const bodyTrsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Tbody).shallow()
							.find(ScrollTable.Tr);

				// for each row check that isSelectable matches
				bodyTrsWrapper.forEach((trWrapper) => {
					const tdsWrapper = trWrapper.shallow().find(ScrollTable.Td);
					const tdArray = tdsWrapper.map((tdWrapper) => tdWrapper.shallow());

					assert.equal(tdArray[0].find(Checkbox).length, 1, 'first cell must be a checkbox');
				});
			});

			it('should default to false', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID'/>
						<Column field='first_name' title='First'/>
						<Column field='last_name' title='Last'/>
						<Column field='email' title='Email'/>
						<Column field='occupation' title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table head
				//const headTrsWrapper = wrapper
				//	.find(ScrollTable).shallow()
				//		.find(ScrollTable.Thead).shallow()
				//			.find(ScrollTable.Tr);

				// select the rows of the rendered table body
				const bodyTrsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Tbody).shallow()
							.find(ScrollTable.Tr);

				// for each row check that isSelectable matches
				bodyTrsWrapper.forEach((trWrapper) => {
					const tdsWrapper = trWrapper.shallow().find(ScrollTable.Td);
					const tdArray = tdsWrapper.map((tdWrapper) => tdWrapper.shallow());

					assert.equal(tdArray[0].find(Checkbox).length, 0, 'first cell must not be a checkbox');
				});
			});
		});

		describe('hasDetails', () => {
			it('should pass thru to the underlying ScrollTable rows', () => {
				const wrapper = shallow(
					<DataTable hasDetails data={testData} />
				);

				// select the rows of the rendered table
				const trsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Tbody).shallow()
							.find(ScrollTable.Tr);

				// for each row check that hasDetails matches
				trsWrapper.forEach((trWrapper) => {
					assert.equal(trWrapper.prop('hasDetails'), true);
				});
			});

			it('should default to false', () => {
				const wrapper = shallow(
					<DataTable data={testData} />
				);

				// select the rows of the rendered table
				const trsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Tbody).shallow()
							.find(ScrollTable.Tr);

				// for each row check that hasDetails is false
				trsWrapper.forEach((trWrapper) => {
					assert.equal(trWrapper.prop('hasDetails'), false);
				});
			});
		});

		describe('onSelect', () => {
			it('should be triggered when a checkbox is selected passing params row data and index', () => {
				const onSelect = sinon.spy();
				const wrapper = shallow(
					<DataTable isSelectable onSelect={onSelect} data={testData}>
						<Column field='id' title='ID'/>
						<Column field='first_name' title='First'/>
						<Column field='last_name' title='Last'/>
						<Column field='email' title='Email'/>
						<Column field='occupation' title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table body
				const bodyTrsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Tbody).shallow()
							.find(ScrollTable.Tr);

				// for each row check that isSelectable matches
				bodyTrsWrapper.forEach((trWrapper, index) => {
					const tdsWrapper = trWrapper.shallow().find(ScrollTable.Td);
					const tdArray = tdsWrapper.map((tdWrapper) => tdWrapper.shallow());
					const checkBoxOnSelectFunction = tdArray[0].find(Checkbox).prop('onSelect');
					checkBoxOnSelectFunction({});

					assert.equal(onSelect.callCount, index + 1, 'must be called');
					assert.equal(onSelect.getCall(index).args[0], testData[index], 'first arg must match the selected row data');
					assert.equal(onSelect.getCall(index).args[1], index, 'second arg must match the clicked row index');
					assert(_.has(onSelect.getCall(index).args[2], 'props'), 'third arg must include props');
					assert(_.has(onSelect.getCall(index).args[2], 'event'), 'third arg must include event');
				});
			});
		});

		describe('onSelectAll', () => {
			it('should be triggered when a checkbox is selected passing params row data and index', () => {
				const onSelectAll = sinon.spy();
				const wrapper = shallow(
					<DataTable isSelectable onSelectAll={onSelectAll} data={testData}>
						<Column field='id' title='ID'/>
						<Column field='first_name' title='First'/>
						<Column field='last_name' title='Last'/>
						<Column field='email' title='Email'/>
						<Column field='occupation' title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Thead).shallow()
							.find(ScrollTable.Tr);

				const firstHeadCellWrapper = headTrsWrapper.shallow().find(ScrollTable.Th).first();
				const selectAllCheckboxWrapper = firstHeadCellWrapper.find(Checkbox);
				const checkboxSelectAllFunction = selectAllCheckboxWrapper.prop('onSelect');
				checkboxSelectAllFunction({});

				assert(onSelectAll.called, 'onSelectAll handler must be called');
			});
		});

		describe('onRowClick', () => {
			it('should be triggered when row is clicked', () => {
				const onRowClick = sinon.spy();
				const wrapper = shallow(
					<DataTable hasDetails onRowClick={onRowClick} data={testData}>
						<Column field='id' title='ID'/>
						<Column field='first_name' title='First'/>
						<Column field='last_name' title='Last'/>
						<Column field='email' title='Email'/>
						<Column field='occupation' title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table body
				const bodyTrsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Tbody).shallow()
							.find(ScrollTable.Tr);

				// for each row check that isSelectable matches
				bodyTrsWrapper.forEach((trWrapper, index) => {
					const rowClickFunction = trWrapper.prop('onClick');
					rowClickFunction({ target: { tagName: 'tr' } });
					assert.equal(onRowClick.callCount, index + 1, 'must be called');
					assert.equal(onRowClick.getCall(index).args[0], testData[index], 'first arg must match the selected row data');
					assert.equal(onRowClick.getCall(index).args[1], index, 'second arg must match the clicked row index');
					assert(_.has(onRowClick.getCall(index).args[2], 'props'), 'third arg must include props');
					assert(_.has(onRowClick.getCall(index).args[2], 'event'), 'third arg must include event');
				});
			});
		});

		describe('onSort', () => {
			it('should be triggered when a column header with `isSortable` is clicked', () => {
				const onSort = sinon.spy();
				const wrapper = shallow(
					<DataTable hasDetails onSort={onSort} data={testData}>
						<Column field='id' isSortable title='ID'/>
						<Column field='first_name' isSortable title='First'/>
						<Column field='last_name' isSortable title='Last'/>
						<Column field='email' isSortable title='Email'/>
						<Column field='occupation' isSortable title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Thead).shallow()
							.find(ScrollTable.Tr);

				const thsWrapper = headTrsWrapper.shallow().find(ScrollTable.Th);
				const tdArray = thsWrapper.map((tdWrapper) => tdWrapper.shallow());
				const mockEvent = { stopPropagation: _.noop, preventDefault: _.noop };

				tdArray[0].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 1, 'must be called once');
				assert.equal(onSort.getCall(0).args[0], 'id', 'first arg must be passed `id` as the field name');
				assert(_.has(onSort.getCall(0).args[1], 'props'), 'last arg must be passed props');
				assert(_.has(onSort.getCall(0).args[1], 'event'), 'last arg must be passed event');

				tdArray[1].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 2, 'must be called twice');
				assert.equal(onSort.getCall(1).args[0], 'first_name', 'first arg must be passed `first_name` as the field name');
				assert(_.has(onSort.getCall(1).args[1], 'props'), 'last arg must be passed props');
				assert(_.has(onSort.getCall(1).args[1], 'event'), 'last arg must be passed event');

				tdArray[2].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 3, 'must be called three times');
				assert.equal(onSort.getCall(2).args[0], 'last_name', 'first arg must be passed `last_name` as the field name');
				assert(_.has(onSort.getCall(2).args[1], 'props'), 'last arg must be passed props');
				assert(_.has(onSort.getCall(2).args[1], 'event'), 'last arg must be passed event');

				tdArray[3].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 4, 'must be called four times');
				assert.equal(onSort.getCall(3).args[0], 'email', 'first arg must be passed `email` as the field name');
				assert(_.has(onSort.getCall(3).args[1], 'props'), 'last arg must be passed props');
				assert(_.has(onSort.getCall(3).args[1], 'event'), 'last arg must be passed event');

				tdArray[4].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 5, 'must be called five times');
				assert.equal(onSort.getCall(4).args[0], 'occupation', 'first arg must be passed `occupation` as the field name');
				assert(_.has(onSort.getCall(4).args[1], 'props'), 'last arg must be passed props');
				assert(_.has(onSort.getCall(4).args[1], 'event'), 'last arg must be passed event');
			});
		});
	});

	describe('child components', () => {
		describe('Column', () => {
			it('should render a column in the header for each Column defined', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID'/>
						<Column field='first_name' title='First'/>
						<Column field='last_name' title='Last'/>
						<Column field='email' title='Email'/>
						<Column field='occupation' title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Thead).shallow()
							.find(ScrollTable.Tr);

				const thsWrapper = headTrsWrapper.shallow().find(ScrollTable.Th);
				const tdArray = thsWrapper.map((tdWrapper) => tdWrapper.shallow());

				assert.equal(tdArray[0].text(), 'ID', 'first column must render correct title');
				assert.equal(tdArray[1].text(), 'First', 'second column must render correct title');
				assert.equal(tdArray[2].text(), 'Last', 'third column must render correct title');
				assert.equal(tdArray[3].text(), 'Email', 'fourth column must render correct title');
				assert.equal(tdArray[4].text(), 'Occupation', 'last column must render correct title');
			});
		});

		describe('ColumnGroup', () => {
			it('should render a cell with colspan in the header for each Column defined within', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID'/>
						<ColumnGroup title='Name'>
							<Column field='first_name' title='First'/>
							<Column field='last_name' title='Last'/>
						</ColumnGroup>
						<Column field='email' title='Email'/>
						<Column field='occupation' title='Occupation'/>
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable).shallow()
						.find(ScrollTable.Thead).shallow()
							.find(ScrollTable.Tr);

				const thsFirstRowWrapper = headTrsWrapper.at(0).shallow().find(ScrollTable.Th);
				const thsSecondRowWrapper = headTrsWrapper.at(1).shallow().find(ScrollTable.Th);
				const thFirstRowArray = thsFirstRowWrapper.map((thWrapper) => thWrapper.shallow());
				const thSecondRowArray = thsSecondRowWrapper.map((thWrapper) => thWrapper.shallow());

				assert.equal(thFirstRowArray[0].text(), 'ID', 'must render correct title');
				assert.equal(thFirstRowArray[0].prop('rowSpan'), 2, 'rowSpan must be 2');
				assert.equal(thFirstRowArray[1].text(), 'Name', 'must render correct title for grouped column');
				assert.equal(thFirstRowArray[1].prop('colSpan'), 2, 'colSpan must be 2 for grouped column');
				assert.equal(thSecondRowArray[0].text(), 'First', 'must render correct title');
				assert(!_.isEqual(thSecondRowArray[0].prop('rowSpan'), 2), 'rowSpan must not be 2');
				assert.equal(thSecondRowArray[1].text(), 'Last', 'must render correct title');
				assert(!_.isEqual(thSecondRowArray[1].prop('rowSpan'), 2), 'rowSpan must not be 2');
				assert.equal(thFirstRowArray[2].text(), 'Email', 'must render correct title');
				assert.equal(thFirstRowArray[2].prop('rowSpan'), 2, 'rowSpan must be 2');
				assert.equal(thFirstRowArray[3].text(), 'Occupation', 'must render correct title');
				assert.equal(thFirstRowArray[3].prop('rowSpan'), 2, 'rowSpan must be 2');
			});
		});
	});
});
