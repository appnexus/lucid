import React from 'react';
import {
	DateSelect,
} from '../../../index';

export default React.createClass({
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
