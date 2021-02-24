import assert from 'assert';
import _ from 'lodash';
import {
	onExpand,
	onCollapse,
	onSelect,
	onFocusNext,
	onFocusPrev,
	onFocusOption,
} from './DropMenu.reducers';

describe('DropMenu reducers', () => {
	describe('onExpand', () => {
		it('should set isExpanded=true, focusedIndex=null if selectedIndices is empty', () => {
			const initialState: any = {
				selectedIndices: [],
			};

			const nextState = onExpand(initialState);
			const { selectedIndices, isExpanded, focusedIndex } = nextState;

			assert(_.isEqual(selectedIndices, initialState.selectedIndices));
			assert.equal(isExpanded, true);
			assert.equal(focusedIndex, null);
		});

		it('should set isExpanded=true, focusedIndex={last selectedIndices}', () => {
			const initialState: any = {
				selectedIndices: [3, 2],
			};

			const nextState = onExpand(initialState);
			const { selectedIndices, isExpanded, focusedIndex } = nextState;

			assert(_.isEqual(selectedIndices, initialState.selectedIndices));
			assert.equal(isExpanded, true);
			assert.equal(focusedIndex, 2);
		});
	});

	describe('onCollapse', () => {
		it('should set isExpanded=false', () => {
			const initialState: any = {};

			const nextState = onCollapse(initialState);
			const { isExpanded } = nextState;

			assert.equal(isExpanded, false);
		});
	});

	describe('onSelect', () => {
		it('should set isExpanded=false, selectedIndices=[optionIndex]', () => {
			const initialState: any = {};

			const optionIndex = 3;

			const nextState = onSelect(initialState, optionIndex);
			const { isExpanded, selectedIndices } = nextState;

			assert.equal(isExpanded, false);
			assert(_.isEqual(selectedIndices, [3]));
		});
	});

	describe('onFocusNext', () => {
		it('should set focusedIndex=0 if focusedIndex=null', () => {
			const initialState: any = {
				focusedIndex: null,
			};

			const nextState = onFocusNext(initialState);
			const { focusedIndex } = nextState;

			assert.equal(focusedIndex, 0);
		});

		it('should set focusedIndex+=1 if focusedIndex={number}', () => {
			const initialState: any = {
				focusedIndex: 2,
			};

			const nextState = onFocusNext(initialState);
			const { focusedIndex } = nextState;

			assert.equal(focusedIndex, 3);
		});
	});

	describe('onFocusPrev', () => {
		it('should set focusedIndex=null if focusedIndex=null', () => {
			const initialState: any = {
				focusedIndex: null,
			};

			const nextState = onFocusPrev(initialState);
			const { focusedIndex } = nextState;

			assert.equal(focusedIndex, null);
		});

		it('should set focusedIndex=null if focusedIndex=0', () => {
			const initialState: any = {
				focusedIndex: 0,
			};

			const nextState = onFocusPrev(initialState);
			const { focusedIndex } = nextState;

			assert.equal(focusedIndex, null);
		});

		it('should set focusedIndex-=1 if focusedIndex={number}', () => {
			const initialState: any = {
				focusedIndex: 2,
			};

			const nextState = onFocusPrev(initialState);
			const { focusedIndex } = nextState;

			assert.equal(focusedIndex, 1);
		});
	});

	describe('onFocusOption', () => {
		it('should set focusedIndex=optionIndex', () => {
			const initialState: any = {};

			const optionIndex = 3;

			const nextState = onFocusOption(initialState, optionIndex);
			const { focusedIndex } = nextState;

			assert.equal(focusedIndex, 3);
		});
	});
});
