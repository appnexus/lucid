import React, { useCallback } from 'react';
import TimeSelectInput from './TimeSelectInput';

interface ITimeSelectMinute {
	minute: number;
	time: Date;
	isDisabled?: boolean;
	onChange(time: Date): void;
}

const shouldGetNextMinuteStep = (minute: number, nextMinute: number) => {
	return (
		minute === nextMinute + 15 ||
		minute === nextMinute - 15 ||
		nextMinute > 59 ||
		nextMinute < 0
	);
};

const getNextMinuteStep = (nextMinute: number) => {
	return [-15, 0, 15, 30, 45, 60].reduce((prev, curr) => {
		return Math.abs(curr - nextMinute) < Math.abs(prev - nextMinute)
			? curr
			: prev;
	});
};

const TimeSelectMinute = ({
	minute,
	time,
	isDisabled,
	onChange,
}: ITimeSelectMinute) => {
	const onMinuteChange = useCallback(
		(nextMinuteString) => {
			const nextMinute = +nextMinuteString;
			const updatedTime = new Date(time);
			const shouldGetNextStep = shouldGetNextMinuteStep(minute, nextMinute);
			const cleanedMinute = shouldGetNextStep
				? getNextMinuteStep(nextMinute)
				: nextMinute;
			updatedTime.setMinutes(cleanedMinute);
			onChange(updatedTime);
		},
		[time, minute]
	);
	return (
		<TimeSelectInput
			value={minute}
			name='Minute'
			onChange={onMinuteChange}
			disabled={isDisabled}
			step={15}
		/>
	);
};

export default TimeSelectMinute;
