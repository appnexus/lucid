import assert from 'assert';

import { onSelect, onToggle } from './VerticalListMenu.reducers';

describe('VerticalListMenu reducers', () => {
	describe('onSelect', () => {
		it('should work with existing state', () => {
			const initialState = {
				selectedIndices: [100],
				foo: 'asdf',
			};

			assert.deepEqual(onSelect(initialState, 20), {
				selectedIndices: [20],
				foo: 'asdf',
			});
		});
	});

	describe('onToggle', () => {
		it('should remove items', () => {
			const initialState = {
				expandedIndices: [0, 1, 2, 3, 4],
				bar: 'mert',
			};

			assert.deepEqual(onToggle(initialState, 2), {
				expandedIndices: [0, 1, 3, 4],
				bar: 'mert',
			});
		});

		it('should add items', () => {
			const initialState = {
				expandedIndices: [0, 1, 2, 3, 4],
			};

			assert.deepEqual(onToggle(initialState, 99), {
				expandedIndices: [0, 1, 2, 3, 4, 99],
			});
		});
	});
});
