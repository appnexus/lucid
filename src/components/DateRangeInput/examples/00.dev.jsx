import React from 'react';
import { DateRangeInput } from '../../../index';

export default React.createClass({
	render() {

		return (
			<section style={{marginBottom: 300}}>
				<DateRangeInput
					initialState={{
						date: '2016-12-27',
					}}
					size={2}
					maxMonthWidth={2}
					direction='down'
					enabledStart={new Date()}
					enabledEnd={new Date().setFullYear(new Date().getFullYear() + 1)}
				>
					<DateRangeInput.TextFieldStart placeholder='Start Date' />
					<DateRangeInput.TextFieldEnd placeholder='End Date' />
				</DateRangeInput>
			</section>
		);
	},
});
