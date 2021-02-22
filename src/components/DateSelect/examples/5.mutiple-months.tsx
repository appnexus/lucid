import React from 'react';
import createClass from 'create-react-class';
import { DateSelect } from '../../../index';
import timemachine from 'timemachine';

timemachine.config({
	dateString: 'December 25, 2018 13:12:59',
});

export default createClass({
	render() {
		return (
			<DateSelect
				selectedDays={new Date()}
				monthsShown={3}
				calendarsRendered={9}
				showDivider
			/>
		);
	},
});
