import { onSwipe, onPrev, onNext } from './DateSelect.reducers';

describe('DateSelect reducers', () => {
	const initialState: any = {
		offset: 0,
	};

	describe('onSwipe', () => {
		it('should update the offset with the relative number of slides swiped', () => {
			const slidesSwiped = -3;
			const nextState = onSwipe(initialState, slidesSwiped);
			expect(nextState.offset).toBe(-3);
		});
	});

	describe('onPrev', () => {
		it('should decrease the offset by one slide', () => {
			const nextState = onPrev(initialState);
			expect(nextState.offset).toBe(-1);
		});
	});

	describe('onNext', () => {
		it('should increase the offset by one slide', () => {
			const nextState = onNext(initialState);
			expect(nextState.offset).toBe(1);
		});
	});
});
