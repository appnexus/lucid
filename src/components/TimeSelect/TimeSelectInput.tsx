import _ from 'lodash';
import React, { useCallback } from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const cx = lucidClassNames.bind('&-TimeSelect');

export interface ITimeSelectInput {
	value: number;
	step?: number;
	name: string;
	disabled?: boolean;
	className?: string;
	onChange(value: number): void;
}

const TimeSelectInput = ({
	className,
	value,
	step,
	name,
	disabled,
	onChange,
}: ITimeSelectInput) => {
	const cleanedValue =
		value !== null ? _.toString(value).padStart(2, '0') : '00';

	const cleanOnChange = useCallback(
		(event: any) => onChange(_.get(event, 'target.value', 0)),
		[onChange]
	);

	const isDisabledClass = disabled ? '&-time-disabled' : '';
	return (
		<input
			className={cx('&-time', className, isDisabledClass)}
			key='input'
			aria-label={name}
			autoComplete='off'
			data-input='true'
			disabled={disabled}
			max={60}
			min={-15}
			name={name}
			onChange={cleanOnChange}
			step={step}
			type='number'
			value={cleanedValue}
		/>
	);
};

TimeSelectInput.defaultProps = {
	step: 1,
};

export default TimeSelectInput;
