import assert from 'assert';
import { onResize, onToggle } from './Sidebar.reducers';

describe('Sidebar reducers', () => {
	const initialState = {
		isExpanded: true,
		width: 250,
	};

	describe('onResize', () => {
		it('should set the `width`', () => {
			const nextState = onResize(
				{
					...initialState,
					isExpanded: false,
				},
				256
			);

			assert.equal(nextState.width, 256, 'must update the width');
			assert.equal(
				nextState.isExpanded,
				true,
				'must update isExpanded to true'
			);
		});
	});

	describe('onToggle', () => {
		it('should set `isExpanded` to the opposite', () => {
			const nextState = onToggle(initialState);

			assert.equal(nextState.isExpanded, false, 'must update `isExpanded`');
		});
	});
});
