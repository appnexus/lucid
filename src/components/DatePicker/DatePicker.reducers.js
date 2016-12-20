import moment from 'moment';

export const onPrevMonth= (state) => ({
	...state,
	date: moment(state.date).subtract(1, 'month').toISOString(),
});

export const onNextMonth= (state) => ({
	...state,
	date: moment(state.date).add(1, 'month').toISOString(),
});

export const onSelect = (state, selectedDate) => ({
	...state,
	selectedDate: selectedDate.toISOString(),
});

export const onReset = (state) => ({
	...state,
	selectedDate: null,
});
