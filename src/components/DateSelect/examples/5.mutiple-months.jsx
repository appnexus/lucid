import React from 'react';
import createClass from 'create-react-class';
import { DateSelect } from '../../../index';

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
