import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import _ from 'lodash';
import { common } from '../../util/generic-tests';
import Table from './Table';

const { Thead, Tbody, Tr, Th, Td } = Table;


describe('Table', () => {
	common(Table);

	describe('render', () => {
		it('should render a table', () => {
			const wrapper = shallow(
				<Table />
			);

			assert.equal(wrapper.find('table').length, 1);
		});
	});

	describe('props', () => {
		describe('isComfortable', () => {
			it('should apply the `lucid-Table-isComfortable` class name to the rendered table', () => {
				const wrapper = shallow(
					<Table isComfortable={true} />
				);

				assert.equal(wrapper.find('table.lucid-Table-isComfortable').length, 1);
			});
		});
	});

	describe('Child Elements', () => {
		describe('Thead', () => {
			describe('render', () => {
				it('should render a thead', () => {
					const wrapper = shallow(
						<Thead />
					);

					assert.equal(wrapper.find('thead.lucid-Table-thead').length, 1);
				});

				it('should render child elments with the `isHeader` prop default to true', () => {
					const wrapper = shallow(
						<Thead>
							<Tr />
							<Tr />
						</Thead>
					);

					wrapper.children().forEach((childElementWrapper) => {
						assert(childElementWrapper.prop('isHeader'));
					});
				});

				it('should render child elments with the `isHeader` prop with an explicit value', () => {
					const wrapper = shallow(
						<Thead>
							<Tr isHeader={false} />
							<Tr isHeader={true} />
						</Thead>
					);

					assert.equal(false, wrapper.children().at(0).prop('isHeader'));
					assert.equal(true, wrapper.children().at(1).prop('isHeader'));
				});
			});
		});

		describe('Tbody', () => {
			describe('render', () => {
				it('should render a tbody', () => {
					const wrapper = shallow(
						<Tbody />
					);

					assert.equal(wrapper.find('tbody.lucid-Table-tbody').length, 1);
				});

			});
		});

		describe('Tr', () => {
			describe('render', () => {
				it('should render a tr', () => {
					const wrapper = shallow(
						<Tr />
					);

					assert.equal(wrapper.find('tr.lucid-Table-row').length, 1);
				});
			});

			describe('props', () => {
				describe('isHeader', () => {
					it('should apply the class name `lucid-Table-thead-row`', () => {
						const wrapper = shallow(
							<Tr isHeader />
						);

						assert.equal(wrapper.find('tr.lucid-Table-thead-row').length, 1);
					});
				});

				describe('isDisabled', () => {
					it('should apply the class name `lucid-Table-isDisabled`', () => {
						const wrapper = shallow(
							<Tr isDisabled />
						);

						assert.equal(wrapper.find('tr.lucid-Table-isDisabled').length, 1);
					});
				});

				describe('isChecked', () => {
					it('should apply the class name `lucid-Table-isChecked`', () => {
						const wrapper = shallow(
							<Tr isChecked />
						);

						assert.equal(wrapper.find('tr.lucid-Table-isChecked').length, 1);
					});
				});

				describe('isSelected', () => {
					it('should apply the class name `lucid-Table-isSelected`', () => {
						const wrapper = shallow(
							<Tr isSelected />
						);

						assert.equal(wrapper.find('tr.lucid-Table-isSelected').length, 1);
					});
				});
			});
		});

		describe('Th', () => {
			describe('render', () => {
				it('should render a th', () => {
					const wrapper = shallow(
						<Th />
					);

					assert.equal(wrapper.find('th.lucid-Table-cell').length, 1);
				});

			});

			describe('props', () => {
				describe('align', () => {
					it('should apply the class name `lucid-Table-align-left` when align=`left`', () => {
						const wrapper = shallow(
							<Th align='left' />
						);

						assert.equal(wrapper.find('th.lucid-Table-align-left').length, 1);
					});

					it('should apply the class name `lucid-Table-align-center` when align=`center`', () => {
						const wrapper = shallow(
							<Th align='center' />
						);

						assert.equal(wrapper.find('th.lucid-Table-align-center').length, 1);
					});

					it('should apply the class name `lucid-Table-align-right` when align=`right`', () => {
						const wrapper = shallow(
							<Th align='right' />
						);

						assert.equal(wrapper.find('th.lucid-Table-align-right').length, 1);
					});
				});

				describe('hasCheckbox', () => {
					it('should apply the class name `lucid-Table-hasCheckbox`', () => {
						const wrapper = shallow(
							<Th hasCheckbox />
						);

						assert.equal(wrapper.find('th.lucid-Table-hasCheckbox').length, 1);
					});
				});

				describe('hasIcon', () => {
					it('should apply the class name `lucid-Table-hasIcon`', () => {
						const wrapper = shallow(
							<Th hasIcon />
						);

						assert.equal(wrapper.find('th.lucid-Table-hasIcon').length, 1);
					});
				});

				describe('hasButton', () => {
					it('should apply the class name `lucid-Table-hasButton`', () => {
						const wrapper = shallow(
							<Th hasButton />
						);

						assert.equal(wrapper.find('th.lucid-Table-hasButton').length, 1);
					});
				});

				describe('isSortable', () => {
					it('should apply the class name `lucid-Table-isSortable` when true', () => {
						const wrapper = shallow(
							<Th isSortable={true} />
						);

						assert.equal(wrapper.find('th.lucid-Table-isSortable').length, 1);
					});

					it('should not apply the class name `lucid-Table-isSortable` when false', () => {
						const wrapper = shallow(
							<Th isSortable={false} />
						);

						assert.equal(wrapper.find('th.lucid-Table-isSortable').length, 0);
					});

					it('should apply the class name `lucid-Table-isSortable` when not specified and `isSorted` is true', () => {
						const wrapper = shallow(
							<Th isSorted={true} />
						);

						assert.equal(wrapper.find('th.lucid-Table-isSortable').length, 1);
					});

					it('should not apply the class name `lucid-Table-isSortable` when neither `isSortable` or `isSorted` are specified', () => {
						const wrapper = shallow(
							<Th/>
						);

						assert.equal(wrapper.find('th.lucid-Table-isSortable').length, 0);
					});
				});

				describe('isSorted', () => {
					it('should apply the class name `lucid-Table-isSorted`', () => {
						const wrapper = shallow(
							<Th isSorted />
						);

						assert.equal(wrapper.find('th.lucid-Table-isSorted').length, 1);
					});

					it('should render a container for sorted header content', () => {
						const wrapper = shallow(
							<Th isSorted>foo</Th>
						);

						const containerWrapper = wrapper.find('ul.lucid-Table-isSorted-container');
						assert.equal(containerWrapper.length, 1, 'must have a container');
						assert.equal(containerWrapper.find('li.lucid-Table-isSorted-title').length, 1, 'container must have a title');
						assert.equal(containerWrapper.find('li.lucid-Table-isSorted-title').text(), 'foo', 'title content must match children');
						assert.equal(containerWrapper.find('li.lucid-Table-isSorted-caret').length, 1, 'container must have a caret');
						assert.equal(containerWrapper.find('li.lucid-Table-isSorted-caret').find('CaretIcon').length, 1, 'CaretIcon must be rendered');
						assert(_.includes(containerWrapper.find('li.lucid-Table-isSorted-caret').find('CaretIcon').prop('className'), 'lucid-Table-sort-icon'), 'CaretIcon must have correct className');
					});
				});

				describe('sortDirection', () => {
					it('should pass thru to the CaretIcon when `isSorted` is also true', () => {
						const wrapper = shallow(
							<Th isSorted sortDirection='up' />
						);

						const containerWrapper = wrapper.find('ul.lucid-Table-isSorted-container');
						assert.equal('up', containerWrapper.find('li.lucid-Table-isSorted-caret').find('CaretIcon').prop('direction'), 'CaretIcon direction must match prop');
					});
				});
			});
		});

		describe('Td', () => {
			describe('render', () => {
				it('should render a td', () => {
					const wrapper = shallow(
						<Td />
					);

					assert.equal(wrapper.find('td.lucid-Table-cell').length, 1);
				});

			});

			describe('props', () => {
				describe('align', () => {
					it('should apply the class name `lucid-Table-align-left` when align=`left`', () => {
						const wrapper = shallow(
							<Td align='left' />
						);

						assert.equal(wrapper.find('td.lucid-Table-align-left').length, 1);
					});

					it('should apply the class name `lucid-Table-align-center` when align=`center`', () => {
						const wrapper = shallow(
							<Td align='center' />
						);

						assert.equal(wrapper.find('td.lucid-Table-align-center').length, 1);
					});

					it('should apply the class name `lucid-Table-align-right` when align=`right`', () => {
						const wrapper = shallow(
							<Td align='right' />
						);

						assert.equal(wrapper.find('td.lucid-Table-align-right').length, 1);
					});
				});

				describe('hasCheckbox', () => {
					it('should apply the class name `lucid-Table-hasCheckbox`', () => {
						const wrapper = shallow(
							<Td hasCheckbox />
						);

						assert.equal(wrapper.find('td.lucid-Table-hasCheckbox').length, 1);
					});
				});

				describe('hasIcon', () => {
					it('should apply the class name `lucid-Table-hasIcon`', () => {
						const wrapper = shallow(
							<Td hasIcon />
						);

						assert.equal(wrapper.find('td.lucid-Table-hasIcon').length, 1);
					});
				});

				describe('hasButton', () => {
					it('should apply the class name `lucid-Table-hasButton`', () => {
						const wrapper = shallow(
							<Td hasButton />
						);

						assert.equal(wrapper.find('td.lucid-Table-hasButton').length, 1);
					});
				});

				describe('hasBorderRight', () => {
					it('should apply the class name `lucid-Table-hasBorderRight`', () => {
						const wrapper = shallow(
							<Td hasBorderRight />
						);

						assert.equal(wrapper.find('td.lucid-Table-hasBorderRight').length, 1);
					});
				});

				describe('hasBorderLeft', () => {
					it('should apply the class name `lucid-Table-hasBorderLeft`', () => {
						const wrapper = shallow(
							<Td hasBorderLeft />
						);

						assert.equal(wrapper.find('td.lucid-Table-hasBorderLeft').length, 1);
					});
				});

				describe('isAfterRowSpan', () => {
					it('should apply the class name `lucid-Table-isAfterRowSpan`', () => {
						const wrapper = shallow(
							<Td isAfterRowSpan />
						);

						assert.equal(wrapper.find('td.lucid-Table-isAfterRowSpan').length, 1);
					});
				});
			});
		});
	});
});
