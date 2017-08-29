import React from 'react';
import createReactClass from 'create-react-class';
import { DateSelect } from '../../../index';

export default createReactClass({
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
