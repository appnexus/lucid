import _ from 'lodash';
import selectors from './Paginator.selectors';
import assert from 'assert';

const { totalPages } = selectors;

describe('Paginator selectors', () => {
	describe('totalPages', () => {
		describe('totalPages prop supplied', () => {
			it('should return `totalPages` prop', () => {
				const state = {
					pageSizeOptions: [10],
					selectedPageSizeIndex: 0,
					totalCount: 100,
					totalPages: 2,
				};
				assert.equal(totalPages(state), 2, 'must be 2');
			});
		});
		describe('no totalPages prop', () => {
			_.forEach(
				[
					{
						state: {
							pageSizeOptions: [10],
							selectedPageSizeIndex: 0,
							totalCount: 100,
						},
						expectedTotalPages: 10,
					},
					{
						state: {
							pageSizeOptions: [10, 20],
							selectedPageSizeIndex: 1,
							totalCount: 100,
						},
						expectedTotalPages: 5,
					},
					{
						state: {
							pageSizeOptions: [100],
							selectedPageSizeIndex: 0,
							totalCount: 10,
						},
						expectedTotalPages: 1,
					},
					{
						state: {
							pageSizeOptions: [100],
							selectedPageSizeIndex: 0,
							totalCount: 101,
						},
						expectedTotalPages: 2,
					},
				],
				({ state, expectedTotalPages }: any) => {
					it('should calculate the totalPages', () => {
						assert.equal(
							totalPages(state),
							expectedTotalPages,
							`must be ${expectedTotalPages}`
						);
					});
				}
			);
		});
	});
});
