import assert from 'assert';
import * as SingleSelect from '../SingleSelect/SingleSelect.reducers';
import { onPageSelect, onPageSizeSelect } from './Paginator.reducers';

jest.mock('../SingleSelect/SingleSelect.reducers');

describe('Paginator reducers', () => {
	const initialState: any = {
		selectedPageIndex: 1,
		selectedPageSizeIndex: 0,
		SingleSelect: {},
	};
	const totalPages = 5;

	describe('onPageSelect', () => {
		it('should set the selectedPageIndex to the payload', () => {
			const pageIndex = 2;
			const nextState = onPageSelect(initialState, pageIndex, totalPages);
			assert.equal(
				nextState.selectedPageIndex,
				pageIndex,
				`must be ${pageIndex}`
			);
		});

		it('should set the selectedPageIndex to 0 if payload < 0', () => {
			const pageIndex = -1;
			const nextState = onPageSelect(initialState, pageIndex, totalPages);
			assert.equal(nextState.selectedPageIndex, 0, 'must be 0');
		});

		it('should not exceed totalPages', () => {
			const pageIndex = 5;
			const nextState = onPageSelect(initialState, pageIndex, totalPages);
			assert.equal(nextState.selectedPageIndex, 4, 'must be 4');
		});
	});

	describe('onPageSizeSelect', () => {
		beforeEach(() => (SingleSelect.onSelect as any).mockClear());

		it('should set the selectedPageIndex to 0', () => {
			const pageIndex = 2;
			const nextState = onPageSizeSelect(initialState, pageIndex);
			assert.equal(nextState.selectedPageIndex, 0, 'must be 0');
		});

		it('should call SingleSelect.onSelect with state.SingleSelect and selectedPageSizeIndex', () => {
			const pageIndex = 2;
			onPageSizeSelect(initialState, pageIndex);
			expect(SingleSelect.onSelect).toHaveBeenCalledWith(
				initialState.SingleSelect,
				pageIndex
			);
		});

		it('should set state.SingleSelect to the return value of SingleSelect.onSelect', () => {
			const mockValue = {};
			const pageIndex = 2;
			(SingleSelect as any).onSelect = () => mockValue; // eslint-disable-line no-import-assign
			const nextState = onPageSizeSelect(initialState, pageIndex);
			assert.strictEqual(
				nextState.SingleSelect,
				mockValue,
				'must be `mockValue`'
			);
		});
	});
});
