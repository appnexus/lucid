import assert from 'assert';

import * as reducers from './IconGroup.reducers';

describe('IconGroup reducers', () => {
	describe('default onSelect with checkbox', () => {
		it('should add selectedIndex prop', () => {
			const initialStateToAdd = { selectedIndices: [[2], []] };
			const index = 1;
			const iconBoxProps = {
				props: {
					kind: 'checkbox',
				},
			};

			assert.deepEqual(
				reducers.default.onSelect(initialStateToAdd, index, iconBoxProps),
				{
					selectedIndices: [[2, 1], []],
				}
			);
		});

		it('should remove selectedIndex prop', () => {
			const initialStateToAdd = { selectedIndices: [[2, 1], []] };
			const index = 1;
			const iconBoxProps = {
				props: {
					kind: 'checkbox',
				},
			};

			assert.deepEqual(
				reducers.default.onSelect(initialStateToAdd, index, iconBoxProps),
				{
					selectedIndices: [[2], []],
				}
			);
		});
	});

	describe('onSelect where `kind=radio`', () => {
		it('should replace selectedIndex prop', () => {
			const initialState = { selectedIndices: [[2], []] };
			const index = 1;
			const iconBoxProps = {
				props: {
					kind: 'radio',
				},
			};

			assert.deepEqual(
				reducers.default.onSelect(initialState, index, iconBoxProps),
				{
					selectedIndices: [[1], []],
				}
			);
		});
	});

	describe('onSelect where `hasIndeterminate=true`', () => {
		it('should update selectedIndex and indeterminateIndex', () => {
			const initialState = { selectedIndices: [[2, 1], []] };
			const index = 1;
			const iconBoxProps = {
				props: {
					kind: 'checkbox',
					hasIndeterminate: true,
				},
			};

			assert.deepEqual(
				reducers.default.onSelect(initialState, index, iconBoxProps),
				{
					selectedIndices: [[2, 1], [1]],
				}
			);
		});

		it('should remove index from selectedIndex and indeterminateIndex', () => {
			const initialState = { selectedIndices: [[2, 1], [1]] };
			const index = 1;
			const iconBoxProps = {
				props: {
					kind: 'checkbox',
					hasIndeterminate: true,
				},
			};

			assert.deepEqual(
				reducers.default.onSelect(initialState, index, iconBoxProps),
				{
					selectedIndices: [[2], []],
				}
			);
		});

		it('should add only to selectedIndex when in neither', () => {
			const initialState = { selectedIndices: [[2], []] };
			const index = 1;
			const iconBoxProps = {
				props: {
					kind: 'checkbox',
					hasIndeterminate: true,
				},
			};

			assert.deepEqual(
				reducers.default.onSelect(initialState, index, iconBoxProps),
				{
					selectedIndices: [[2, 1], []],
				}
			);
		});
	});
});
