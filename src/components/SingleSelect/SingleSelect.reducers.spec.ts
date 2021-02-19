import assert from 'assert';
import _ from 'lodash';
import { onSelect } from './SingleSelect.reducers';

describe('SingleSelect reducers', () => {
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
});
