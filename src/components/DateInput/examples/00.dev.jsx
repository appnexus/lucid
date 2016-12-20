import React from 'react';
import { DateInput } from '../../../index';

export default React.createClass({
	render() {

		return (
			<DateInput
				initialState={{
					date: '2016-12-27',
				}}
			/>
		);
	},
});
