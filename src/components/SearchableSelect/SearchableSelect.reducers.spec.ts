import assert from 'assert';
import _ from 'lodash';
import { onSelect, onSearch } from './SearchableSelect.reducers';

describe('SearchableSelect reducers', () => {
	describe('onSelect', () => {
		it('should set selectedIndex=[newIndex] and update DropMenu state', () => {
			const initialState: any = {};

			const newIndex = 3;

			const nextState = onSelect(initialState, newIndex);
			const { selectedIndex, DropMenu } = nextState;

			assert(_.isEqual(DropMenu, { isExpanded: false, selectedIndices: [3] }));
			assert(_.isEqual(selectedIndex, newIndex));
		});
	});

	describe('onSearch', () => {
		it('should set searchText=[inputText], selectedIndex=null, and update DropMenu state', () => {
			const initialState: any = {};

			const inputText = 'search';
			const firstVisibleIndex = 41;

			const nextState = onSearch(initialState, inputText, firstVisibleIndex);
			const { searchText, selectedIndex, DropMenu } = nextState;

			assert.equal(searchText, inputText);
			assert.equal(selectedIndex, null);
			assert(_.isEqual(DropMenu, { focusedIndex: firstVisibleIndex }));
		});
	});
});
