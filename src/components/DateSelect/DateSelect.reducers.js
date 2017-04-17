export const onSwipe = (state, slidesSwiped) => ({
	...state,
	offset: state.offset + slidesSwiped,
});

export const onPrev = state => ({
	...state,
	offset: state.offset - 1,
});

export const onNext = state => ({
	...state,
	offset: state.offset + 1,
});
