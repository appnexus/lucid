import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import { SearchFieldDumb as SearchField } from './SearchField';
import TextField from '../TextField/TextField';

describe('SearchField', () => {
	common(SearchField);

	describe('props', () => {
		const fn = () => {};

		describe('onChange', () => {
			it('should pass onChange to the text input', () => {
				const wrapper = shallow(<SearchField onChange={fn} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.equal(textFieldWrapper.props().onChange, fn);
			});
		});

		describe('onChangeDebounced', () => {
			it('should pass onChangeDebounced to the text input', () => {
				const wrapper = shallow(<SearchField onChangeDebounced={fn} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.equal(textFieldWrapper.props().onChangeDebounced, fn);
			});
		});

		describe('onSubmit', () => {
			it('should pass onSubmit to the text input', () => {
				const wrapper = shallow(<SearchField onSubmit={fn} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.equal(textFieldWrapper.props().onSubmit, fn);
			});
		});
	});
});
