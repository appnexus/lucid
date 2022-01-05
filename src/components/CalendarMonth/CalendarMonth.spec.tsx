import { shallow } from 'enzyme';
import React from 'react';
import { common, mockDate } from '../../util/generic-tests';

describe('CalendarMonth', () => {
	mockDate('2016-02-01T14:25:23-0800');

	// Must load ./CalendarMonth after mocking date
	const CalendarMonth = require('./CalendarMonth').default;

	describe('common tests', () => {
		common(CalendarMonth);
	});

	describe('modifierRange', () => {
		it('`cursor` date should be in range', () => {
			const wrapper = shallow(
				<CalendarMonth
					initialMonth={new Date('2017-02-01:00:00Z')}
					selectMode='day'
					cursor={new Date('2017-02-14T00:00:00Z')}
				/>
			);
			const calendarMonthInstance: any = wrapper.instance();
			const isInRange = calendarMonthInstance.modifierRange(
				new Date('2017-02-14T00:00:00Z')
			);
			expect(isInRange).toBe(true);
		});

		it('dates between `from` and `cursor` should be in range', () => {
			const wrapper = shallow(
				<CalendarMonth
					initialMonth={new Date('2017-02-01:00:00Z')}
					selectMode='to'
					from={new Date('2017-02-12T00:00:00Z')}
					cursor={new Date('2017-02-14T00:00:00Z')}
				/>
			);
			const calendarMonthInstance: any = wrapper.instance();
			const isInRange11 = calendarMonthInstance.modifierRange(
				new Date('2017-02-11T00:00:00Z')
			);
			const isInRange12 = calendarMonthInstance.modifierRange(
				new Date('2017-02-12T00:00:00Z')
			);
			const isInRange13 = calendarMonthInstance.modifierRange(
				new Date('2017-02-13T00:00:00Z')
			);
			const isInRange14 = calendarMonthInstance.modifierRange(
				new Date('2017-02-14T00:00:00Z')
			);
			const isInRange15 = calendarMonthInstance.modifierRange(
				new Date('2017-02-15T00:00:00Z')
			);
			expect(isInRange11).toBeFalsy();
			expect(isInRange12).toBe(true);
			expect(isInRange13).toBe(true);
			expect(isInRange14).toBe(true);
			expect(isInRange15).toBeFalsy();
		});

		it('`cursor` date should only date in range if `from` or `to` not set', () => {
			const wrapper = shallow(
				<CalendarMonth
					initialMonth={new Date('2017-02-01:00:00Z')}
					selectMode='from'
					from={null}
					to={null}
					cursor={new Date('2017-02-14T00:00:00Z')}
				/>
			);
			const calendarMonthInstance: any = wrapper.instance();
			const isInRange13 = calendarMonthInstance.modifierRange(
				new Date('2017-02-13T00:00:00Z')
			);
			const isInRange14 = calendarMonthInstance.modifierRange(
				new Date('2017-02-14T00:00:00Z')
			);
			const isInRange15 = calendarMonthInstance.modifierRange(
				new Date('2017-02-15T00:00:00Z')
			);
			expect(isInRange13).toBeFalsy();
			expect(isInRange14).toBe(true);
			expect(isInRange15).toBeFalsy();
		});

		it('dates should in range between `from` and `to` without `cursor`', () => {
			const wrapper = shallow(
				<CalendarMonth
					initialMonth={new Date('2017-02-01:00:00Z')}
					selectMode='to'
					from={new Date('2017-02-12T00:00:00Z')}
					to={new Date('2017-02-14T00:00:00Z')}
				/>
			);
			const calendarMonthInstance: any = wrapper.instance();
			const isInRange11 = calendarMonthInstance.modifierRange(
				new Date('2017-02-11T00:00:00Z')
			);
			const isInRange12 = calendarMonthInstance.modifierRange(
				new Date('2017-02-12T00:00:00Z')
			);
			const isInRange13 = calendarMonthInstance.modifierRange(
				new Date('2017-02-13T00:00:00Z')
			);
			const isInRange14 = calendarMonthInstance.modifierRange(
				new Date('2017-02-14T00:00:00Z')
			);
			const isInRange15 = calendarMonthInstance.modifierRange(
				new Date('2017-02-15T00:00:00Z')
			);
			expect(isInRange11).toBeFalsy();
			expect(isInRange12).toBe(true);
			expect(isInRange13).toBe(true);
			expect(isInRange14).toBe(true);
			expect(isInRange15).toBeFalsy();
		});

		it('should return false if no cursor or range dates', () => {
			const wrapper = shallow(
				<CalendarMonth
					initialMonth={new Date('2017-02-01:00:00Z')}
					cursor={null}
				/>
			);
			const calendarMonthInstance: any = wrapper.instance();
			const isInRange = calendarMonthInstance.modifierRange(
				new Date('2017-02-14T00:00:00Z')
			);
			expect(isInRange).toBe(false);
		});
	});

	describe('modifierFrom', () => {
		it('should mark `from` day', () => {
			const wrapper = shallow(
				<CalendarMonth
					initialMonth={new Date('2017-02-01:00:00Z')}
					from={new Date('2017-02-14T00:00:00Z')}
				/>
			);
			const calendarMonthInstance: any = wrapper.instance();
			const isFromDate = calendarMonthInstance.modifierFrom(
				new Date('2017-02-14T00:00:00Z')
			);
			expect(isFromDate).toBe(true);
		});
	});

	describe('modifierTo', () => {
		it('should mark `to` day', () => {
			const wrapper = shallow(
				<CalendarMonth
					initialMonth={new Date('2017-02-01:00:00Z')}
					to={new Date('2017-02-14T00:00:00Z')}
				/>
			);
			const calendarMonthInstance: any = wrapper.instance();
			const isToDate = calendarMonthInstance.modifierTo(
				new Date('2017-02-14T00:00:00Z')
			);
			expect(isToDate).toBe(true);
		});
	});

	describe('shouldComponentUpdate', () => {
		it('should determine shouldComponentUpdate by using prop value', () => {
			const wrapper = shallow(<CalendarMonth shouldComponentUpdate={true} />);
			const calendarMonthInstance: any = wrapper.instance();
			const shouldComponentUpdate =
				calendarMonthInstance.shouldComponentUpdate();
			expect(shouldComponentUpdate).toBe(true);
		});
	});
});
