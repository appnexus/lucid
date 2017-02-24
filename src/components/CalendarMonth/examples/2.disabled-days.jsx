import React from 'react';
import { DateUtils } from 'react-day-picker';
import {
	CalendarMonth,
} from '../../../index';

export default React.createClass({
	render() {
		return (
			<section style={{ display: 'flex' }}>

				<CalendarMonth
					disabledDays={DateUtils.isPastDay}
				/>

			</section>
		);
	},
});
