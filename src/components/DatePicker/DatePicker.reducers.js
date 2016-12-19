import moment from 'moment';

export const onPrevMonth= (state) => {
	return {
		...state,
		date: moment(state.date).subtract(1, 'month').toISOString(),
	};
};

export const onNextMonth= (state) => {
	return {
		...state,
		date: moment(state.date).add(1, 'month').toISOString(),
	};
};
