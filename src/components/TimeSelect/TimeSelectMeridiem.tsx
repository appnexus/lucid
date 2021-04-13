import React, { useCallback } from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import SingleSelect from '../SingleSelect/SingleSelect';
import { MeridiemType } from './TimeSelect';

const cx = lucidClassNames.bind('&-TimeSelect');
const { Option } = SingleSelect;

interface ITimeSelectMeridiem {
	hour: number;
	meridiem: MeridiemType;
	time: Date;
	isDisabled?: boolean;
	onChange(time: Date): void;
}

const TimeSelectMeridiem = ({
	hour,
	meridiem,
	time,
	isDisabled,
	onChange,
}: ITimeSelectMeridiem) => {
	const onMeridiemChange = useCallback(
		(selectedIndex) => {
			const nextMeridiem =
				selectedIndex === 0 ? MeridiemType.AM : MeridiemType.PM;
			if (meridiem === nextMeridiem) {
				return;
			}
			const updatedTime = new Date(time);
			if (nextMeridiem === MeridiemType.AM) {
				updatedTime.setHours(hour === 12 ? 0 : hour);
			} else {
				updatedTime.setHours(hour === 12 ? hour : hour + 12);
			}
			onChange(updatedTime);
		},
		[time, hour]
	);
	return (
		<SingleSelect
			className={cx('&-meridiem')}
			isSelectionHighlighted={false}
			showIcon={false}
			selectedIndex={MeridiemType.AM === meridiem ? 0 : 1}
			isInvisible
			onSelect={onMeridiemChange}
			isDisabled={isDisabled}
			hasReset={false}
		>
			<Option>{MeridiemType.AM}</Option>
			<Option>{MeridiemType.PM}</Option>
		</SingleSelect>
	);
};

export default TimeSelectMeridiem;
