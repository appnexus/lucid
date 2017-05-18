import React from 'react';
import createClass from 'create-react-class';
import CalendarMonth from '../CalendarMonth';

export default createClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<CalendarMonth selectedDays={new Date()} />

			</section>
		);
	},
});
