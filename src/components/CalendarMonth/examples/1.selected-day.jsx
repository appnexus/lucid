import React from 'react';
import createReactClass from 'create-react-class';
import CalendarMonth from '../CalendarMonth';

export default createReactClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<CalendarMonth selectedDays={new Date()} />

			</section>
		);
	},
});
