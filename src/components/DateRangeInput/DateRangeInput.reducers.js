import * as DatePickerReducers from '../DatePicker/DatePicker.reducers';

export const DatePicker = DatePickerReducers;

export const onSelectStart = (state, selectedDate) => ({
	...state,
	DatePicker: DatePicker.onSelect(state.DatePicker, selectedDate),
	textValueStart: selectedDate.format('YYYY-MM-DD'),
});

export const onSelectEnd = (state, selectedDate) => ({
	...state,
	DatePicker: DatePicker.onSelect(state.DatePicker, selectedDate),
	textValueEnd: selectedDate.format('YYYY-MM-DD'),
});

