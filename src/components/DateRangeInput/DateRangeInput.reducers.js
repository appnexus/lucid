import moment from 'moment';
import * as DatePickerReducers from '../DatePicker/DatePicker.reducers';

export const DatePicker = DatePickerReducers;

export const onSelectStart = (state, selectedDate) => {
	const date = moment(selectedDate);
	if (date.isAfter(state.textValueEnd)) {
		return {
			...state,
			DatePicker: DatePicker.onSelect(DatePicker.onReset(state.DatePicker), date),
			textValueStart: date.format('YYYY-MM-DD'),
			textValueEnd: null,
		};
	}

	return {
		...state,
		DatePicker: DatePicker.onSelect(state.DatePicker, date),
		textValueStart: date.format('YYYY-MM-DD'),
	};
};

export const onSelectEnd = (state, selectedDate) => {
	const date = moment(selectedDate);
	if (date.isBefore(state.textValueStart)) {
		return {
			...state,
			DatePicker: DatePicker.onSelect(DatePicker.onReset(state.DatePicker), date),
			textValueStart: date.format('YYYY-MM-DD'),
			textValueEnd: null,
		};
	}

	return {
		...state,
		DatePicker: DatePicker.onSelect(state.DatePicker, date),
		textValueEnd: date.format('YYYY-MM-DD'),
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
