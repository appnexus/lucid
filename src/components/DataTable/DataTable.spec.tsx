import React from 'react';
import _ from 'lodash';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import DataTable from './DataTable';
import ScrollTable from '../ScrollTable/ScrollTable';
import Table from '../Table/Table';
import Checkbox from '../Checkbox/Checkbox';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

const { Column, ColumnGroup } = DataTable;

const {
	EmptyStateWrapper: { Title, Body },
} = DataTable;

const testData: any = [
	{
		id: '01',
		first_name: 'Isaac',
		last_name: 'Newton',
		email: 'inewton@example.com',
		occupation: 'Physicist',
		isDisabled: true,
		isSelected: true,
		isActive: true,
	},
	{
		id: '02',
		first_name: 'Albert',
		last_name: 'Einstein',
		email: 'aeinstein@example.com',
		occupation: 'Physicist',
		isDisabled: false,
		isSelected: false,
		isActive: false,
	},
	{
		id: '03',
		first_name: 'Leonardo',
		last_name: 'da Vinci',
		email: 'ldvinci@example.com',
		occupation: 'Engineer',
		isDisabled: true,
		isSelected: true,
		isActive: true,
	},
	{
		id: '04',
		first_name: 'Aristotle',
		last_name: '--',
		email: 'aristotle@example.com',
		occupation: 'Tutor',
		isDisabled: false,
		isSelected: false,
		isActive: false,
	},
	{
		id: '05',
		first_name: 'Galileo',
		last_name: 'Galilei',
		email: 'ggalilei@example.com',
		occupation: 'Physicist',
		isDisabled: false,
		isSelected: true,
		isActive: true,
	},
	{
		id: '06',
		first_name: 'Charles',
		last_name: 'Darwin',
		email: 'cdarwin@example.com',
		occupation: 'Biologist',
		isDisabled: true,
		isSelected: false,
		isActive: false,
	},
	{
		id: '07',
		first_name: 'Alexander',
		last_name: 'Macedon',
		email: 'amacedon@example.com',
		occupation: 'Head of State',
		isDisabled: true,
		isSelected: false,
		isActive: true,
	},
	{
		id: '08',
		first_name: 'Plato',
		last_name: 'Plato',
		email: 'plato@example.com',
		occupation: 'Philosopher',
		isDisabled: false,
		isSelected: true,
		isActive: false,
	},
	{
		id: '09',
		first_name: 'Mahatma',
		last_name: 'Gandhi',
		email: 'mgandhi@example.com',
		occupation: 'Politician',
		isDisabled: true,
		isSelected: true,
		isActive: false,
	},
	{
		id: '10',
		first_name: 'William',
		last_name: 'Shakespeare',
		email: 'wshakespear@example.com',
		occupation: 'Playwright',
		isDisabled: false,
		isSelected: false,
		isActive: true,
	},
];

describe('DataTable', () => {
	common(DataTable, {
		selectRoot: (wrapper: any) => wrapper.find(ScrollTable),
	} as any);

	describe('render', () => {
		it('should render a minimal ScrollTable', () => {
			const wrapper = shallow(<DataTable data={[]} />);

			const scrollTableWrapper = wrapper.find(ScrollTable).shallow();

			assert(
				scrollTableWrapper.is('.lucid-DataTable'),
				'must have the component className'
			);
			assert.equal(
				scrollTableWrapper.find(ScrollTable.Thead).length,
				1,
				'must contain a Thead'
			);
			assert.equal(
				scrollTableWrapper.find(ScrollTable.Tbody).length,
				1,
				'must contain a Tbody'
			);
		});
	});

	describe('props', () => {
		const defaultProps = DataTable.defaultProps;

		describe('data', () => {
			it('should render 10 empty rows by default if data is an empty array', () => {
				const wrapper = shallow(<DataTable data={[]} />);

				const TrWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				assert.equal(TrWrapper.length, 10, 'should render 10 empty rows');
			});

			it('should render a row for each element in the array if data size is greater than or equal to 10', () => {
				const wrapper = shallow(<DataTable data={testData} />);

				const TrWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				assert.equal(
					TrWrapper.length,
					testData.length,
					'number of rendered rows must match size of the data array'
				);
			});

			it('should render a cell in each row for each object property in the array elements', () => {
				const testDataWithEmptyCells: any = [
					{
						id: 1,
						first_name: 'Isaac',
						email: 'inewton@example.com',
						occupation: 'Physicist',
						isDisabled: true,
						isSelected: true,
						isActive: true,
					},
					{
						id: 2,
						first_name: 'Albert',
						last_name: null,
						email: 'aeinstein@example.com',
						occupation: 'Physicist',
						isDisabled: false,
						isSelected: false,
						isActive: false,
					},
				];

				const wrapper = shallow(
					<DataTable data={testDataWithEmptyCells}>
						<Column field='id' title='ID' />
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table
				const trsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				// for each row check that the correct cells are rendered in order
				trsWrapper.forEach((trWrapper, index) => {
					if (index < 2) {
						const tdsWrapper = trWrapper.shallow().find(ScrollTable.Td);

						assert.equal(
							trWrapper.props().isDisabled,
							_.get(testDataWithEmptyCells[index], 'isDisabled'),
							'row must be passed `isDisabled`'
						);
						assert.equal(
							trWrapper.props().isSelected,
							_.get(testDataWithEmptyCells[index], 'isSelected'),
							'row must be passed `isSelected`'
						);
						assert.equal(
							trWrapper.props().isActive,
							_.get(testDataWithEmptyCells[index], 'isActive'),
							'row must be passed `isActive`'
						);

						assert.equal(
							tdsWrapper.at(0).children().text(),
							_.get(testDataWithEmptyCells[index], 'id'),
							'first cell must match id of current row'
						);
						assert(
							!tdsWrapper.at(0).prop('isEmpty'),
							'should not be marked as empty, despite not being a string'
						);
						assert.equal(
							tdsWrapper.at(1).children().text(),
							_.get(testDataWithEmptyCells[index], 'first_name'),
							'second cell must match first_name of current row'
						);
						assert.equal(
							tdsWrapper.at(2).children().text(),
							'--',
							'third (empty) cell should be `--`'
						);
						assert.equal(
							tdsWrapper.at(3).children().text(),
							_.get(testDataWithEmptyCells[index], 'email'),
							'fourth cell must match email of current row'
						);
						assert.equal(
							tdsWrapper.at(4).children().text(),
							_.get(testDataWithEmptyCells[index], 'occupation'),
							'fifth cell must match occupation of current row'
						);
					}
				});
			});

			it('should render without prop warning for isSelected when data is empty array', () => {
				const emptyData: any = [];

				const wrapper = shallow(<DataTable isSelectable data={emptyData} />);

				expect(wrapper.find(Checkbox).props().isSelected).toEqual(false);
			});
		});

		describe('minRows', () => {
			it('should render 10 empty rows if data is an empty array', () => {
				const wrapper = shallow(<DataTable data={[]} />);

				const TrWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				assert.equal(TrWrapper.length, 10, 'should render 10 empty rows');
			});

			it('should render a row for each element in the array if there is more data than `minRows`', () => {
				const wrapper = shallow(<DataTable data={testData} minRows={7} />);

				const TrWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				assert.equal(
					TrWrapper.length,
					testData.length,
					'number of rendered rows must match size of the data array'
				);
			});

			it('should render at least the number of `minRows` if there is less data than `minRows`', () => {
				const wrapper = shallow(<DataTable data={testData} minRows={14} />);

				const TrWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				assert.equal(
					TrWrapper.length,
					14,
					'number of rendered rows must match `minRows` value'
				);
			});
		});

		describe('isSelectable', () => {
			it('should render a checkbox in the first column of each row', () => {
				const wrapper = shallow(
					<DataTable isSelectable data={testData}>
						<Column field='id' title='ID' />
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table body
				const bodyTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				// for each row check that isSelectable matches
				bodyTrsWrapper.forEach((trWrapper) => {
					const tdsWrapper = trWrapper.shallow().find(ScrollTable.Td);
					const tdArray = tdsWrapper.map((tdWrapper) => tdWrapper.shallow());

					assert.equal(
						tdArray[0].find(Checkbox).length,
						1,
						'first cell must be a checkbox'
					);
				});
			});

			it('should default to false', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID' />
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table body
				const bodyTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				// for each row check that isSelectable matches
				bodyTrsWrapper.forEach((trWrapper) => {
					const tdsWrapper = trWrapper.shallow().find(ScrollTable.Td);
					const tdArray = tdsWrapper.map((tdWrapper) => tdWrapper.shallow());

					assert.equal(
						tdArray[0].find(Checkbox).length,
						0,
						'first cell must not be a checkbox'
					);
				});
			});
		});

		describe('isActionable', () => {
			it('should pass thru to the underlying ScrollTable rows', () => {
				const wrapper = shallow(<DataTable isActionable data={testData} />);

				// select the rows of the rendered table
				const trsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				// for each row check that isActionable matches
				trsWrapper.forEach((trWrapper) => {
					assert.equal(trWrapper.prop('isActionable'), true);
				});
			});

			it('should default to false', () => {
				const wrapper = shallow(<DataTable data={testData} />);

				// select the rows of the rendered table
				const trsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				// for each row check that isActionable is false
				trsWrapper.forEach((trWrapper) => {
					assert.equal(trWrapper.prop('isActionable'), false);
				});
			});
		});

		describe('onSelect', () => {
			it('should be triggered when a checkbox is selected passing params row data and index', () => {
				const onSelect: any = sinon.spy();
				const wrapper = shallow(
					<DataTable isSelectable onSelect={onSelect} data={testData}>
						<Column field='id' title='ID' />
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table body
				const bodyTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				// for each row check that isSelectable matches
				bodyTrsWrapper.forEach((trWrapper, index) => {
					const tdsWrapper = trWrapper.shallow().find(ScrollTable.Td);
					const tdArray = tdsWrapper.map((tdWrapper) => tdWrapper.shallow());
					const checkBoxOnSelectFunction = tdArray[0]
						.find(Checkbox)
						.prop('onSelect');
					// @ts-ignore
					checkBoxOnSelectFunction({});

					assert.equal(onSelect.callCount, index + 1, 'must be called');
					assert.equal(
						onSelect.getCall(index).args[0],
						testData[index],
						'first arg must match the selected row data'
					);
					assert.equal(
						onSelect.getCall(index).args[1],
						index,
						'second arg must match the clicked row index'
					);
					assert(
						_.has(onSelect.getCall(index).args[2], 'props'),
						'third arg must include props'
					);
					assert(
						_.has(onSelect.getCall(index).args[2], 'event'),
						'third arg must include event'
					);
				});
			});

			it('should have inDeterminate on the header checkbox when data is partially selected', () => {
				const wrapper = shallow(
					<DataTable isSelectable data={testData}>
						<Column field='id' title='ID' />
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Thead)
					.shallow()
					.find(ScrollTable.Tr);

				const firstHeadCellWrapper = headTrsWrapper
					.shallow()
					.find(ScrollTable.Th)
					.first();
				const selectAllCheckboxWrapper = firstHeadCellWrapper.find(Checkbox);
				assert.equal(
					true,
					selectAllCheckboxWrapper.prop('isIndeterminate'),
					'The CheckBox should be in an indeterminate state'
				);
			});
		});

		describe('onSelectAll', () => {
			it('should be triggered when a checkbox is selected passing params row data and index', () => {
				const onSelectAll = sinon.spy();
				const wrapper = shallow(
					<DataTable isSelectable onSelectAll={onSelectAll} data={testData}>
						<Column field='id' title='ID' />
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Thead)
					.shallow()
					.find(ScrollTable.Tr);

				const firstHeadCellWrapper = headTrsWrapper
					.shallow()
					.find(ScrollTable.Th)
					.first();
				const selectAllCheckboxWrapper = firstHeadCellWrapper.find(Checkbox);
				const checkboxSelectAllFunction =
					selectAllCheckboxWrapper.prop('onSelect');
				//@ts-ignore
				checkboxSelectAllFunction({});

				assert(onSelectAll.called, 'onSelectAll handler must be called');
			});
		});

		describe('onRowClick', () => {
			it('should be triggered when row is clicked', () => {
				const onRowClick = sinon.spy();
				const wrapper = shallow(
					<DataTable isActionable onRowClick={onRowClick} data={testData}>
						<Column field='id' title='ID' />
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table body
				const bodyTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Tbody)
					.shallow()
					.find(ScrollTable.Tr);

				// for each row check that isSelectable matches
				bodyTrsWrapper.forEach((trWrapper, index) => {
					const rowClickFunction = trWrapper.prop('onClick');
					// @ts-ignore
					rowClickFunction({ target: { tagName: 'tr' } });
					assert.equal(onRowClick.callCount, index + 1, 'must be called');
					assert.equal(
						onRowClick.getCall(index).args[0],
						testData[index],
						'first arg must match the selected row data'
					);
					assert.equal(
						onRowClick.getCall(index).args[1],
						index,
						'second arg must match the clicked row index'
					);
					assert(
						_.has(onRowClick.getCall(index).args[2], 'props'),
						'third arg must include props'
					);
					assert(
						_.has(onRowClick.getCall(index).args[2], 'event'),
						'third arg must include event'
					);
				});
			});
		});

		describe('onSort', () => {
			it('should be triggered when a column header with `isSortable` is clicked', () => {
				const onSort = sinon.spy();
				const wrapper = shallow(
					<DataTable isActionable onSort={onSort} data={testData}>
						<Column field='id' isSortable title='ID' />
						<Column field='first_name' isSortable title='First' />
						<Column field='last_name' isSortable title='Last' />
						<Column field='email' isSortable title='Email' />
						<Column field='occupation' isSortable title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Thead)
					.shallow()
					.find(ScrollTable.Tr);

				const thsWrapper = headTrsWrapper.shallow().find(ScrollTable.Th);
				const tdArray = thsWrapper.map((tdWrapper) => tdWrapper.shallow());
				const mockEvent = { stopPropagation: _.noop, preventDefault: _.noop };

				tdArray[0].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 1, 'must be called once');
				assert.equal(
					onSort.getCall(0).args[0],
					'id',
					'first arg must be passed `id` as the field name'
				);
				assert(
					_.has(onSort.getCall(0).args[1], 'props'),
					'last arg must be passed props'
				);
				assert(
					_.has(onSort.getCall(0).args[1], 'event'),
					'last arg must be passed event'
				);

				tdArray[1].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 2, 'must be called twice');
				assert.equal(
					onSort.getCall(1).args[0],
					'first_name',
					'first arg must be passed `first_name` as the field name'
				);
				assert(
					_.has(onSort.getCall(1).args[1], 'props'),
					'last arg must be passed props'
				);
				assert(
					_.has(onSort.getCall(1).args[1], 'event'),
					'last arg must be passed event'
				);

				tdArray[2].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 3, 'must be called three times');
				assert.equal(
					onSort.getCall(2).args[0],
					'last_name',
					'first arg must be passed `last_name` as the field name'
				);
				assert(
					_.has(onSort.getCall(2).args[1], 'props'),
					'last arg must be passed props'
				);
				assert(
					_.has(onSort.getCall(2).args[1], 'event'),
					'last arg must be passed event'
				);

				tdArray[3].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 4, 'must be called four times');
				assert.equal(
					onSort.getCall(3).args[0],
					'email',
					'first arg must be passed `email` as the field name'
				);
				assert(
					_.has(onSort.getCall(3).args[1], 'props'),
					'last arg must be passed props'
				);
				assert(
					_.has(onSort.getCall(3).args[1], 'event'),
					'last arg must be passed event'
				);

				tdArray[4].simulate('click', mockEvent);
				assert.equal(onSort.callCount, 5, 'must be called five times');
				assert.equal(
					onSort.getCall(4).args[0],
					'occupation',
					'first arg must be passed `occupation` as the field name'
				);
				assert(
					_.has(onSort.getCall(4).args[1], 'props'),
					'last arg must be passed props'
				);
				assert(
					_.has(onSort.getCall(4).args[1], 'event'),
					'last arg must be passed event'
				);
			});
		});

		describe('isLoading', () => {
			it('should show a `LoadingIndicator` if `isLoading`', () => {
				const wrapper = shallow(<DataTable data={[]} isLoading />);

				const loadingIndicatorWrapper = wrapper
					.find(EmptyStateWrapper)
					.shallow()
					.find('LoadingIndicator');

				assert(loadingIndicatorWrapper.prop('isLoading'));
			});
		});

		describe('anchorMessage', () => {
			it('should position the `LoadingMessage`/`EmpyStateMessage` near the top of the table', () => {
				const loadingWrapper = shallow(
					<DataTable data={[]} isLoading anchorMessage />
				);

				const loadingOverlayWrapper = loadingWrapper
					.find(EmptyStateWrapper)
					.shallow()
					.find('LoadingIndicator')
					.shallow()
					.find('OverlayWrapper');

				assert(loadingOverlayWrapper.prop('anchorMessage'));

				const emptyWrapper = shallow(<DataTable data={[]} anchorMessage />);

				const emptyOverlayWrapper = emptyWrapper
					.find(EmptyStateWrapper)
					.shallow()
					.find('OverlayWrapper');

				assert(emptyOverlayWrapper.prop('anchorMessage'));
			});
		});

		describe('isFullWidth', () => {
			it('should apply the `&-full-width` class if `isFullWidth` is true', () => {
				const wrapper = shallow(<DataTable data={[]} isFullWidth />);

				assert(
					wrapper.find(ScrollTable).hasClass('lucid-DataTable-full-width')
				);
			});
		});

		describe('isResizeable', () => {
			it('should render a `DragCaptureZone` resizer, if `isResizable` equals true', () => {
				const wrapper = mount(
					<DataTable hasFixedHeader data={testData}>
						<Column field='id' isResizable title='ID' />
						<Column field='first_name' isResizable title='First' />
						<Column field='last_name' isResizable title='Last' />
						<Column field='email' isResizable title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);
				expect(wrapper.find(DragCaptureZone)).toHaveLength(4);
			});
		});

		describe('hasFixedHeader', () => {
			it('should render a `Table` -- not a `ScrollTable` -- if true', () => {
				const wrapper = shallow(
					<DataTable hasFixedHeader={true} data={testData}></DataTable>
				);
				expect(wrapper.find('.lucid-DataTable-fixed')).toHaveLength(1);
				expect(wrapper.find('.lucid-DataTable-fixed-header')).toHaveLength(1);
				expect(
					wrapper.find('.lucid-DataTable-fixed-header-fixed-columns')
				).toHaveLength(1);
				expect(wrapper.find(ScrollTable)).toHaveLength(0);
			});
			it('should render a `ScrollTable`, if false', () => {
				const wrapper = shallow(
					<DataTable hasFixedHeader={false} data={testData}></DataTable>
				);
				expect(wrapper.find('.lucid-DataTable-fixed')).toHaveLength(0);
				expect(wrapper.find('.lucid-DataTable-fixed-header')).toHaveLength(0);
				expect(
					wrapper.find('.lucid-DataTable-fixed-header-fixed-columns')
				).toHaveLength(0);
				expect(wrapper.find(ScrollTable)).toHaveLength(1);
			});
		});

		describe('passThroughs', () => {
			const props = {
				data: [],
				emptyCellText: '--test',
				isActionable: true,
				isFullWidth: true,
				isLoading: false,
				isSelectable: true,
				anchorMessage: true,
				style: {},
				minRows: 5,
				hasFixedHeader: true,
				fixedColumnCount: 2,
				fixedRowHeight: 1,
				truncateContent: false,
				initialState: {},
				onRowClick: _.noop,
				onSelect: _.noop,
				onSelectAll: _.noop,
				onSort: _.noop,
				onResize: _.noop,
				Column: [
					<Column field='id' title='ID' />,
					<Column field='email' title='Email' />,
					<Column field='occupation' title='Occupation' />,
				],
				ColumnGroup: [
					<ColumnGroup title='Name'>
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
					</ColumnGroup>,
				],
			};

			const excludedProps = [
				'emptyCellText',
				'isActionable',
				'isFullWidth',
				'isSelectable',
				'minRows',
				'fixedRowHeight',
				'truncateContent',
				'initialState',
				'Column',
				'ColumnGroup',
				'onRowClick',
				'onSelect',
				'onSelectAll',
				'onSort',
				'onResize',
			];

			const includedProps = [
				'style',
				'className',
				'children',
				'density',
				'hasBorder',
				'hasWordWrap',
				'hasLightHeader',
				'hasHover',
			];

			it('omits all unused DataTable props types and the "initialState" props from the root Table component', () => {
				const wrapper = shallow(<DataTable {...props}></DataTable>);

				const headerFixedColumnProps = _.keys(
					wrapper
						.find('Table.lucid-DataTable-fixed-header-fixed-columns-Table')
						.props()
				);

				const headerUnfixedColumnProps = _.keys(
					wrapper
						.find('Table.lucid-DataTable-fixed-header-unfixed-columns-Table')
						.props()
				);

				const bodyFixedColumnProps = _.keys(
					wrapper
						.find('Table.lucid-DataTable-fixed-body-fixed-columns-Table')
						.props()
				);

				const bodyUnfixedColumnProps = _.keys(
					wrapper
						.find('Table.lucid-DataTable-fixed-body-unfixed-columns-Table')
						.props()
				);

				// The root Table header and body elements should not contain any of
				// the excluded (the unused) DataTable propTypes and 'initialState':
				// 'emptyCellText', 'isActionable', 'isFullWidth', 'isSelectable', 'minRows',
				// 'fixedRowHeight', 'truncateContent', 'initialState', 'Column', 'ColumnHeader'
				// 'onRowClick', 'onSelect', 'onSelectAll', 'onSort', 'onResize';

				_.forEach(excludedProps, (prop) => {
					expect(_.includes(headerFixedColumnProps, prop)).toBe(false);
				});

				_.forEach(excludedProps, (prop) => {
					expect(_.includes(headerUnfixedColumnProps, prop)).toBe(false);
				});

				_.forEach(excludedProps, (prop) => {
					expect(_.includes(bodyFixedColumnProps, prop)).toBe(false);
				});

				_.forEach(excludedProps, (prop) => {
					expect(_.includes(bodyUnfixedColumnProps, prop)).toBe(false);
				});

				// The root Table header and body elements should include
				// 'style', 'className', 'children', 'density', 'hasBorder', 'hasWordWrap', 'hasLightHeader', 'hasHover'

				_.forEach(includedProps, (prop) => {
					expect(_.includes(headerFixedColumnProps, prop)).toBe(true);
				});

				_.forEach(includedProps, (prop) => {
					expect(_.includes(headerUnfixedColumnProps, prop)).toBe(true);
				});

				_.forEach(includedProps, (prop) => {
					expect(_.includes(bodyFixedColumnProps, prop)).toBe(true);
				});

				_.forEach(includedProps, (prop) => {
					expect(_.includes(bodyUnfixedColumnProps, prop)).toBe(true);
				});
			});

			it('omits all unused DataTable props types and the "initialState" props from the root ScrollTable', () => {
				const includedScrollTableProps = _.omit(includedProps, [
					'hasLightHeader',
					'density',
				]);

				const wrapper = shallow(
					<DataTable {...props} hasFixedHeader={false}></DataTable>
				);

				const scrollTableProps = _.keys(wrapper.find(ScrollTable).props());

				// The root ScrollTable header and body elements should not contain any of
				// the excluded (the unused) DataTable propTypes and 'initialState':
				// 'emptyCellText', 'isActionable', 'isFullWidth', 'isSelectable', 'minRows',
				// 'fixedRowHeight', 'truncateContent', 'initialState', 'Column', 'ColumnHeader'
				// 'onRowClick', 'onSelect', 'onSelectAll', 'onSort', 'onResize';

				_.forEach(excludedProps, (prop) => {
					expect(_.includes(scrollTableProps, prop)).toBe(false);
				});

				// The root ScrollTable header and body elements should include
				// 'style', 'className', 'children', 'hasBorder', 'hasWordWrap', 'hasHover'

				_.forEach(includedScrollTableProps, (prop) => {
					expect(_.includes(includedScrollTableProps, prop)).toBe(true);
				});
			});
		});
	});

	describe('child components', () => {
		describe('Column', () => {
			it('should render a column in the header for each Column defined', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID' />
						<Column field='first_name' title='First' />
						<Column field='last_name' title='Last' />
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Thead)
					.shallow()
					.find(ScrollTable.Tr);

				const thsWrapper = headTrsWrapper.shallow().find(ScrollTable.Th);
				const tdArray = thsWrapper.map((tdWrapper) => tdWrapper.shallow());

				assert.equal(
					tdArray[0].text(),
					'ID',
					'first column must render correct title'
				);
				assert.equal(
					tdArray[1].text(),
					'First',
					'second column must render correct title'
				);
				assert.equal(
					tdArray[2].text(),
					'Last',
					'third column must render correct title'
				);
				assert.equal(
					tdArray[3].text(),
					'Email',
					'fourth column must render correct title'
				);
				assert.equal(
					tdArray[4].text(),
					'Occupation',
					'last column must render correct title'
				);
			});
		});

		describe('ColumnGroup', () => {
			it('should render a cell with colspan in the header for each Column defined within', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID' />
						<ColumnGroup title='Name'>
							<Column field='first_name' title='First' />
							<Column field='last_name' title='Last' />
						</ColumnGroup>
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				// select the rows of the rendered table head
				const headTrsWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Thead)
					.shallow()
					.find(ScrollTable.Tr);

				const thsFirstRowWrapper = headTrsWrapper
					.at(0)
					.shallow()
					.find(ScrollTable.Th);
				const thsSecondRowWrapper = headTrsWrapper
					.at(1)
					.shallow()
					.find(ScrollTable.Th);
				const thFirstRowArray = thsFirstRowWrapper.map((thWrapper) =>
					thWrapper.shallow()
				);
				const thSecondRowArray = thsSecondRowWrapper.map((thWrapper) =>
					thWrapper.shallow()
				);

				assert.equal(
					thFirstRowArray[0].text(),
					'ID',
					'must render correct title'
				);
				assert.equal(
					thFirstRowArray[0].prop('rowSpan'),
					2,
					'rowSpan must be 2'
				);
				assert.equal(
					thFirstRowArray[1].text(),
					'Name',
					'must render correct title for grouped column'
				);
				assert.equal(
					thFirstRowArray[1].prop('colSpan'),
					2,
					'colSpan must be 2 for grouped column'
				);
				assert.equal(
					thSecondRowArray[0].text(),
					'First',
					'must render correct title'
				);
				assert(
					!_.isEqual(thSecondRowArray[0].prop('rowSpan'), 2),
					'rowSpan must not be 2'
				);
				assert.equal(
					thSecondRowArray[1].text(),
					'Last',
					'must render correct title'
				);
				assert(
					!_.isEqual(thSecondRowArray[1].prop('rowSpan'), 2),
					'rowSpan must not be 2'
				);
				assert.equal(
					thFirstRowArray[2].text(),
					'Email',
					'must render correct title'
				);
				assert.equal(
					thFirstRowArray[2].prop('rowSpan'),
					2,
					'rowSpan must be 2'
				);
				assert.equal(
					thFirstRowArray[3].text(),
					'Occupation',
					'must render correct title'
				);
				assert.equal(
					thFirstRowArray[3].prop('rowSpan'),
					2,
					'rowSpan must be 2'
				);
			});

			it('should default to align=center', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID' />
						<ColumnGroup title='Name'>
							<Column field='first_name' title='First' />
							<Column field='last_name' title='Last' />
						</ColumnGroup>
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				const thWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Thead)
					.shallow()
					.find(ScrollTable.Tr)
					.first()
					.shallow()
					.find(ScrollTable.Th)
					.at(1)
					.shallow();

				assert(thWrapper.hasClass('lucid-Table-align-center'), 'must be true');
			});

			it('should respect align prop', () => {
				const wrapper = shallow(
					<DataTable data={testData}>
						<Column field='id' title='ID' />
						<ColumnGroup title='Name' align='right'>
							<Column field='first_name' title='First' />
							<Column field='last_name' title='Last' />
						</ColumnGroup>
						<Column field='email' title='Email' />
						<Column field='occupation' title='Occupation' />
					</DataTable>
				);

				const thWrapper = wrapper
					.find(ScrollTable)
					.shallow()
					.find(ScrollTable.Thead)
					.shallow()
					.find(ScrollTable.Tr)
					.first()
					.shallow()
					.find(ScrollTable.Th)
					.at(1)
					.shallow();

				assert(thWrapper.hasClass('lucid-Table-align-right'), 'must be true');
			});

			describe('props.columnProps in a grouped column', () => {
				const omittedColumnProps = ['field', 'title', 'initialState'];

				const includedColumnProps = [
					'onClick',
					'style',
					'align',
					'isResizable',
					'isSorted',
					'sortDirection',
					'rowSpan',
					'children',
				];

				it('omits all unused Column props from the root Table Header element', () => {
					const wrapper = shallow(
						<DataTable data={[]}>
							<ColumnGroup title='Name'>
								<Column
									field='first_name'
									title='First'
									data-testid='columnGroup-column'
								/>
								<Column field='last_name' title='Last' />
							</ColumnGroup>
						</DataTable>
					);

					const columnGroupColumnProps = _.keys(
						wrapper.find('[data-testid="columnGroup-column"]').first().props()
					);

					// A ColumnGroup Column Table Table Rows
					// should not contain any of the excluded (the unused) Column propTypes and the 'initialState' prop:
					// 'field', 'title', 'initialState',

					_.forEach(omittedColumnProps, (prop) => {
						expect(_.includes(columnGroupColumnProps, prop)).toBe(false);
					});

					// A ColumnGroup Column Table Table Row should include:
					// 'onClick', 'style', 'align', 'isResizable', 'isSorted', 'sortDirection', 'rowSpan', 'children',

					_.forEach(includedColumnProps, (prop) => {
						expect(_.includes(columnGroupColumnProps, prop)).toBe(true);
					});
				});
			});
		});

		describe('EmptyStateWrapper Title', () => {
			it('should render the message title element', () => {
				const titleText = 'Here is the Title Text';
				const wrapper = shallow(
					<DataTable data={[]}>
						<EmptyStateWrapper>
							<Title>{titleText}</Title>
						</EmptyStateWrapper>
					</DataTable>
				);

				const messageTitleWrapper = wrapper
					.find(EmptyStateWrapper)
					.shallow()
					.find('.lucid-EmptyStateWrapper-message-title')
					.shallow();

				assert.equal(
					messageTitleWrapper.text(),
					titleText,
					'must contain the title text'
				);
			});
		});

		describe('EmptyStateWrapper Body', () => {
			it('should render the message body element', () => {
				const bodyElement = (
					<div className='parent-div'>
						<div className='nested-div' />
					</div>
				);
				const wrapper = shallow(
					<DataTable data={[]}>
						<EmptyStateWrapper>
							<Body>{bodyElement}</Body>
						</EmptyStateWrapper>
					</DataTable>
				);

				const messageBodyWrapper = wrapper.find(EmptyStateWrapper).shallow();

				assert(
					messageBodyWrapper.contains(bodyElement),
					'must contain the body element'
				);
			});
		});

		describe('cellValue is a function', () => {
			it('should pass column width as a prop to cellValue', () => {
				const testDataWithFunctionInCellValue: any = [
					{
						id: 1,
						first_name: 'Isaac',
						email: 'inewton@example.com',
						occupation: 'Physicist',
						isDisabled: true,
						isSelected: true,
						isActive: true,
						status: (width) => <Checkbox width={width} />,
					},
				];

				const wrapper = mount(
					<DataTable hasFixedHeader data={testDataWithFunctionInCellValue}>
						<Column field='id' isResizable title='ID' />
						<Column field='first_name' isResizable title='First' />
						<Column field='last_name' isResizable title='Last' />
						<Column field='email' isResizable title='Email' />
						<Column field='occupation' isResizable title='Occupation' />
						<Column field='status' isResizable title='Status' />
					</DataTable>
				);

				expect(wrapper.find(Checkbox).props()).toHaveProperty('width');
			});
		});
	});
});
