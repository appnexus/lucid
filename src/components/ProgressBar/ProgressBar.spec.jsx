import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import ProgressBar from './ProgressBar';
import Button from '../Button/Button';

describe('ProgressBar', () => {
	common(ProgressBar);

	describe('Events', () => {
		describe('onIncrement', () => {
			it('should be called when button is clicked', () => {
				const onIncrement = jest.fn();
				const wrapper = shallow(<ProgressBar onIncrement={onIncrement} />);
				wrapper.find(Button).simulate('click');
				expect(onIncrement).toHaveBeenCalled();
			});
		});
	});
});
