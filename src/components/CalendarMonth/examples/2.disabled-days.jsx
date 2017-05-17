import React from 'react';
import createClass from 'create-react-class';
import { DateUtils } from 'react-day-picker';
import CalendarMonth from '../CalendarMonth';

export default createClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<CalendarMonth disabledDays={DateUtils.isPastDay} />

			</section>
		);
	},
});
