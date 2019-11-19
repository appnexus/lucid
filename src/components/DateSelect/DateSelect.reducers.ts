import { IDateSelectState } from './DateSelect';

export const onSwipe = (
	state: IDateSelectState,
	slidesSwiped: number
): IDateSelectState => ({
	...state,
	offset: state.offset + slidesSwiped,
});

export const onPrev = (state: IDateSelectState): IDateSelectState => ({
	...state,
	offset: state.offset - 1,
});

export const onNext = (state: IDateSelectState): IDateSelectState => ({
	...state,
	offset: state.offset + 1,
});
