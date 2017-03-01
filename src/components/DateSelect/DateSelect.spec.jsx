import { shallow } from 'enzyme';
import React from 'react';
import { common, mockDate } from '../../util/generic-tests';
import { DateSelectDumb as DateSelect } from './DateSelect';

describe('DateSelect', () => {

	describe('common tests', () => {
		beforeEach(() => {
			mockDate('2016-02-17T14:25:23-0800');
		});

		afterEach(() => {
			mockDate.restore();
		});

		common(DateSelect);
	});

	describe('event handlers', () => {
		it('should trigger `onSelectDate` when a non-disabled day is clicked', () => {
			const onSelectDate = jest.fn();
			const mockEvent = {};
			const selectDate = new Date('2017-02-28T00:00:00Z');
			const wrapper = shallow(
				<DateSelect onSelectDate={onSelectDate} />
			);
			const dateSelectInstance = wrapper.instance();
			dateSelectInstance.handleDayClick(selectDate, { disabled: false }, mockEvent);

			expect(onSelectDate).toHaveBeenCalledWith(selectDate, {event: mockEvent, props: dateSelectInstance.props});
		});

		it('should not trigger `onSelectDate` when a disabled day is clicked', () => {
			const onSelectDate = jest.fn();
			const mockEvent = {};
			const selectDate = new Date('2017-02-28T00:00:00Z');
			const wrapper = shallow(
				<DateSelect onSelectDate={onSelectDate} />
			);
			const dateSelectInstance = wrapper.instance();
			dateSelectInstance.handleDayClick(selectDate, { disabled: true }, mockEvent);

			expect(onSelectDate).not.toHaveBeenCalled();
		});
	});

});
