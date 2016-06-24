import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import SearchField from './SearchField';
import SearchIcon from '../Icon/SearchIcon/SearchIcon';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import TextField from '../TextField/TextField';

const { Icon } = SearchField;

describe('SearchField', () => {

	common(SearchField);

	describe('render', () => {

		let wrapper;

		beforeEach(() => wrapper = shallow(<SearchField />));

		it('should render a SearchIcon', () => {
			const iconWrapper = wrapper.find(SearchIcon);
			assert.equal(iconWrapper.length, 1);
			assert(iconWrapper.first().hasClass('lucid-SearchField-Icon'));
		});

		it('should render a TextField', () => {
			assert.equal(wrapper.find(TextField).length, 1);
		});

		it('should not add `&-Icon-active` class when input has no value', () => {
			assert(!wrapper.find(SearchIcon).hasClass('lucid-SearchField-Icon-active'));
		});

		it('should add `&-Icon-active` class when input has value', () => {
			const wrapper = shallow(<SearchField value='foo' />);
			assert(wrapper.find(SearchIcon).hasClass('lucid-SearchField-Icon-active'));
		});

	});

	describe('props', () => {

		const fn = () => {};

		describe('onChange', () => {
			it('should pass onChange to the text input', () => {
				const wrapper = shallow(<SearchField onChange={fn} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.equal(textFieldWrapper.props().onChange, fn);
			});
		});

		describe('onSubmit', () => {
			it('should pass onSubmit to the text input', () => {
				const wrapper = shallow(<SearchField onSubmit={fn} />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.equal(textFieldWrapper.props().onSubmit, fn);
			});
		});

		describe('value', () => {
			it('should pass value to the text input', () => {
				const wrapper = shallow(<SearchField value='foo' />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.equal(textFieldWrapper.props().value, 'foo');
			});
		});

		describe('placeholder', () => {
			it('should pass placeholder to the text input', () => {
				const wrapper = shallow(<SearchField placeholder='foo' />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert.equal(textFieldWrapper.props().placeholder, 'foo');
			});
		});

		describe('isDisabled', () => {
			it('should pass isDisabled to the text input', () => {
				const wrapper = shallow(<SearchField isDisabled />);
				const textFieldWrapper = wrapper.find(TextField).first();
				assert(textFieldWrapper.props().isDisabled);
			});
		});

	});

	describe('child components', () => {

		describe('Icon', () => {

			it('should render a custom icon', () => {
				const wrapper = shallow(
					<SearchField>
						<Icon><LoadingIcon /></Icon>
					</SearchField>
				);
				assert.equal(wrapper.find(LoadingIcon).length, 1);
			});

			it('should add `&-Icon` class to the icon', () => {
				const wrapper = shallow(
					<SearchField>
						<Icon><LoadingIcon /></Icon>
					</SearchField>
				);
				const iconWrapper = wrapper.find(LoadingIcon).first();
				assert(iconWrapper.hasClass('lucid-SearchField-Icon'));
			});

			it('should not add `&-Icon-active` class when input has no value', () => {
				const wrapper = shallow(
					<SearchField>
						<Icon><LoadingIcon /></Icon>
					</SearchField>
				);
				const iconWrapper = wrapper.find(LoadingIcon).first();
				assert(!iconWrapper.hasClass('lucid-SearchField-Icon-active'));
			});

			it('should add `&-Icon-active` class when input has value', () => {
				const wrapper = shallow(
					<SearchField value='foo'>
						<Icon><LoadingIcon /></Icon>
					</SearchField>
				);
				const iconWrapper = wrapper.find(LoadingIcon).first();
				assert(iconWrapper.hasClass('lucid-SearchField-Icon-active'));
			});

		});

		describe('TextField', () => {
			it('should render a custom textfield', () => {
				const textField = <SearchField.TextField />;
				const wrapper = shallow(
					<SearchField value='foo'>
						{textField}
					</SearchField>
				);
				assert(wrapper.find(TextField).first().equals(textField));
			});
		});

	});

});
