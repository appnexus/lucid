import React from 'react';
import { DateRangeInput } from '../../../index';

export default React.createClass({
	render() {

		return (
			<DateRangeInput
				initialState={{
					date: '2016-12-27',
				}}
				direction='up'
				enabledStart={new Date()}
				enabledEnd='2017-01-20'
			>
				<DateRangeInput.TextFieldStart placeholder='Start Date' />
				<DateRangeInput.TextFieldEnd placeholder='End Date' />
			</DateRangeInput>
		);
	},
});
