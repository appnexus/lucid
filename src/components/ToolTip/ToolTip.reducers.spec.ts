import assert from 'assert';
import { onMouseOver, onMouseOut } from './ToolTip.reducers';

describe('ToolTip reducers', () => {
	describe('onMouseOver', () => {
		it('should set `isExpanded` to `true`', () => {
			const initialState: any = { isExpanded: false };
			const nextState = onMouseOver(initialState);
			assert(nextState.isExpanded, 'isExpanded must be true');
		});
	});

	describe('onMouseOut', () => {
		it('should set `isExpanded` to `false`', () => {
			const initialState: any = { isExpanded: true };
			const nextState = onMouseOut(initialState);
			assert(!nextState.isExpanded, 'isExpanded must be false');
		});
	});
});
