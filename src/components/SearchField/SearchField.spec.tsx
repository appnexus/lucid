import _ from 'lodash';
import React, { ReactElement } from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import { SearchFieldDumb as SearchField } from './SearchField';
import TextField from '../TextField/TextField';
import SearchIcon from '../Icon/SearchIcon/SearchIcon';

describe('SearchField', () => {
	common(SearchField);

	describe('props', () => {
		const fn = _.noop;
		const defaultProps = SearchField.defaultProps;

		describe('onSubmit', () => {
			it('should pass onSubmit to the underlying TextField', () => {
				const wrapper = shallow(
					<SearchField {...defaultProps} onSubmit={fn} />
				);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.props().onSubmit, fn);
			});
		});

		describe('onChange', () => {
			it('should pass onChange to the underlying TextField', () => {
				const wrapper = shallow(
					<SearchField {...defaultProps} onChange={fn} />
				);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.props().onChange, fn);
			});
		});

		describe('onChangeDebounced', () => {
			it('should pass onChangeDebounced to the underlying TextField', () => {
				const wrapper = shallow(
					<SearchField {...defaultProps} onChangeDebounced={fn} />
				);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.props().onChangeDebounced, fn);
			});
		});

		describe('debounceLevel', () => {
			it('should pass the `debounceLevel` prop thru to the underlying TextField', () => {
				const wrapper = shallow(
					<SearchField {...defaultProps} debounceLevel={1000} />
				);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.prop('debounceLevel'), 1000);
			});
		});

		describe('isDisabled', () => {
			it('should pass the `isDisabled` prop thru to the underlying TextField', () => {
				const wrapper = shallow(
					<SearchField {...defaultProps} isDisabled={true} />
				);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.prop('isDisabled'), true);
			});
		});

		describe('value', () => {
			it('should pass a string value prop thru to the underlying TextField', () => {
				const valueText = 'Name/ID';
				const wrapper = shallow(
					<SearchField {...defaultProps} value={valueText} />
				);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.prop('value'), valueText);
			});
		});

		describe('placeholder', () => {
			it('shold pass a placeholder text thru to the underlying TextField', () => {
				const placeholderText = 'Some placeholder text';
				const wrapper = shallow(
					<SearchField {...defaultProps} placeholder={placeholderText} />
				);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(
					textFieldWrapper.prop('placeholder'),
					placeholderText
				);
			});
		});

		describe('isValid', () => {
			it('should pass the `&-Icon-active` class to the underlying TextField', () => {
				const wrapper = shallow(
					<SearchField {...defaultProps} isValid={true} />
				);
				const textFieldWrapper = wrapper.find(SearchIcon).first();
				assert.strictEqual(
					textFieldWrapper.hasClass('lucid-SearchField-Icon-active'),
					true
				);
			});
			it('should not pass the `-Icon-active` class to the underlying TextField', () => {
				const wrapper = shallow(
					<SearchField {...defaultProps} isValid={false} />
				);
				const textFieldWrapper = wrapper.find(SearchIcon).first();
				assert.strictEqual(
					textFieldWrapper.hasClass('lucid-SearchField-Icon-active'),
					false
				);
			});
		});

		describe('nonPassThroughs', () => {
			it('should filter out specfic props from the SearchField wrapper', () => {
				const nonPassThroughs = {
					onChange: fn,
					onChangeDebounced: fn,
					debounceLevel: 1000,
					onSubmit: fn,
					value: 'search',
					isValid: true,
					isDisabled: true,
					placeholder: 'some placeholder text',
					className: 'testClassName',
					Icon: <SearchIcon />,
					TextField: <></>,
					initialState: {},
					callbackId: 1,
				};
				const combinedProps = { ...defaultProps, ...nonPassThroughs };
				const wrapper = shallow(<SearchField {...combinedProps} />);
				assert.strictEqual(wrapper.prop('callbackId'), undefined);
				assert.strictEqual(wrapper.prop('initalState'), undefined);
				assert.strictEqual(wrapper.prop('Icon'), undefined);
				assert.strictEqual(wrapper.prop('TextField'), undefined);
			});
		});
	});
});
