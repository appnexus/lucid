import React, { useState } from 'react';
import TimeSelect from '../TimeSelect';

const TwelveHour = () => {
	const [time, setTime] = useState(new Date());

	return <TimeSelect time={time} onChange={setTime} />;
};

export default TwelveHour;
