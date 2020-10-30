import React, { useState } from 'react';
import TimeSelect from '../TimeSelect';

const TwelveHour = () => {
	const [time, setTime] = useState(new Date());

	return (
		<TimeSelect time={time} onChange={setTime}>
			<div
				style={{
					backgroundColor: 'red',
					position: 'absolute',
					marginLeft: '50px',
				}}
			>
				Some really cool selector
			</div>
		</TimeSelect>
	);
};

export default TwelveHour;
