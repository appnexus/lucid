import React, { useState } from 'react';
import TimeSelect from '../TimeSelect';

const TwelveHourDisabled = () => {
	const [time, setTime] = useState(new Date());

	return <TimeSelect isDisabled={true} time={time} onChange={setTime} />;
};

export default TwelveHourDisabled;
