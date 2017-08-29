import React from 'react';
import createReactClass from 'create-react-class';
import { DateSelect } from '../../../index';

export default createReactClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<DateSelect>
					<DateSelect.CalendarMonth
						modifiers={{
							tuesday: date => date.getDay() === 2,
						}}
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
