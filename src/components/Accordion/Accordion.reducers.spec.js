import assert from 'assert';
import * as reducers from './Accordion.reducers.js';

describe('Accordion reducers', () => {
	it('onChange should set selectedIndex properly', () => {
		const initialState = { foo: 1 };

		assert.deepEqual(reducers.onChange(initialState, 99), {
			foo: 1,
			selectedIndex: 99,
		});
	});
});
