import React, { useState } from 'react';
import TimeSelect from './TimeSelect';

export default {
	title: 'Controls/TimeSelect',
	component: TimeSelect,
	parameters: {
		docs: {
			description: {
				component: (TimeSelect as any).peek.description,
			},
		},
	},
};

/* Twelve Hour */
export const TwelveHour = () => {
	const [time, setTime] = useState(new Date());

	return <TimeSelect time={time} onChange={setTime} />;
};
TwelveHour.storyName = 'TwelveHour';

/* Twelve Hour Disabled */
export const TwelveHourDisabled = () => {
	const [time, setTime] = useState(new Date());

	return <TimeSelect isDisabled={true} time={time} onChange={setTime} />;
};
TwelveHourDisabled.storyName = 'TwelveHourDisabled';

/* Twenty Four Hour */
export const TwentyFourHour = () => {
	const [time, setTime] = useState(new Date());

	return <TimeSelect time={time} is24HourClock={true} onChange={setTime} />;
};
TwentyFourHour.storyName = 'TwentyFourHour';
