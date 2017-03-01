import React from 'react';
import CalendarMonth from '../CalendarMonth';

export default React.createClass({
	render() {
		return (
			<section style={{ display: 'flex' }}>

				<CalendarMonth
					selectedDays={new Date()}
				/>

			</section>
		);
	},
});
