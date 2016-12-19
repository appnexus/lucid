import React from 'react';
import { DatePicker } from '../../../index';

export default React.createClass({
	getInitialState() {
		return {};
	},

	render() {

		return (
			<section>
				<DatePicker
				 initialState={{date: '2016-12-27'}}
				/>
			</section>
		);
	},
});
