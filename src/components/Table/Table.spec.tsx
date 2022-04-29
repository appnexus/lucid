import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import Table from './Table';
import ArrowIcon from '../Icon/ArrowIcon/ArrowIcon';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

const { Thead, Tbody, Tr, Th, Td } = Table;

describe('Table', () => {
	common(Table);

	describe('render', () => {
		it('should render a table', () => {
			const wrapper = shallow(<Table />);

			assert.equal(wrapper.find('table').length, 1);
		});
	});

	describe('props', () => {
		describe('root pass throughs', () => {
			let wrapper: any;

			beforeEach(() => {
				const props = {
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<Table {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-Table').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' is plucked from the pass through object
				// but still appears becuase it is also directly added to the root element as a prop
				forEach(['className', 'data-testid', 'style'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});
			it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-Table').props();

				forEach(
					[
						'density',
						'hasLightHeader',
						'hasBorder',
						'hasWordWrap',
						'hasHover',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});

		describe('density', () => {
			describe('value `compressed`', () => {
				it('should apply the `lucid-Table-density-compressed` class name to the rendered table', () => {
					const wrapper = shallow(<Table density='compressed' />);

					assert.equal(
						wrapper.find('table.lucid-Table-density-compressed').length,
						1
					);
				});
			});

			describe('value `extended`', () => {
				it('should apply the `lucid-Table-density-extended` class name to the rendered table', () => {
					const wrapper = shallow(<Table density='extended' />);

					assert.equal(
						wrapper.find('table.lucid-Table-density-extended').length,
						1
					);
				});
			});
		});

		describe('hasBorder', () => {
			it('should apply the `lucid-Table-has-border` class name to the rendered table', () => {
				const wrapper = shallow(<Table hasBorder={true} />);

				assert.equal(
					wrapper.find('table.lucid-Table-has-border').length,
					1,
					'the className lucid-Table-has-border must be included'
				);
			});
		});
	});

	describe('Child Elements', () => {
		describe('Thead', () => {
			describe('render', () => {
				it('should render a thead', () => {
					const wrapper = shallow(<Thead />);

					assert.equal(wrapper.find('thead.lucid-Table-Thead').length, 1);
				});
			});

			describe('Thead pass through props', () => {
				let wrapper: any;

				beforeEach(() => {
					const props = {
						className: 'wut',
						style: { marginRight: 10 },
						initialState: { test: true },
						callbackId: 1,
						'data-testid': 10,
					};
					wrapper = mount(
						<Table>
							<Thead {...props}></Thead>
						</Table>
					);
				});

				afterEach(() => {
					wrapper.unmount();
				});

				it('passes through props not defined in `Thead.propTypes` to the <thead> element.', () => {
					const theadProps = wrapper.find('.lucid-Table-Thead').props();

					expect(
						wrapper.find('.lucid-Table-Thead').prop(['className'])
					).toContain('wut');
					expect(
						wrapper.find('.lucid-Table-Thead').prop(['style'])
					).toMatchObject({
						marginRight: 10,
					});
					expect(wrapper.find('.lucid-Table-Thead').prop(['data-testid'])).toBe(
						10
					);

					// 'className' is plucked from the pass through object
					// but still appears becuase it is also directly added to the root element as a prop
					forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
						expect(has(theadProps, prop)).toBe(true);
					});
				});
				it('omits the props defined in `Thead.propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
					const theadProps = wrapper.find('.lucid-Table-Thead').props();

					forEach(['initialState', 'callbackId'], (prop) => {
						expect(has(theadProps, prop)).toBe(false);
					});
				});
			});
		});

		describe('Tbody', () => {
			describe('render', () => {
				it('should render a tbody', () => {
					const wrapper = shallow(<Tbody />);

					assert.equal(wrapper.find('tbody.lucid-Table-Tbody').length, 1);
				});
			});

			describe('Tbody pass through props', () => {
				let wrapper: any;

				beforeEach(() => {
					const props = {
						className: 'wut',
						style: { marginRight: 10 },
						initialState: { test: true },
						callbackId: 1,
						'data-testid': 10,
					};
					wrapper = mount(
						<Table>
							<Thead></Thead>
							<Tbody {...props}></Tbody>
						</Table>
					);
				});

				afterEach(() => {
					wrapper.unmount();
				});

				it('passes through props not defined in `Tbody.propTypes` to the <tbody> element.', () => {
					const tbodyProps = wrapper.find('.lucid-Table-Tbody').props();

					expect(
						wrapper.find('.lucid-Table-Tbody').prop(['className'])
					).toContain('wut');
					expect(
						wrapper.find('.lucid-Table-Tbody').prop(['style'])
					).toMatchObject({
						marginRight: 10,
					});
					expect(wrapper.find('.lucid-Table-Tbody').prop(['data-testid'])).toBe(
						10
					);

					// 'className' is plucked from the pass through object
					// but still appears becuase it is also directly added to the root element as a prop
					forEach(['className', 'children', 'data-testid', 'style'], (prop) => {
						expect(has(tbodyProps, prop)).toBe(true);
					});
				});
				it('omits the props defined in `Tbody.propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
					const tbodyProps = wrapper.find('.lucid-Table-Tbody').props();

					forEach(['initialState', 'callbackId'], (prop) => {
						expect(has(tbodyProps, prop)).toBe(false);
					});
				});
			});
		});

		describe('Tr', () => {
			describe('render', () => {
				it('should render a tr', () => {
					const wrapper = shallow(<Tr />);

					assert.equal(wrapper.find('tr.lucid-Table-Tr').length, 1);
				});
			});

			describe('props', () => {
				describe('Tr pass through props', () => {
					let wrapper: any;

					beforeEach(() => {
						const props = {
							isDisabled: true,
							isSelected: true,
							isActive: true,
							isActionable: true,
							className: 'wut',
							style: { marginRight: 10 },
							initialState: { test: true },
							callbackId: 1,
							'data-testid': 10,
						};
						wrapper = mount(
							<Table>
								<Thead></Thead>
								<Tbody>
									<Tr {...props}></Tr>
								</Tbody>
							</Table>
						);
					});

					afterEach(() => {
						wrapper.unmount();
					});

					it('passes through props not defined in `Tr.propTypes` to the <tbody> element.', () => {
						const trProps = wrapper.find('.lucid-Table-Tr').props();

						expect(
							wrapper.find('.lucid-Table-Tr').prop(['className'])
						).toContain('wut');
						expect(
							wrapper.find('.lucid-Table-Tr').prop(['style'])
						).toMatchObject({
							marginRight: 10,
						});
						expect(wrapper.find('.lucid-Table-Tr').prop(['data-testid'])).toBe(
							10
						);

						// 'className' is plucked from the pass through object
						// but still appears becuase it is also directly added to the root element as a prop
						forEach(
							['className', 'children', 'data-testid', 'style'],
							(prop) => {
								expect(has(trProps, prop)).toBe(true);
							}
						);
					});
					it('omits the props defined in `Tr.propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
						const trProps = wrapper.find('.lucid-Table-Tr').props();

						forEach(
							[
								'isDisabled',
								'isSelected',
								'isActive',
								'initialState',
								'isActionable',
								'callbackId',
							],
							(prop) => {
								expect(has(trProps, prop)).toBe(false);
							}
						);
					});
				});

				describe('isDisabled', () => {
					it('should apply the class name `lucid-Table-is-disabled`', () => {
						const wrapper = shallow(<Tr isDisabled />);

						assert.equal(wrapper.find('tr.lucid-Table-is-disabled').length, 1);
					});
				});

				describe('isSelected', () => {
					it('should apply the class name `lucid-Table-is-selected`', () => {
						const wrapper = shallow(<Tr isSelected />);

						assert.equal(wrapper.find('tr.lucid-Table-is-selected').length, 1);
					});
				});

				describe('isActive', () => {
					it('should apply the class name `lucid-Table-is-active`', () => {
						const wrapper = shallow(<Tr isActive />);

						assert.equal(wrapper.find('tr.lucid-Table-is-active').length, 1);
					});
				});
			});
		});

		describe('Th', () => {
			describe('render', () => {
				it('should render a th', () => {
					const wrapper = shallow(<Th />);

					assert.equal(wrapper.find('th.lucid-Table-Th').length, 1);
				});
			});

			describe('Th pass through props', () => {
				let wrapper: any;

				beforeEach(() => {
					const props = {
						align: 'center' as any,
						children: <div></div>,
						hasBorderRight: true,
						hasBorderLeft: true,
						isResizable: true,
						isSortable: true,
						isSorted: true,
						onResize: noop,
						sortDirection: 'right' as any,
						width: 100,
						minWidth: 50,
						isFirstRow: true,
						isLastRow: false,
						isFirstCol: true,
						isLastCol: false,
						isFirstSingle: true,
						field: 'test',
						truncateContent: true,
						rowSpan: 2,
						className: 'wut',
						style: { marginRight: 10 },
						initialState: { test: true },
						callbackId: 1,
						'data-testid': 10,
					};
					wrapper = mount(
						<Table>
							<Thead>
								<Tr>
									<Th {...props}>Lorem</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr></Tr>
							</Tbody>
						</Table>
					);
				});

				afterEach(() => {
					wrapper.unmount();
				});

				it('passes through props not defined in `Th.propTypes` to the <thead> element.', () => {
					const thProps = wrapper.find('.lucid-Table-Th').props();

					expect(wrapper.find('.lucid-Table-Th').prop(['className'])).toContain(
						'wut'
					);
					expect(wrapper.find('.lucid-Table-Th').prop(['style'])).toMatchObject(
						{
							marginRight: 10,
						}
					);
					expect(wrapper.find('.lucid-Table-Th').prop(['data-testid'])).toBe(
						10
					);

					// 'className' and 'style' appear becuase they are directly added to the root element as a prop
					forEach(
						['className', 'children', 'data-testid', 'style', 'rowSpan'],
						(prop) => {
							expect(has(thProps, prop)).toBe(true);
						}
					);
				});
				it('omits the props defined in `Th.propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
					const thProps = wrapper.find('.lucid-Table-Th').props();

					forEach(
						[
							'align',
							'hasBorderRight',
							'hasBorderLeft',
							'isResizable',
							'isSortable',
							'isSorted',
							'onResize',
							'sortDirection',
							'width',
							'minWidth',
							'isFirstRow',
							'isLastRow',
							'isFirstCol',
							'isLastCol',
							'isFirstSingle',
							'field',
							'truncateContent',
							'initialState',
							'callbackId',
						],
						(prop) => {
							expect(has(thProps, prop)).toBe(false);
						}
					);
				});
			});

			describe('props', () => {
				describe('align', () => {
					it('should apply the class name `lucid-Table-align-left` when align=`left`', () => {
						const wrapper = shallow(<Th align='left' />);

						assert.equal(wrapper.find('th.lucid-Table-align-left').length, 1);
					});

					it('should apply the class name `lucid-Table-align-center` when align=`center`', () => {
						const wrapper = shallow(<Th align='center' />);

						assert.equal(wrapper.find('th.lucid-Table-align-center').length, 1);
					});

					it('should apply the class name `lucid-Table-align-right` when align=`right`', () => {
						const wrapper = shallow(<Th align='right' />);

						assert.equal(wrapper.find('th.lucid-Table-align-right').length, 1);
					});
				});

				describe('isSortable', () => {
					it('should apply the class name `lucid-Table-is-sortable` when true', () => {
						const wrapper = shallow(<Th isSortable={true} />);

						assert.equal(wrapper.find('th.lucid-Table-is-sortable').length, 1);
					});

					it('should not apply the class name `lucid-Table-is-sortable` when false', () => {
						const wrapper = shallow(<Th isSortable={false} />);

						assert.equal(wrapper.find('th.lucid-Table-is-sortable').length, 0);
					});

					it('should apply the class name `lucid-Table-is-sortable` when not specified and `isSorted` is true', () => {
						const wrapper = shallow(<Th isSorted={true} />);

						assert.equal(wrapper.find('th.lucid-Table-is-sortable').length, 1);
					});

					it('should not apply the class name `lucid-Table-is-sortable` when neither `isSortable` or `isSorted` are specified', () => {
						const wrapper = shallow(<Th />);

						assert.equal(wrapper.find('th.lucid-Table-is-sortable').length, 0);
					});
				});

				describe('isResizable', () => {
					it('should apply the class name `lucid-Table-is-resizable`', () => {
						const wrapper = shallow(<Th isResizable minWidth={50} />);

						assert.equal(wrapper.find('th.lucid-Table-is-resizable').length, 1);
					});

					it('should render a DragCaptureZone for resizable header content', () => {
						const wrapper = shallow(<Th isResizable>foo</Th>);
						assert.equal(
							wrapper.find(DragCaptureZone).length,
							1,
							'must render a DragCaptureZone component'
						);
						assert(
							wrapper
								.find(DragCaptureZone)
								.hasClass('lucid-Table-Th-inner-resize'),
							'must have className `lucid-Table-Th-inner-resize`'
						);
					});
				});

				describe('isResizable without minwidth setup', () => {
					it('should apply the class name `lucid-Table-is-resizable`', () => {
						const wrapper = shallow(<Th isResizable />);

						assert.equal(wrapper.find('th.lucid-Table-is-resizable').length, 1);
					});

					it('should render a DragCaptureZone for resizable header content', () => {
						const wrapper = shallow(<Th isResizable>foo</Th>);
						assert.equal(
							wrapper.find(DragCaptureZone).length,
							1,
							'must render a DragCaptureZone component'
						);
						assert(
							wrapper
								.find(DragCaptureZone)
								.hasClass('lucid-Table-Th-inner-resize'),
							'must have className `lucid-Table-Th-inner-resize`'
						);
					});
				});

				describe('isSorted', () => {
					it('should apply the class name `lucid-Table-is-sorted`', () => {
						const wrapper = shallow(<Th isSorted />);

						assert.equal(wrapper.find('th.lucid-Table-is-sorted').length, 1);
					});

					it('should render a container for sorted header content', () => {
						const wrapper = shallow(<Th isSorted>foo</Th>);
						const containerWrapper = wrapper.find(
							'.lucid-Table-Th-inner-caret'
						);

						assert.equal(containerWrapper.length, 1, 'must have a container');
						assert.equal(
							containerWrapper.find(ArrowIcon).length,
							1,
							'must render a ArrowIcon'
						);
						assert(
							containerWrapper
								.find(ArrowIcon)
								.hasClass('lucid-Table-sort-icon'),
							'must have className `lucid-Table-sort-icon`'
						);
					});
				});

				describe('sortDirection', () => {
					it('should pass thru to the ArrowIcon when `isSorted` is also true', () => {
						const wrapper = shallow(<Th isSorted sortDirection='down' />);
						const containerWrapper = wrapper.find(
							'.lucid-Table-Th-inner-caret'
						);

						assert.equal(
							containerWrapper.find(ArrowIcon).prop('direction'),
							'down',
							'ArrowIcon direction must match prop value'
						);
					});
				});
			});
		});

		describe('Td', () => {
			describe('render', () => {
				it('should render a td', () => {
					const wrapper = shallow(<Td />);

					assert.equal(wrapper.find('td.lucid-Table-Td').length, 1);
				});
			});

			describe('Td pass through props', () => {
				let wrapper: any;

				beforeEach(() => {
					const props = {
						align: 'center' as any,
						hasBorderRight: true,
						hasBorderLeft: true,
						isFirstRow: true,
						isLastRow: true,
						isFirstCol: true,
						isLastCol: true,
						isFirstSingle: true,
						isEmpty: true,
						truncateContent: true,
						rowSpan: 2,
						className: 'wut',
						style: { marginRight: 10 },
						initialState: { test: true },
						callbackId: 1,
						'data-testid': 10,
					};
					wrapper = mount(
						<Table>
							<Thead>Lorem</Thead>
							<Tbody>
								<Tr>
									<Td {...props}>Ipsum</Td>
								</Tr>
							</Tbody>
						</Table>
					);
				});

				afterEach(() => {
					wrapper.unmount();
				});

				it('passes through props not defined in `Td.propTypes` to the <td> element.', () => {
					const tdProps = wrapper.find('.lucid-Table-Td').props();

					expect(wrapper.find('.lucid-Table-Td').prop(['className'])).toContain(
						'wut'
					);
					expect(wrapper.find('.lucid-Table-Td').prop(['style'])).toMatchObject(
						{
							marginRight: 10,
						}
					);
					expect(wrapper.find('.lucid-Table-Td').prop(['data-testid'])).toBe(
						10
					);

					// 'className' is plucked from the pass through object
					// but still appears becuase it is also directly added to the root element as a prop
					forEach(['className', 'children', 'data-testid', 'style'], (prop) => {
						expect(has(tdProps, prop)).toBe(true);
					});
				});
				it('omits the props defined in `Td.propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
					const tdProps = wrapper.find('.lucid-Table-Td').props();

					forEach(
						[
							'align',
							'hasBorderRight',
							'hasBorderLeft',
							'isFirstRow',
							'isLastRow',
							'isFirstCol',
							'isLastCol',
							'isFirstSingle',
							'isEmpty',
							'truncateContent',
							'initialState',
							'callbackId',
						],
						(prop) => {
							expect(has(tdProps, prop)).toBe(false);
						}
					);
				});
			});

			describe('props', () => {
				describe('align', () => {
					it('should apply the class name `lucid-Table-align-left` when align=`left`', () => {
						const wrapper = shallow(<Td align='left' />);

						assert.equal(wrapper.find('td.lucid-Table-align-left').length, 1);
					});

					it('should apply the class name `lucid-Table-align-center` when align=`center`', () => {
						const wrapper = shallow(<Td align='center' />);

						assert.equal(wrapper.find('td.lucid-Table-align-center').length, 1);
					});

					it('should apply the class name `lucid-Table-align-right` when align=`right`', () => {
						const wrapper = shallow(<Td align='right' />);

						assert.equal(wrapper.find('td.lucid-Table-align-right').length, 1);
					});
				});

				describe('hasBorderRight', () => {
					it('should apply the class name `lucid-Table-has-border-right`', () => {
						const wrapper = shallow(<Td hasBorderRight />);

						assert.equal(
							wrapper.find('td.lucid-Table-has-border-right').length,
							1
						);
					});
				});

				describe('has-borderLeft', () => {
					it('should apply the class name `lucid-Table-has-border-left`', () => {
						const wrapper = shallow(<Td hasBorderLeft />);

						assert.equal(
							wrapper.find('td.lucid-Table-has-border-left').length,
							1
						);
					});
				});

				describe('truncateContent', () => {
					it('should apply the class name `lucid-Table-truncate-content`', () => {
						const wrapper = shallow(<Td truncateContent />);

						assert.equal(
							wrapper.find('td.lucid-Table-truncate-content').length,
							1
						);
					});
				});
			});
		});
	});
});
