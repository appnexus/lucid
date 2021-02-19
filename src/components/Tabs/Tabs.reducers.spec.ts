import assert from 'assert';
import * as reducers from './Tabs.reducers';

describe('Tabs reducers', () => {
	it('onSelect should set selectedIndex properly', () => {
		const initialState: any = { foo: 1 };

		assert.deepEqual(reducers.onSelect(initialState, 99), {
			foo: 1,
			selectedIndex: 99,
		});
	});
});
