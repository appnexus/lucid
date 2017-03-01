import React from 'react';
import CalendarMonth from '../CalendarMonth';

export default React.createClass({
	render() {
		return (
			<section style={{ display: 'flex' }}>

				<CalendarMonth
					modifiers={{
						tuesday: (day) => day.getDay() === 2,
					}}
				/>

				<style>{`
					.lucid-CalendarMonth .DayPicker-Day--tuesday {
						border: 1px dotted gray;
					}
				`}</style>

			</section>
		);
	},
});
