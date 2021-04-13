import React, { useCallback } from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import TimeSelectInput from './TimeSelectInput';

const cx = lucidClassNames.bind('&-TimeSelect');

const getCleanedHour = (partialCleanedHour: number) => {
	return partialCleanedHour < 0
		? 23
		: partialCleanedHour > 23
		? 0
		: partialCleanedHour;
};

const getCleanedAMHour = (nextHour: number) => {
	const partialCleanedHour =
		nextHour > 12 ? nextHour - 12 : nextHour < 0 ? nextHour + 12 : nextHour;
	return getCleanedHour(partialCleanedHour);
};
const getCleanedPMHour = (nextHour: number) => {
	const partialCleanedHour =
		nextHour === 12 ? 12 : nextHour > 12 ? nextHour : nextHour + 12;
	return getCleanedHour(partialCleanedHour);
};

interface ITimeSelectHour {
	hour: number;
	time: Date;
	is24HourClock?: boolean;
	isAM: boolean;
	isDisabled?: boolean;
	onChange(time: Date): void;
}

const TimeSelectHour = ({
	hour,
	is24HourClock,
	time,
	isAM,
	isDisabled,
	onChange,
}: ITimeSelectHour) => {
	const onHourChange = useCallback(
		(nextHourString) => {
			const nextHour = +nextHourString;
			const updatedTime = new Date(time);
			if (is24HourClock) {
				const cleanedNextHour =
					nextHour < 0 ? -1 : nextHour > 23 ? 24 : nextHour;
				updatedTime.setHours(cleanedNextHour);
			} else {
				const nextHouris12 = nextHour === 12;
				const shouldRollOver = hour === 11 && nextHouris12;
				const shouldRollBack = hour === 12 && nextHour === 11;
				let cleanedHour;
				if (shouldRollOver) {
					cleanedHour = isAM ? 12 : 24;
				} else if (shouldRollBack) {
					cleanedHour = isAM ? -1 : 11;
				} else {
					cleanedHour = isAM
						? getCleanedAMHour(nextHour)
						: getCleanedPMHour(nextHour);
				}
				updatedTime.setHours(cleanedHour);
			}
			onChange(updatedTime);
		},
		[time, is24HourClock, isAM, hour]
	);

	return (
		<TimeSelectInput
			className={cx('&-time-hour')}
			value={hour}
			name='Hour'
			onChange={onHourChange}
			disabled={isDisabled}
		/>
	);
};

export default TimeSelectHour;
