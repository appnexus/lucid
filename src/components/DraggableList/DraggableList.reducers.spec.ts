import assert from 'assert';
import { onDragStart, onDragEnd, onDragOver } from './DraggableList.reducers';

describe('DraggableList reducers', () => {
	describe('onDragStart', () => {
		it('should set the dragIndex`', () => {
			const nextState = onDragStart({}, 2);

			assert.equal(nextState.dragIndex, 2, 'must update the dragIndex');
		});
	});

	describe('onDragOver', () => {
		it('should set the dragOverIndex`', () => {
			const nextState: {
				dragIndex?: number;
				dragOverIndex?: number;
			} = onDragOver({ dragIndex: 0 }, 3);

			assert.equal(nextState.dragIndex, 0, 'must update the dragIndex');
			assert.equal(nextState.dragOverIndex, 3, 'must update the dragOverIndex');
		});
	});

	describe('onDragEnd', () => {
		it('should set the dragOverIndex`', () => {
			const nextState = onDragEnd({ dragIndex: 0, dragOverIndex: 2 });

			assert.equal(nextState.dragIndex, undefined, 'must clear the dragIndex');
			assert.equal(
				nextState.dragOverIndex,
				undefined,
				'must clear the dragOverIndex'
			);
		});
	});
});
