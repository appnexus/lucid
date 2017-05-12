import assert from 'assert';
import { onResize, onToggle } from './Submarine.reducers';

describe('Submarine reducers', () => {
	const initialState = {
		isExpanded: true,
		height: 250,
	};

	describe('onResize', () => {
		it('should set the `height`', () => {
			const nextState = onResize(
				{
					...initialState,
					isExpanded: false,
				},
				256
			);

			assert.equal(nextState.height, 256, 'must update the height');
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
