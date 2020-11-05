import React, { useMemo } from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import ClockIcon from '../Icon/ClockIcon/ClockIcon';
import TimeSelectHour from './TimeSelectHour';
import TimeSelectMeridiem from './TimeSelectMeridiem';
import TimeSelectMinute from './TimeSelectMinute';

const cx = lucidClassNames.bind('&-TimeSelect');

export interface ITimeSelect {
	time: Date;
	is24HourClock?: boolean;
	onChange(time: Date): void;
	isDisabled?: boolean;
}

enum MeridiemType {
	AM = 'AM',
	PM = 'PM',
}

const TimeSelect = ({
	time,
	is24HourClock,
	onChange,
	isDisabled,
}: ITimeSelect) => {
	const minute = useMemo(() => time.getMinutes(), [time]);
	const { hour, meridiem = MeridiemType.AM } = useMemo(() => {
		const hour = time.getHours();
		if (is24HourClock) {
			return { hour };
		}
		const cleanedHour =
			hour === 0 || hour === 12 ? 12 : hour < 12 ? hour : hour - 12;
		const cleanedMeridiem = hour < 12 ? MeridiemType.AM : MeridiemType.PM;
		return { hour: cleanedHour, meridiem: cleanedMeridiem };
	}, [time, is24HourClock]);

	const isAM = useMemo(() => meridiem === MeridiemType.AM, [meridiem]);

	return (
		<div className={cx('&')} id='TimeSelect'>
			<TimeSelectHour
				hour={hour}
				time={time}
				is24HourClock={is24HourClock}
				isAM={isAM}
				isDisabled={isDisabled}
				onChange={onChange}
			/>
			<span>:</span>
			<TimeSelectMinute
				minute={minute}
				time={time}
				isDisabled={isDisabled}
				onChange={onChange}
			/>
			{!is24HourClock && (
				<TimeSelectMeridiem
					hour={hour}
					meridiem={meridiem}
					isAM={isAM}
					time={time}
					isDisabled={isDisabled}
					onChange={onChange}
				/>
			)}
			<ClockIcon disabled={isDisabled} />
		</div>
	);
};

TimeSelect.peek = {
	notes: {
		overview: `
			A time selector that is tab-able. Hour/Minute/Meridiem are tied together. As a user scrolls
			up or down, the hours or minutes and meridiem will corresponding scroll.
		`,
		technicalRecommendations: `
			User must provide value. This component will process and return the next values.
			For use as a pluggable pure functional component.
		`,
		intendedUse: `
			Help users select a time with less risk of typing incorrect data.
		`,
	},
	categories: ['controls', 'selectors'],
};

TimeSelect.defaultProps = {
	time: new Date(),
};

export default TimeSelect;

export { MeridiemType };
