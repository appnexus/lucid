import React from 'react';
import createClass from 'create-react-class';
import { DateSelect } from '../../../index';
import timemachine from 'timemachine';

timemachine.config({
	dateString: 'December 25, 2018 13:12:59',
});

export default createClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>
				<DateSelect>
					<DateSelect.CalendarMonth
						modifiers={
							{
								tuesday: (date: any) => date.getDay() === 2,
							} as any
						}
					/>
				</DateSelect>

				<style>{`
					.lucid-CalendarMonth .DayPicker-Day--tuesday {
						border: 1px dotted gray;
					}
				`}</style>
			</section>
		);
	},
});
