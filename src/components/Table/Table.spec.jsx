import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import Table from './Table';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
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
		describe('density', () => {
			describe('value `compressed`', () => {
				it('should apply the `lucid-Table-density-compressed` class name to the rendered table', () => {
					const wrapper = shallow(<Table density="compressed" />);

					assert.equal(
						wrapper.find('table.lucid-Table-density-compressed').length,
						1
					);
				});
			});

			describe('value `extended`', () => {
				it('should apply the `lucid-Table-density-extended` class name to the rendered table', () => {
					const wrapper = shallow(<Table density="extended" />);

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
		});

		describe('Tbody', () => {
			describe('render', () => {
				it('should render a tbody', () => {
					const wrapper = shallow(<Tbody />);

					assert.equal(wrapper.find('tbody.lucid-Table-Tbody').length, 1);
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

				describe('isActionable', () => {
					it('should apply the class name `lucid-Table-is-actionable`', () => {
						const wrapper = shallow(<Tr isActionable />);

						assert.equal(
							wrapper.find('tr.lucid-Table-is-actionable').length,
							1
						);
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

			describe('props', () => {
				describe('align', () => {
					it('should apply the class name `lucid-Table-align-left` when align=`left`', () => {
						const wrapper = shallow(<Th align="left" />);

						assert.equal(wrapper.find('th.lucid-Table-align-left').length, 1);
					});

					it('should apply the class name `lucid-Table-align-center` when align=`center`', () => {
						const wrapper = shallow(<Th align="center" />);

						assert.equal(wrapper.find('th.lucid-Table-align-center').length, 1);
					});

					it('should apply the class name `lucid-Table-align-right` when align=`right`', () => {
						const wrapper = shallow(<Th align="right" />);

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
							containerWrapper.find(CaretIcon).length,
							1,
							'must render a CaretIcon'
						);
						assert(
							containerWrapper
								.find(CaretIcon)
								.hasClass('lucid-Table-sort-icon'),
							'must have className `lucid-Table-sort-icon`'
						);
					});
				});

				describe('sortDirection', () => {
					it('should pass thru to the CaretIcon when `isSorted` is also true', () => {
						const wrapper = shallow(<Th isSorted sortDirection="down" />);
						const containerWrapper = wrapper.find(
							'.lucid-Table-Th-inner-caret'
						);

						assert.equal(
							containerWrapper.find(CaretIcon).prop('direction'),
							'down',
							'CaretIcon direction must match prop value'
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

			describe('props', () => {
				describe('align', () => {
					it('should apply the class name `lucid-Table-align-left` when align=`left`', () => {
						const wrapper = shallow(<Td align="left" />);

						assert.equal(wrapper.find('td.lucid-Table-align-left').length, 1);
					});

					it('should apply the class name `lucid-Table-align-center` when align=`center`', () => {
						const wrapper = shallow(<Td align="center" />);

						assert.equal(wrapper.find('td.lucid-Table-align-center').length, 1);
					});

					it('should apply the class name `lucid-Table-align-right` when align=`right`', () => {
						const wrapper = shallow(<Td align="right" />);

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
			});
		});
	});
});
