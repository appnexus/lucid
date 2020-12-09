/* eslint-disable comma-spacing */

import assert from 'assert';
import _ from 'lodash';
import { onChange, onSelect, onExpand } from './Autocomplete.reducers';

describe('Autocomplete reducers', () => {
	describe('onChange', () => {
		it('should set DropMenu.focusedIndex=null and value to arg', () => {
			const initialState = {
				value: '',
				DropMenu: {
					focusedIndex: 2,
				},
			};

			const nextState = onChange(initialState, 'foo');
			const {
				value,
				DropMenu: { focusedIndex },
			} = nextState;

			assert.equal(value, 'foo');
			assert.equal(focusedIndex, null);
		});
	});

	describe('onSelect', () => {
		it('should set DropMenu.selectedIndices=[] and value to suggestion at given index arg', () => {
			const initialState = {
				suggestions: ['Portland', 'portal', 'porridge', 'potent', 'please'],
				value: '',
				DropMenu: {
					selectedIndices: [3, 2],
				},
			};

			const nextState = onSelect(initialState, 2);
			const {
				value,
				DropMenu: { selectedIndices },
			} = nextState;

			assert.equal(value, 'porridge');
			assert(_.isEqual(selectedIndices, []));
		});
	});

	describe('onExpand', () => {
		it('should set DropMenu.focusedIndex=null and DropMenu.isExpanded=true if `suggestions` and `value` are not empty', () => {
			const initialState = {
				value: 'foo',
				suggestions: ['foo', 'bar'],
				DropMenu: {
					focusedIndex: 2,
				},
			};

			const nextState = onExpand(initialState);
			const {
				DropMenu: { focusedIndex, isExpanded },
			} = nextState;

			assert.equal(isExpanded, true);
			assert.equal(focusedIndex, null);
		});

		it('should set DropMenu.focusedIndex=null and DropMenu.isExpanded=false if `suggestions` is empty', () => {
			const initialState = {
				value: 'foo',
				suggestions: [],
				DropMenu: {
					focusedIndex: 2,
				},
			};

			const nextState = onExpand(initialState);
			const {
				DropMenu: { focusedIndex, isExpanded },
			} = nextState;

			assert.equal(isExpanded, false);
			assert.equal(focusedIndex, null);
		});

		it('should set DropMenu.focusedIndex=null and DropMenu.isExpanded=false if `value` is empty', () => {
			const initialState = {
				value: '',
				suggestions: ['foo', 'bar'],
				DropMenu: {
					focusedIndex: 2,
				},
			};

			const nextState = onExpand(initialState);
			const {
				DropMenu: { focusedIndex, isExpanded },
			} = nextState;

			assert.equal(isExpanded, false);
			assert.equal(focusedIndex, null);
		});
	});
});
