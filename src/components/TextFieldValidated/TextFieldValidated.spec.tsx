import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import TextFieldValidated from './TextFieldValidated';
import TextField from '../TextField/TextField';

const defaultProps = TextFieldValidated.defaultProps;

describe('TextFieldValidated', () => {
	common(TextFieldValidated);

	describe('props', () => {
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
				'special',
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
				assert.strictEqual(
					wrapper.find(TextField).prop(nonPassThrough),
					undefined
				);
			});
		});
	});
});
