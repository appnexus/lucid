import { shallow } from 'enzyme';
import React from 'react';
import TimeSelect, { MeridiemType } from './TimeSelect';
import TimeSelectHour from './TimeSelectHour';
import TimeSelectMeridiem from './TimeSelectMeridiem';
import TimeSelectMinute from './TimeSelectMinute';

describe('TimeSelect', () => {
	const props = {
		time: new Date('2020-11-03T17:30:00'), //YYYY-MM-DDTHH:MM:SS
		is24HourClock: false,
		onChange: jest.fn(),
		isDisabled: false,
	};

	let component: any;
	beforeEach(() => {
		component = shallow(<TimeSelect {...props} />);
	});

	it('should render TimeSelectHour with correct props', () => {
		expect(component.find(TimeSelectHour).props()).toEqual({
			hour: 5,
			time: props.time,
			is24HourClock: props.is24HourClock,
			isAM: false,
			isDisabled: props.isDisabled,
			onChange: props.onChange,
		});
	});

	it('should render TimeSelectMinute with correct props', () => {
		expect(component.find(TimeSelectMinute).props()).toEqual({
			minute: 30,
			time: props.time,
			isDisabled: props.isDisabled,
			onChange: props.onChange,
		});
	});

	describe('when is not is24HourClock', () => {
		it('should NOT render TimeSelectMeridiem', () => {
			component = shallow(<TimeSelect {...props} is24HourClock />);
			expect(component.find(TimeSelectMeridiem)).toHaveLength(0);
		});
	});
	describe('when is is24HourClock', () => {
		it('should render TimeSelectMeridiem with correct props', () => {
			expect(component.find(TimeSelectMeridiem).props()).toEqual({
				hour: 5,
				meridiem: MeridiemType.PM,
				time: props.time,
				isDisabled: props.isDisabled,
				onChange: props.onChange,
			});
		});
	});
});
