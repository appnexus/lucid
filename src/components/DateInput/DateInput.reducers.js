import * as DatePickerReducers from '../DatePicker/DatePicker.reducers';

export const DatePicker = DatePickerReducers;

export const onSelect = (state, selectedDate) => ({
	...state,
	DatePicker: DatePicker.onSelect(state.DatePicker, selectedDate),
	textValue: selectedDate.format('YYYY-MM-DD'),
});
