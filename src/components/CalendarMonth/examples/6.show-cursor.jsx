import React from 'react';
import CalendarMonth from '../CalendarMonth';

export default React.createClass({
	componentWillMount() {
		this.fromDate = new Date();
		this.fromDate.setDate(1);
	},

	render() {
		return (
			<section>

				Cursor for day selectMode:
				<section style={{ display: 'flex' }}>
					<CalendarMonth
						cursor={new Date()}
					/>
				</section>

				Cursor for range selectMode:
				<section style={{ display: 'flex' }}>
					<CalendarMonth
						selectMode='to'
						from={this.fromDate}
						cursor={new Date()}
					/>
				</section>

			</section>
		);
	},
});
