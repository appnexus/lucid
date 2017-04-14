import React from 'react';
import CalendarMonth from '../CalendarMonth';

export default React.createClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<CalendarMonth selectedDays={new Date()} />

			</section>
		);
	},
});
