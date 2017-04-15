import React from 'react';
import { DateUtils } from 'react-day-picker';
import { DateSelect } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<DateSelect disabledDays={DateUtils.isPastDay} />

			</section>
		);
	},
});
