import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import { SearchFieldDumb as SearchField } from './SearchField';
import TextField from '../TextField/TextField';
import SearchIcon from '../Icon/SearchIcon/SearchIcon';

describe('SearchField', () => {
	common(SearchField);

	describe('props', () => {
		const fn = () => {};

		describe('onSubmit', () => {
			it('should pass onSubmit to the underlying TextField', () => {
				const wrapper = shallow(<SearchField onSubmit={fn} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.props().onSubmit, fn);
			});
		});

		describe('onChange', () => {
			it('should pass onChange to the underlying TextField', () => {
				const wrapper = shallow(<SearchField onChange={fn} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.props().onChange, fn);
			});
		});

		describe('onChangeDebounced', () => {
			it('should pass onChangeDebounced to the underlying TextField', () => {
				const wrapper = shallow(<SearchField onChangeDebounced={fn} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.props().onChangeDebounced, fn);
			});
		});

		describe('debounceLevel', () => {
			it('should pass the `debounceLevel` prop thru to the underlying TextField', () => {
				const wrapper = shallow(<SearchField debounceLevel={1000} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.prop('debounceLevel'), 1000);
			});
		});

		describe('isDisabled', () => {
			it('should pass the `isDisabled` prop thru to the underlying TextField', () => {
				const wrapper = shallow(<SearchField isDisabled={true} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.prop('isDisabled'), true);
			});
		});

		describe('value', () => {
			it('should pass a string value prop thru to the underlying TextField', () => {
				const valueText = 'Name/ID';
				const wrapper = shallow(<SearchField value={valueText} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(textFieldWrapper.prop('value'), valueText);
			});
		});

		describe('placeholder', () => {
			it('shold pass a placeholder text thru to the underlying TextField', () => {
				const placeholderText = 'Some placeholder text';
				const wrapper = shallow(<SearchField placeholder={placeholderText} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.strictEqual(
					textFieldWrapper.prop('placeholder'),
					placeholderText
				);
			});
		});

		describe('isValid', () => {
			it('should pass the `&-Icon-active` class to the underlying TextField', () => {
				const wrapper = shallow(<SearchField isValid={true} />);
				console.warn(wrapper.debug());
				const textFieldWrapper = wrapper.find(SearchIcon).first();
				assert.strictEqual(
					textFieldWrapper.hasClass('lucid-SearchField-Icon-active'),
					true
				);
			});
			it('should not pass the `-Icon-active` class to the underlying TextField', () => {
				const wrapper = shallow(<SearchField isValid={false} />);
				console.warn(wrapper.debug());
				const textFieldWrapper = wrapper.find(SearchIcon).first();
				assert.strictEqual(
					textFieldWrapper.hasClass('lucid-SearchField-Icon-active'),
					false
				);
			});
		});
	});
});
