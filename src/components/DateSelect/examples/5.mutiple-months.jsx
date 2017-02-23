import React from 'react';
import {
	DateSelect,
} from '../../../index';

export default React.createClass({
	render() {
		return (
			<section style={{ maxWidth: 736 }}>

				<DateSelect
					selectedDays={new Date()}
					monthsShown={2}
				/>

			</section>
		);
	},
});
