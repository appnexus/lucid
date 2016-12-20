import React from 'react';
import { DateRangeInput } from '../../../index';

export default React.createClass({
	render() {

		return (
			<DateRangeInput
				initialState={{
					date: '2016-12-27',
				}}
				onSelectStart={(...args) => {console.log(...args);}}
				onSelectEnd={(...args) => {console.log(...args);}}
			/>
		);
	},
});
