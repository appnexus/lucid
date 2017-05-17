import React from 'react';
import createClass from 'create-react-class';
import { DateUtils } from 'react-day-picker';
import { DateSelect } from '../../../index';

export default createClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<DateSelect disabledDays={DateUtils.isPastDay} />

			</section>
		);
	},
});
