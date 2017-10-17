// Reducers spec file only necessary if your new component includes reducers.
import { onX } from './ExampleComponent.reducers';

describe('ExampleComponent reducers', () => {
	const initialState = {
		test: 'this is text',
	};

	describe('onX', () => {
		const nextState = onX(initialState);

		process.stdout('test');
		expect(nextState).toBe(initialState);
	});
});
