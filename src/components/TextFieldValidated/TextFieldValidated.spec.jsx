import React from 'react';
import { common } from '../../util/generic-tests';
import TextFieldValidated from './TextFieldValidated';
import TextField from '../TextField/TextField';
import { shallow } from 'enzyme';
import assert from 'assert';

describe('TextFieldValidated', () => {
	common(TextFieldValidated);

	describe('props', () => {
		it('should pass through props to TextField', () => {
			const onBlur = () => {};
			const wrapper = shallow(<TextFieldValidated onBlur={onBlur} />);
			assert.equal(wrapper.find(TextField).prop('onBlur'), onBlur);
		});
	});
});
