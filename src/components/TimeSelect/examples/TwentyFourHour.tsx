import React, { useState } from 'react';
import TimeSelect from '../TimeSelect';

const TwentyFourHour = () => {
	const [time, setTime] = useState(new Date());

	return <TimeSelect time={time} is24HourClock={true} onChange={setTime} />;
};

export default TwentyFourHour;
