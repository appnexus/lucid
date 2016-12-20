import React from 'react';
import { DateRangeInput } from '../../../index';

export default React.createClass({
	render() {

		return (
			<DateRangeInput
				initialState={{
					date: '2016-12-27',
				}}
			/>
		);
	},
});
