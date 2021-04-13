import { shallow } from 'enzyme';
import React from 'react';
import TimeSelectInput from './TimeSelectInput';
import TimeSelectMinute from './TimeSelectMinute';

describe('TimeSelectMinute', () => {
	const props = {
		minute: 29,
		time: new Date(2020, 10, 3),
		isDisabled: false,
		onChange: jest.fn(),
	};

	let component: any;
	beforeEach(() => {
		component = shallow(<TimeSelectMinute {...props} />);
	});

	it('should render TimeSelectInput component with correct props', () => {
		expect(component.find(TimeSelectInput).props()).toEqual({
			value: props.minute,
			name: 'Minute',
			onChange: expect.any(Function),
			disabled: props.isDisabled,
			step: 15,
		});
	});

	describe('when onChange prop is called on TimeSelectInput', () => {
		beforeEach(() => {
			props.onChange.mockReset();
		});

		describe('and next value is under 0', () => {
			it('should set correct minute', () => {
				component.find(TimeSelectInput).props().onChange('-20');
				expect(props.onChange).toBeCalledWith(new Date('2020-11-02T23:45:00'));
			});
		});
		describe('and next value is over 59', () => {
			it('should set correct minute', () => {
				component.find(TimeSelectInput).props().onChange('60');
				expect(props.onChange).toBeCalledWith(new Date('2020-11-03T01:00:00'));
			});
		});

		describe('and next value is 15 mins more than prior hour', () => {
			it('should set correct minute', () => {
				component = shallow(<TimeSelectMinute {...props} minute={20} />);
				component.find(TimeSelectInput).props().onChange('35');
				expect(props.onChange).toBeCalledWith(new Date('2020-11-03T00:30:00'));
			});
		});

		describe('and next value is 15 mins less than prior hour', () => {
			it('should set correct minute', () => {
				component = shallow(<TimeSelectMinute {...props} minute={20} />);
				component.find(TimeSelectInput).props().onChange('5');
				expect(props.onChange).toBeCalledWith(new Date('2020-11-03T00:00:00'));
			});
		});

		it('should set correct minute', () => {
			component.find(TimeSelectInput).props().onChange('34');
			expect(props.onChange).toBeCalledWith(new Date('2020-11-03T00:34:00'));
		});
	});
});
