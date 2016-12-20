import moment from 'moment';
import * as DatePickerReducers from '../DatePicker/DatePicker.reducers';

export const DatePicker = DatePickerReducers;

export const onSelectStart = (state, selectedDate) => {
	if (selectedDate.isAfter(state.textValueEnd)) {
		return {
			...state,
			DatePicker: DatePicker.onSelect(DatePicker.onReset(state.DatePicker), selectedDate),
			textValueStart: selectedDate.format('YYYY-MM-DD'),
			textValueEnd: null,
		};
	}

	return {
		...state,
		DatePicker: DatePicker.onSelect(state.DatePicker, selectedDate),
		textValueStart: selectedDate.format('YYYY-MM-DD'),
	};
};

export const onSelectEnd = (state, selectedDate) => {
	if (selectedDate.isBefore(state.textValueStart)) {
		return {
			...state,
			DatePicker: DatePicker.onSelect(DatePicker.onReset(state.DatePicker), selectedDate),
			textValueStart: selectedDate.format('YYYY-MM-DD'),
			textValueEnd: null,
		};
	}

	return {
		...state,
		DatePicker: DatePicker.onSelect(state.DatePicker, selectedDate),
		textValueEnd: selectedDate.format('YYYY-MM-DD'),
	};
};

export const onFocusMonth = (state, date) => {
	return {
		...state,
		date: moment(date).toISOString(),
		DatePicker: {
			...state.DatePicker,
			date: moment(date).toISOString(),
		},
	};
};
