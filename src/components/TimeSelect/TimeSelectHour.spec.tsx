import { shallow } from 'enzyme';
import React from 'react';
import TimeSelectHour from './TimeSelectHour';
import TimeSelectInput from './TimeSelectInput';

describe('TimeSelectHour', () => {
	const props = {
		hour: 5,
		time: new Date(2020, 10, 3),
		is24HourClock: false,
		isAM: false,
		isDisabled: false,
		onChange: jest.fn(),
	};

	let component: any;
	beforeEach(() => {
		component = shallow(<TimeSelectHour {...props} />);
	});

	it('should render a TimeSelectInput component with correct props', () => {
		expect(component.find(TimeSelectInput).props()).toEqual({
			className: 'lucid-TimeSelect-time-hour',
			value: props.hour,
			name: 'Hour',
			onChange: expect.any(Function),
			step: 1,
			disabled: props.isDisabled,
		});
	});

	describe('when onChange is called', () => {
		beforeEach(() => {
			props.onChange.mockReset();
		});
		describe('and is24HourClock is true', () => {
			describe('and is rolling over', () => {
				it('should set the next hour', () => {
					component = shallow(<TimeSelectHour {...props} is24HourClock />);
					component.find(TimeSelectInput).props().onChange('24');
					expect(props.onChange).toBeCalledWith(
						new Date('2020-11-04T00:00:00')
					);
				});
			});
			describe('and is rolling under', () => {
				it('should set the next hour', () => {
					component = shallow(<TimeSelectHour {...props} is24HourClock />);
					component.find(TimeSelectInput).props().onChange('-1');
					expect(props.onChange).toBeCalledWith(
						new Date('2020-11-02T23:00:00')
					);
				});
			});
			it('should set the next hour', () => {
				component = shallow(<TimeSelectHour {...props} is24HourClock />);
				component.find(TimeSelectInput).props().onChange('18');
				expect(props.onChange).toBeCalledWith(new Date('2020-11-03T18:00:00'));
			});
		});
		describe('and is24HourClock is false', () => {
			describe('and is am', () => {
				describe('and is rolling over', () => {
					it('should set the next hour', () => {
						component = shallow(<TimeSelectHour {...props} hour={11} isAM />);
						component.find(TimeSelectInput).props().onChange('12');
						expect(props.onChange).toBeCalledWith(
							new Date('2020-11-03T12:00:00')
						);
					});
				});
				describe('and is rolling under', () => {
					it('should set the next hour', () => {
						component = shallow(
							<TimeSelectHour {...props} hour={12} isAM={false} />
						);
						component.find(TimeSelectInput).props().onChange('11');
						expect(props.onChange).toBeCalledWith(
							new Date('2020-11-03T11:00:00')
						);
					});
				});
			});
			describe('and is PM', () => {
				describe('and is rolling over', () => {
					it('should set the next hour', () => {
						component = shallow(
							<TimeSelectHour {...props} hour={11} isAM={false} />
						);
						component.find(TimeSelectInput).props().onChange('12');
						expect(props.onChange).toBeCalledWith(
							new Date('2020-11-04T00:00:00')
						);
					});
				});
				describe('and is rolling under', () => {
					it('should set the next hour', () => {
						component = shallow(
							<TimeSelectHour {...props} hour={12} isAM={true} />
						);
						component.find(TimeSelectInput).props().onChange('11');
						expect(props.onChange).toBeCalledWith(
							new Date('2020-11-02T23:00:00')
						);
					});
				});
			});

			it('should set the next hour', () => {
				component = shallow(<TimeSelectHour {...props} hour={4} />);
				component.find(TimeSelectInput).props().onChange('5');
				expect(props.onChange).toBeCalledWith(new Date('2020-11-03T17:00:00'));
			});
		});
	});
});
