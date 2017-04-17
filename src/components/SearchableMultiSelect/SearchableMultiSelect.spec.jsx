import React from 'react';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import {
	SearchableMultiSelectDumb as SearchableMultiSelect,
} from './SearchableMultiSelect';

const { Option } = SearchableMultiSelect;

describe('SearchableMultiSelect', () => {
	common(SearchableMultiSelect, {
		exemptFunctionProps: ['optionFilter'],
	});

	describe('render', () => {
		it('should render selections', () => {
			const wrapper = shallow(
				<SearchableMultiSelect>
					<Option>option a</Option>
					<Option>option b</Option>
					<Option>option c</Option>
				</SearchableMultiSelect>
			);

			expect(wrapper.find('DropMenu').length).toBe(1);
		});
	});

	describe('props', () => {
		it('onRemoveAll', () => {
			const onRemoveAll = jest.fn();

			const wrapper = shallow(
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
				const wrapper = shallow(
					<SearchableMultiSelect onSearch={onSearch}>
						<Option callbackId={'zero'}>Zero</Option>
						<Option callbackId={'one'}>One</Option>
					</SearchableMultiSelect>
				);
				const expected = {
					event: 'fake',
					props: {
						callbackId: 'zero',
						children: 'Zero',
					},
				};

				wrapper.find('SearchField').prop('onChange')('ero', { event: 'fake' });

				expect(onSearch).toHaveBeenCalledWith('ero', 0, expected);
			});
		});

		describe('onSelect', () => {
			it('should work when fired from the DropMenu', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: {},
					props: {},
				};

				const wrapper = shallow(
					<SearchableMultiSelect onSelect={onSelect}>
						<Option>option a</Option>
					</SearchableMultiSelect>
				);

				wrapper.find('DropMenu').first().prop('onSelect')(
					10,
					mockSelectionCallback
				);

				expect(onSelect).toHaveBeenCalledWith(10, mockSelectionCallback);
			});

			it('should work when fired from a Checkbox', () => {
				const onSelect = jest.fn();
				const stopPropagation = jest.fn();
				const mockSelectionCallback = {
					event: {
						stopPropagation,
					},
					props: {
						callbackId: 0,
					},
				};
				const expected = {
					event: {
						stopPropagation,
					},
					props: {
						callbackId: 'custom',
					},
				};

				const wrapper = shallow(
					<SearchableMultiSelect onSelect={onSelect}>
						<Option callbackId={'custom'} />
					</SearchableMultiSelect>
				);

				wrapper.find('Checkbox').first().prop('onSelect')(
					true,
					mockSelectionCallback
				);

				expect(onSelect).toHaveBeenCalledWith(0, expected);
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
					},
				};

				const wrapper = shallow(
					<SearchableMultiSelect onSelect={onSelect} selectedIndices={[0, 1]}>
						<Option>option a</Option>
						<Option callbackId="custom" />
					</SearchableMultiSelect>
				);

				wrapper.find('Selection').at(1).prop('onRemove')(mockSelectionCallback);

				expect(onSelect).toHaveBeenCalledWith(1, expected);
			});
		});
	});
});
