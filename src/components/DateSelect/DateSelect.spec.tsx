import { shallow } from 'enzyme';
import React from 'react';
import _, { keys, forEach, includes } from 'lodash';

import { common, mockDate } from '../../util/generic-tests';
import CalendarMonth from '../CalendarMonth/CalendarMonth';

describe('DateSelect', () => {
	mockDate('2021-12-01T14:25:23-0800');

	// Must load ./CalendarMonth after mocking date
	const DateSelect = require('./DateSelect').DateSelectDumb;

	const defaultProps = DateSelect.defaultProps;

	describe('common tests', () => {
		common(DateSelect);
	});

	describe('props', () => {
		let wrapper: any;

		describe('passthroughs', () => {
			beforeEach(() => {
				const props = {
					...defaultProps,
					selectMode: 'day',
					CalendarMonth: <CalendarMonth />,
					initialState: { test: true },
					callbackId: 1,
					testdataid: 10,
				};

				wrapper = shallow(<DateSelect {...props}></DateSelect>);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through some select props to the root section element', () => {
				const rootProps = keys(wrapper.first().props());

				// root selection element should only contain
				// 'className', 'style' and 'children'
				forEach(['className', 'style', 'children'], (prop) => {
					expect(includes(rootProps, prop)).toBe(true);
				});
			});

			it('omits some props from the root section element', () => {
				const rootProps = keys(wrapper.first().props());

				// It should not pass 'callbackId' or 'initialState' or
				// any of the DateSelect prop types to the root element
				// Note that className is omitted as a pass through,
				// but is also directly applied to element, so it still appears
				forEach(
					[
						'monthsShown',
						'calendarsRendered',
						'offset',
						'from',
						'to',
						'selectMode',
						'initialMonth',
						'selectedDays',
						'disabledDays',
						'showDivider',
						'onSwipe',
						'onPrev',
						'onNext',
						'onSelectDate',
						'isFontSizeRelative',
						'showCursorHighlight',
						'useSlidePanel',
						'CalendarMonth',
						'callbackId',
						'initialState',
					],
					(prop) => {
						expect(includes(rootProps, prop)).toBe(false);
					}
				);
			});
		});
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
