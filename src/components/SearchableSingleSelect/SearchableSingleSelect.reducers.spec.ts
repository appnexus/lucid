import { onSelect, onSearch } from './SearchableSingleSelect.reducers';

describe('SearchableSingleSelect reducers', () => {
	describe('onSelect', () => {
		it('should set an index', () => {
			const state: any = { selectedIndex: null };
			const expected = { selectedIndex: 1 };
			expect(onSelect(state, 1)).toEqual(expected);
		});

		it('should remove an index', () => {
			const state: any = { selectedIndex: 1 };
			const expected = { selectedIndex: null };
			expect(onSelect(state, null)).toEqual(expected);
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
});
