export const onSwipe = (state, slidesSwiped) => ({
	...state,
	index: state.index + slidesSwiped,
});

export const onPrev = (state) => ({
	...state,
	index: state.index - 1,
});

export const onNext = (state) => ({
	...state,
	index: state.index + 1,
});
