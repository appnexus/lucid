import assert from 'assert';

import { onMouseOver, onMouseOut } from './PieChart.reducers';

describe('PieChart reducers', () => {
	describe('onMouseOver', () => {
		it('should should set isHovering and hoveringIndex', () => {
			const initialState: any = {
				foo: 1,
			};

			assert.deepEqual(onMouseOver(initialState, 20), {
				foo: 1,
				isHovering: true,
				hoveringIndex: 20,
			});
		});
	});

	describe('onMouseOut', () => {
		it('should set isHovering to false', () => {
			const initialState: any = {
				isHovering: true,
			};

			assert.deepEqual(onMouseOut(initialState), {
				isHovering: false,
			});
		});
	});
});
