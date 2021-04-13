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
			const wrapper = shallow(<DateSelect onSelectDate={onSelectDate} />);
			const dateSelectInstance: any = wrapper.instance();
			dateSelectInstance.handleDayClick(
				selectDate,
				{ disabled: false },
				mockEvent
			);

			expect(onSelectDate).toHaveBeenCalledWith(selectDate, {
				event: mockEvent,
				props: dateSelectInstance.props,
			});
		});

		it('should not trigger `onSelectDate` when a disabled day is clicked', () => {
			const onSelectDate = jest.fn();
			const mockEvent = {};
			const selectDate = new Date('2017-02-28T00:00:00Z');
			const wrapper = shallow(<DateSelect onSelectDate={onSelectDate} />);
			const dateSelectInstance: any = wrapper.instance();
			dateSelectInstance.handleDayClick(
				selectDate,
				{ disabled: true },
				mockEvent
			);

			expect(onSelectDate).not.toHaveBeenCalled();
		});

		it('should trigger onPrev handler', () => {
			const onPrev = jest.fn();
			const mockEvent = {};
			const wrapper = shallow(
				<DateSelect
					initialMonth={new Date('2017-02-00T00:00:00Z')}
					onPrev={onPrev}
				/>
			);
			const dateSelectInstance: any = wrapper.instance();
			dateSelectInstance.handlePrev({ event: mockEvent });

			expect(onPrev).toHaveBeenCalledWith({
				event: mockEvent,
				props: dateSelectInstance.props,
			});
		});

		it('should trigger onNext handler', () => {
			const onNext = jest.fn();
			const mockEvent = {};
			const wrapper = shallow(
				<DateSelect
					initialMonth={new Date('2017-02-00T00:00:00Z')}
					onNext={onNext}
				/>
			);
			const dateSelectInstance: any = wrapper.instance();
			dateSelectInstance.handleNext({ event: mockEvent });

			expect(onNext).toHaveBeenCalledWith({
				event: mockEvent,
				props: dateSelectInstance.props,
			});
		});
	});

	describe('handling cursor state events', () => {
		it('should set cursor state on handleMouseEnter for non-disabled date', () => {
			const cursorDate = new Date('2017-02-17T00:00:00Z');
			const wrapper = shallow(
				<DateSelect initialMonth={new Date('2017-02-01T00:00:00Z')} />
			);
			const dateSelectInstance: any = wrapper.instance();
			dateSelectInstance.handleDayMouseEnter(cursorDate, { disabled: false });
			expect(dateSelectInstance.state.cursor).toBe(cursorDate);
		});

		it('should not set cursor state on handleMouseEnter for disabled date', () => {
			const cursorDate = new Date('2017-02-17T00:00:00Z');
			const wrapper = shallow(
				<DateSelect initialMonth={new Date('2017-02-01T00:00:00Z')} />
			);
			const dateSelectInstance: any = wrapper.instance();
			dateSelectInstance.handleDayMouseEnter(cursorDate, { disabled: true });
			expect(dateSelectInstance.state.cursor).not.toBe(cursorDate);
		});

		it('should unset cursor state on handleMouseLeave', (done) => {
			const cursorDate = new Date('2017-02-17T00:00:00Z');
			const wrapper = shallow(
				<DateSelect initialMonth={new Date('2017-02-01T00:00:00Z')} />
			);
			const dateSelectInstance: any = wrapper.instance();
			wrapper.setState(
				{
					cursor: cursorDate,
				},
				() => {
					dateSelectInstance.handleDayMouseLeave();
					wrapper.setState({}, () => {
						expect(dateSelectInstance.state.cursor).toBeNull();
						done();
					});
				}
			);
		});
	});
});
