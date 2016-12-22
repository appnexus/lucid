import _ from 'lodash';
import moment from 'moment';

export const onPrevMonth= (state) => ({
	...state,
	date: moment(state.date).subtract(1, 'month').toISOString(),
});

export const onNextMonth= (state) => ({
	...state,
	date: moment(state.date).add(1, 'month').toISOString(),
});

export const onSelect = (state, selected) => ({
	...state,
	selected: selected.toISOString(),
	selectedStart: null,
	selectedEnd: null,
});

export const onReset = (state) => ({
	...state,
	selected: null,
	selectedStart: null,
	selectedEnd: null,
});

export const onSelectRange = (state, selectedStart, selectedEnd) => ({
	...state,
	selected: null,
	selectedStart: _.isEmpty(selectedStart) ? null : moment(selectedStart).toISOString(),
	selectedEnd: _.isEmpty(selectedEnd) ? null : moment(selectedEnd).toISOString(),
});
