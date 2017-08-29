import React from 'react';
import createReactClass from 'create-react-class';
import { DateSelect } from '../../../index';

export default createReactClass({
	render() {
		return (
			<section style={{ maxWidth: 400 }}>

				<DateSelect
					initialMonth={new Date(2016, 1)}
					selectedDays={new Date(2016, 1, 17)}
				/>

			</section>
		);
	},
});
