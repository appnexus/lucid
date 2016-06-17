import assert from 'assert';
import * as reducers from './Accordion.reducers.js';

describe('Accordion reducers', () => {
	it('onSelect should set selectedIndex properly', () => {
		const initialState = { foo: 1 };

		assert.deepEqual(reducers.onSelect(initialState, 99), {
			foo: 1,
			selectedIndex: 99,
		});
	});
});
