import {
	onSelect,
	onSearch,
	onRemoveAll,
} from './SearchableMultiSelect.reducers';

describe('SearchableMultiSelect reducers', () => {
	describe('onSelect', () => {
		it('should add an index', () => {
			const state: any = { selectedIndices: [2, 3] };
			const expected = { selectedIndices: [2, 3, 1] };
			expect(onSelect(state, 1)).toEqual(expected);
		});

		it('should remove an index', () => {
			const state: any = { selectedIndices: [1, 2, 3] };
			const expected = { selectedIndices: [1, 2] };
			expect(onSelect(state, 3)).toEqual(expected);
		});
	});

	describe('onSearch', () => {
		it('should correctly set state', () => {
			const expected = {
				searchText: 'wat',
				DropMenu: {
					focusedIndex: 0,
				},
			};

			expect(onSearch({} as any, 'wat', 0)).toEqual(expected);
		});
	});

	describe('onRemoveAll', () => {
		const state: any = {
			selectedIndices: [1, 2, 3, 4],
		};
		const expected = {
			selectedIndices: [],
		};

		expect(onRemoveAll(state)).toEqual(expected);
	});
});
