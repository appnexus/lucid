import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import TextFieldValidated from './TextFieldValidated';
import TextField from '../TextField/TextField';

const defaultProps = TextFieldValidated.defaultProps;

describe('TextFieldValidated', () => {
	common(TextFieldValidated);

	describe('props', () => {
		it('Error should display as an error message', () => {
			const errorMsg = 'Test error!';
			const wrapper = mount(
				<TextFieldValidated {...defaultProps} Error={errorMsg} />
			);

			expect(
				wrapper.find('.lucid-Validation').hasClass('lucid-Validation-is-error')
			).toEqual(true);
			expect(
				wrapper.find('.lucid-Validation-error-content').contains(errorMsg)
			).toEqual(true);
		});

		it('Info should apply the info styling, if there is no error, and an info message', () => {
			const infoMsg = 'Info message';
			const wrapper = mount(<TextFieldValidated Error={null} Info={infoMsg} />);

			expect(wrapper.find('.lucid-Validation').hasClass('-info')).toEqual(true);
			expect(
				wrapper.find('.lucid-Validation-error-content').contains(infoMsg)
			).toEqual(true);
		});

		it('should pass through onBlur prop to TextField', () => {
			const onBlur = () => {};
			const wrapper = shallow(
				<TextFieldValidated {...defaultProps} onBlur={onBlur} />
			);
			assert.strictEqual(wrapper.find(TextField).prop('onBlur'), onBlur);
		});

		it('should not pass through its props to TextField', () => {
			const nonPassThroughs = [
				'style',
				'className',
				'Error',
				'Info',
				'initialState',
				'Success',
			];
			const style = { height: 20 };
			const wrapper = shallow(
				<TextFieldValidated
					{...defaultProps}
					style={style}
					className='test'
					Error='Error'
					Info='Info'
				/>
			);

			nonPassThroughs.forEach((nonPassThrough) => {
				expect(wrapper.find(TextField).prop(nonPassThrough)).toBe(undefined);
			});
		});
		it('allows certain passthroughs to be spread into TextField subcomponent', () => {
			const wrapper = shallow(
				<TextFieldValidated {...defaultProps} callbackId={1} data-testid={10} />
			);

			expect(wrapper.find(TextField).prop('data-testid')).toBe(10);
			expect(wrapper.find(TextField).prop('callbackId')).toBe(1);
		});
	});
});
