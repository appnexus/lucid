import assert from 'assert';
import { onMouseOver, onMouseOut } from './ToolTip.reducers.js';

describe('ToolTip reducers', () => {
	describe('onMouseOver', () => {
		it('should set `isExpanded` to `true`', () => {
			const initialState = { isExpanded: false };
			const nextState = onMouseOver(initialState);
			assert(nextState.isExpanded, 'isExpanded must be true');
		});
	});

	describe('onMouseOut', () => {
		it('should set `isExpanded` to `false`', () => {
			const initialState = { isExpanded: true };
			const nextState = onMouseOut(initialState);
			assert(!nextState.isExpanded, 'isExpanded must be false');
		});
	});
});
