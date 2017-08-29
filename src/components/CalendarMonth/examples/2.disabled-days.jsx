import React from 'react';
import createReactClass from 'create-react-class';
import { DateUtils } from 'react-day-picker';
import CalendarMonth from '../CalendarMonth';

export default createReactClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<CalendarMonth disabledDays={DateUtils.isPastDay} />

			</section>
		);
	},
});
