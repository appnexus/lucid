import React from 'react';
import {
	CalendarMonth,
} from '../../../index';

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
