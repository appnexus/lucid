import _, { forEach, has } from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import { SearchableMultiSelectDumb as SearchableMultiSelect } from './SearchableMultiSelect';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';

const { Option, OptionGroup } = SearchableMultiSelect;

describe('SearchableMultiSelect', () => {
	common(SearchableMultiSelect, {
		exemptFunctionProps: ['optionFilter'] as any,
	});

	describe('render', () => {
		it('should render selections', () => {
			const wrapper: any = shallow(
				<SearchableMultiSelect>
					<Option>option a</Option>
					<Option>option b</Option>
					<Option>option c</Option>
				</SearchableMultiSelect>
			);

			expect(wrapper.find(DropMenu).length).toBe(1);
		});

		it('should pass `isDisabled` to `Options`', () => {
			const wrapper: any = shallow(
				<SearchableMultiSelect>
					<Option isDisabled>option a</Option>
					<Option>option b</Option>
					<Option>option c</Option>
				</SearchableMultiSelect>
			);
			const [first, second, third] = wrapper
				.find(DropMenu.Option)
				.map((option: any) => option.prop('isDisabled'));
			expect(first).toBe(true);
			expect(second).toBe(false);
			expect(third).toBe(false);
		});
	});

	describe('props', () => {
		it('onRemoveAll', () => {
			const onRemoveAll = jest.fn();

			const wrapper: any = shallow(
				<SearchableMultiSelect onRemoveAll={onRemoveAll} selectedIndices={[0]}>
					<Option>option a</Option>
				</SearchableMultiSelect>
			);

			wrapper.find('Selection').first().prop('onRemove')({ event: 'nert' });

			expect(onRemoveAll).toHaveBeenCalled();
		});

		describe('onSearch', () => {
			it('should work', () => {
				const onSearch = jest.fn();
				const wrapper: any = shallow(
					<SearchableMultiSelect onSearch={onSearch}>
						<Option callbackId={'zero'}>Zero</Option>
						<Option callbackId={'one'}>One</Option>
					</SearchableMultiSelect>
				);
				const expected = {
					event: 'fake',
					props: {
						callbackId: 'one',
						children: 'One',
						isDisabled: false,
						isHidden: false,
						isWrapped: true,
					},
				};

				wrapper.find('SearchField').prop('onChange')('ero', { event: 'fake' });

				expect(onSearch).toHaveBeenCalledWith('ero', 1, expected);
			});
		});

		describe('onSelect', () => {
			it('should work when fired from the DropMenu', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: {
						preventDefault: _.noop,
					},
					props: {},
				};

				const wrapper: any = shallow(
					<SearchableMultiSelect onSelect={onSelect}>
						<Option>option a</Option>
					</SearchableMultiSelect>
				);

				wrapper.find('DropMenu').first().prop('onSelect')(
					10,
					mockSelectionCallback
				);

				expect(onSelect).toHaveBeenCalledWith(9, mockSelectionCallback);
			});

			it('should work when removing a selection', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: {},
					props: {
						callbackId: 1,
					},
				};
				const expected = {
					event: {},
					props: {
						callbackId: 'custom',
						isDisabled: false,
						isHidden: false,
						isWrapped: true,
					},
				};

				const wrapper: any = shallow(
					<SearchableMultiSelect onSelect={onSelect} selectedIndices={[0, 1]}>
						<Option>option a</Option>
						<Option callbackId='custom' />
					</SearchableMultiSelect>
				);

				wrapper.find('Selection').at(1).prop('onRemove')(mockSelectionCallback);

				expect(onSelect).toHaveBeenCalledWith(1, expected);
			});

			it('should work when selecting all', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: { stopPropagation: _.noop, preventDefault: _.noop },
					props: {},
				};

				const wrapper: any = shallow(
					<SearchableMultiSelect onSelect={onSelect}>
						<Option>option a</Option>
						<Option>option b</Option>
					</SearchableMultiSelect>
				);

				wrapper.find('DropMenu').first().prop('onSelect')(
					0,
					mockSelectionCallback
				);

				expect(onSelect).toHaveBeenCalledWith([0, 1], mockSelectionCallback);
			});

			it('should work when deselecting all', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: { stopPropagation: _.noop, preventDefault: _.noop },
					props: {},
				};
				const selectedIndices = [0, 1];

				const wrapper: any = shallow(
					<SearchableMultiSelect
						selectedIndices={selectedIndices}
						onSelect={onSelect}
					>
						<Option>option a</Option>
						<Option>option b</Option>
					</SearchableMultiSelect>
				);

				wrapper.find('DropMenu').first().prop('onSelect')(
					0,
					mockSelectionCallback
				);

				expect(onSelect).toHaveBeenCalledWith([0, 1], mockSelectionCallback);
			});

			it('should work when selecting some', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: { stopPropagation: _.noop, preventDefault: _.noop },
					props: {},
				};
				const selectedIndices = [0];

				const wrapper: any = shallow(
					<SearchableMultiSelect
						selectedIndices={selectedIndices}
						onSelect={onSelect}
					>
						<Option>option a</Option>
						<Option>option b</Option>
					</SearchableMultiSelect>
				);

				wrapper.find('DropMenu').first().prop('onSelect')(
					0,
					mockSelectionCallback
				);

				expect(onSelect).toHaveBeenCalledWith([1], mockSelectionCallback);
			});

			it('should work when selecting filtered options', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: { stopPropagation: _.noop, preventDefault: _.noop },
					props: {},
				};

				const wrapper: any = shallow(
					<SearchableMultiSelect onSelect={onSelect}>
						<Option isHidden>option a</Option>
						<Option>option b</Option>
					</SearchableMultiSelect>
				);

				wrapper.find('DropMenu').first().prop('onSelect')(
					0,
					mockSelectionCallback
				);

				expect(onSelect).toHaveBeenCalledWith([1], mockSelectionCallback);
			});
		});

		describe('Error', () => {
			it('should apply the appropriate classNames to the saerch', () => {
				const wrapper: any = shallow(
					<SearchableMultiSelect Error={'Erroring out'}>
						<Option>option a</Option>
						<Option>option b</Option>
					</SearchableMultiSelect>
				);

				const searchWrapper = wrapper.find(
					'.lucid-SearchableMultiSelect-search-is-error'
				);

				expect(searchWrapper.exists()).toBeTruthy();
			});

			it('should render out the error div', () => {
				const wrapper: any = shallow(
					<SearchableMultiSelect Error={'Erroring out'}>
						<Option>option a</Option>
						<Option>option b</Option>
					</SearchableMultiSelect>
				);

				const searchWrapper = wrapper.find(
					'.lucid-SearchableMultiSelect-error-content'
				);

				expect(searchWrapper.text()).toEqual('Erroring out');
			});

			it('should not render the error div', () => {
				const wrapper: any = shallow(
					<SearchableMultiSelect Error={true}>
						<Option>option a</Option>
						<Option>option b</Option>
					</SearchableMultiSelect>
				);

				const searchWrapper = wrapper.find(
					'.lucid-SearchableMultiSelect-search-is-error'
				);
				const errorWrapper = wrapper.find(
					'.lucid-SearchableMultiSelect-error-content'
				);
				expect(errorWrapper.exists()).toBeFalsy();
				expect(searchWrapper).toBeTruthy();
			});
		});
	});

	describe('custom formatting', () => {
		it('should render Option.Selected in the SelectedItems area', () => {
			expect(
				shallow(
					<SearchableMultiSelect selectedIndices={[1, 2]}>
						<Option name='OptionA' Selected='option a'>
							<div style={{ display: 'flex' }}>
								<div style={{ width: 100 }}>id</div>
								<div>option a</div>
							</div>
						</Option>
						<Option name='OptionB' Selected='option b'>
							<div style={{ display: 'flex' }}>
								<div style={{ width: 100 }}>id</div>
								<div>option b</div>
							</div>
						</Option>
						<Option name='OptionC' Selected='option c'>
							<div style={{ display: 'flex' }}>
								<div style={{ width: 100 }}>id</div>
								<div>option c</div>
							</div>
						</Option>
					</SearchableMultiSelect>
				)
			).toMatchSnapshot();
		});

		it('should render OptionGroup.Selected in the SelectedItems area', () => {
			expect(
				shallow(
					<SearchableMultiSelect selectedIndices={[1, 2]}>
						<OptionGroup Selected='Selected Foo'>
							Foo bar baz
							<Option name='OptionA' Selected='option a'>
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>id</div>
									<div>option a</div>
								</div>
							</Option>
							<Option name='OptionB' Selected='option b'>
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>id</div>
									<div>option b</div>
								</div>
							</Option>
							<Option name='OptionC' Selected='option c'>
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>id</div>
									<div>option c</div>
								</div>
							</Option>
						</OptionGroup>
					</SearchableMultiSelect>
				)
			).toMatchSnapshot();
		});

		it('should render Option child function by passing in {searchText}, setting filterText on each option and using a custom optionFilter', () => {
			const optionFilter = (searchText: any, { filterText }: any) => {
				if (filterText) {
					return new RegExp(_.escapeRegExp(searchText), 'i').test(filterText);
				}
				return true;
			};

			expect(
				shallow(
					<SearchableMultiSelect optionFilter={optionFilter} searchText='tion'>
						<Option name='OptionA' Selected='option a' filterText='option a'>
							{({ searchText }: any) => (
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>{searchText}</div>
									<div>option a</div>
								</div>
							)}
						</Option>
						<Option name='OptionB' Selected='option b' filterText='option b'>
							{({ searchText }: any) => (
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>{searchText}</div>
									<div>option b</div>
								</div>
							)}
						</Option>
						<Option name='OptionC' Selected='option c' filterText='option c'>
							{({ searchText }: any) => (
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>{searchText}</div>
									<div>option c</div>
								</div>
							)}
						</Option>
					</SearchableMultiSelect>
				)
			).toMatchSnapshot();
		});
	});

	describe('pass throughs', () => {
		let wrapper: any;

		beforeEach(() => {
			const props = {
				className: 'wut',
				style: { marginRight: 10 },
				initialState: { test: true },
				callbackId: 1,
				'data-testid': 10,
			};

			wrapper = shallow(<SearchableMultiSelect {...props} />);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('passes through props not defined in `propTypes` to the root element.', () => {
			const rootProps = wrapper.find('.lucid-SearchableMultiSelect').props();

			expect(wrapper.first().prop(['className'])).toContain('wut');
			expect(wrapper.first().prop(['style'])).toMatchObject({
				marginRight: 10,
			});
			expect(wrapper.first().prop(['data-testid'])).toBe(10);

			// Note: 'className' is plucked from the pass through object
			// but still appears becuase it is also directly passed to the root element as a prop.
			forEach(['className', 'style', 'data-testid', 'children'], (prop) => {
				expect(has(rootProps, prop)).toBe(true);
			});
		});
		it('omits the props defined in `propTypes` from the root element, plus, in addition, `initialState` and `callbackId`.', () => {
			const rootProps = wrapper.find('.lucid-SearchableMultiSelect').props();

			// initialState and callbackId are always both omitted
			forEach(
				[
					'isDisabled',
					'isLoading',
					'maxMenuHeight',
					'onSearch',
					'onSelect',
					'onRemoveAll',
					'optionFilter',
					'searchText',
					'selectedIndices',
					'DropMenu',
					'Option',
					'responsiveMode',
					'hasRemoveAll',
					'hasSelections',
					'hasSelectAll',
					'selectAllText',
					'Error',
					'FixedOption',
					'NullOption',
					'OptionGroup',
					'SearchField',
					'Label',
					'initialState',
					'callbackId',
				],
				(prop) => {
					expect(has(rootProps, prop)).toBe(false);
				}
			);
		});
	});
});
