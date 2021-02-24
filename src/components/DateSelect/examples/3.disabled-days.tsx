import React from 'react';
import createClass from 'create-react-class';
import { DateSelect } from '../../../index';
import timemachine from 'timemachine';

timemachine.config({
	dateString: 'December 25, 2018 13:12:59',
});

function isPastDay(date: any) {
	const day = new Date(date.getTime()).setHours(0, 0, 0, 0);
	const today = new Date().setHours(0, 0, 0, 0);
	return day < today;
}

export default createClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>
				<DateSelect disabledDays={isPastDay} />
			</section>
		);
	},
});
