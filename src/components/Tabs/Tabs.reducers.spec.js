import assert from 'assert';
import reducers from './Tabs.reducers.js';

describe('Tabs reducers', () => {
	it('onSelect should set selectedIndex properly', () => {
		const initialState = { foo: 1 };

		assert.deepEqual(reducers.onSelect(initialState, 99), {
			foo: 1,
			selectedIndex: 99
		});
	});

	it('onSelect should not set selectedIndex when isDisabled', () => {
		const initialState = {
			selectedIndex: 5
		};

		const props = {
			isDisabled: true
		};

		assert.notDeepEqual(reducers.onSelect(initialState, 99, props), {
			foo: 1,
			selectedIndex: 5
		});
	});
});
