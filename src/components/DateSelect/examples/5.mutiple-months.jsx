import React from 'react';
import createClass from 'create-react-class';
import { DateSelect } from '../../../index';

export default createClass({
	render() {
		return (
			<DateSelect
				selectedDays={new Date(2019, 7, 4)}
				monthsShown={3}
				calendarsRendered={9}
				showDivider
			/>
		);
	},
});
