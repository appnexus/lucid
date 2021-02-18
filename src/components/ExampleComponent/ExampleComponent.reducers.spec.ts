// Reducers spec file only necessary if your new component includes reducers.
import { onX } from './ExampleComponent.reducers';

describe('ExampleComponent reducers', () => {
	const initialState = {
		test: 'this is text',
	};

	describe('onX', () => {
		it('should show the example state', () => {
			const nextState = onX(initialState);

			expect(nextState.test).toBe('this is text');
		});
	});
});
