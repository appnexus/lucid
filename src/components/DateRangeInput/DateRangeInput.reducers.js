import _ from 'lodash';
import moment from 'moment';
import * as DatePickerReducers from '../DatePicker/DatePicker.reducers';

export const DatePicker = DatePickerReducers;

export const onPrevMonth= (state) => ({
	...state,
	date: moment(state.date).subtract({months: 1}).toISOString(),
	DatePicker: DatePicker.onPrevMonth(state.DatePicker),
});

export const onNextMonth= (state) => ({
	...state,
	date: moment(state.date).add({months: 1}).toISOString(),
	DatePicker: DatePicker.onNextMonth(state.DatePicker),
});

export const onSelectStart = (state, selected) => {
	const selectedDate = _.isEmpty(selected) ? null : moment(selected);
	if (selectedDate.isAfter(state.textValueEnd)) {
		return {
			...state,
			DatePicker: DatePicker.onSelectRange(state.DatePicker, selectedDate, null),
			textValueStart: selectedDate.format('YYYY-MM-DD'),
			textValueEnd: null,
		};
	}

	return {
		...state,
		DatePicker: DatePicker.onSelectRange(state.DatePicker, selectedDate, null),
		textValueStart: selectedDate.format('YYYY-MM-DD'),
	};
};

export const onSelectEnd = (state, selected) => {
	const selectedDate = _.isEmpty(selected) ? null : moment(selected);
	if (selectedDate.isBefore(state.textValueStart)) {
		return {
			...state,
			DatePicker: DatePicker.onSelectRange(state.DatePicker, null, selectedDate),
			textValueStart: selectedDate.format('YYYY-MM-DD'),
			textValueEnd: null,
		};
	}

	return {
		...state,
		DatePicker: DatePicker.onSelectRange(state.DatePicker, null, selectedDate),
		textValueEnd: selectedDate.format('YYYY-MM-DD'),
	};
};

export const onFocusMonth = (state, date) => {
	const focusDate = moment(date);
	const firstMonthDate = moment(state.date).startOf('month');
	const lastMonthDate = moment(firstMonthDate).add({months: state.size - 1}).endOf('month');

	if (focusDate.isBetween(firstMonthDate, lastMonthDate, null, '[]')) {
		return state;
	}

	if (focusDate.isBefore(firstMonthDate)) {
		return {
			...state,
			date: moment(date).toISOString(),
			DatePicker: {
				...state.DatePicker,
				date: moment(date).toISOString(),
			},
		};
	} else {
		const nextFirstMonthDate = moment(date).subtract({months: state.size - 1});
		return {
			...state,
			date: nextFirstMonthDate.toISOString(),
			DatePicker: {
				...state.DatePicker,
				date: nextFirstMonthDate.toISOString(),
			},
		};
	}
};
