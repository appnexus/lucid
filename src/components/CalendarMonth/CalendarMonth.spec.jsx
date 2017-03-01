import { mount } from 'enzyme';
import React from 'react';
import { common, mockDate } from '../../util/generic-tests';
import CalendarMonth from './CalendarMonth';

describe('CalendarMonth', () => {

	describe('common tests', () => {
		beforeEach(() => {
			mockDate('2016-02-17T14:25:23-0800');
		});

		afterEach(() => {
			mockDate.restore();
		});

		common(CalendarMonth);
	});


	it('should render deeply', () => {
		expect(mount(
			<CalendarMonth initialMonth={new Date('2017-02-01:00:00Z')} cursor={new Date('2017-02-28T00:00:00Z')} />
		)).toMatchSnapshot();
	});

});
