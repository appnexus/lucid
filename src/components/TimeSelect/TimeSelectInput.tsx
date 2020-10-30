import React, { useCallback } from 'react';
import _ from 'lodash';

export interface ITimeSelectInput {
	value: number;
	step?: number;
	name: string;
	disabled?: boolean;
	showLeadingZeros?: boolean;
	onChange(value: number): void;
}

const TimeSelectInput = ({
	showLeadingZeros,
	value,
	step,
	name,
	disabled,
	onChange,
}: ITimeSelectInput) => {
	const cleanedValue =
		showLeadingZeros && value !== null && value < 10 ? `0${value}` : value;

	const cleanOnChange = useCallback(
		(event: any) => onChange(_.get(event, 'target.value', 0)),
		[onChange]
	);
	return (
		<input
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
