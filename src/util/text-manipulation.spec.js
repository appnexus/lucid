import assert from 'assert';
import _ from 'lodash';

import {
	partitionText,
	getCombinedChildText,
	propsSearch,
} from './text-manipulation';

describe('text-manipulation', () => {
	describe('#partitionText', () => {
		const pattern = new RegExp('pattern', 'i');

		it('should return the passed in text as `post` if it does not match the pattern', () => {
			assert(_.isEqual(partitionText('text', pattern, 4), ['', '', 'text']));
		});

		it('should return the matched text as `match`, and the remaining text as `post`, if there is a match at the beginning of the string', () => {
			assert(
				_.isEqual(partitionText('patternpost', pattern, 7), [
					'',
					'pattern',
					'post',
				])
			);
		});

		it('should return the prefix text as `pre`, the matched text as `match`, and the remaining text as `post`, if there is a match mid-string', () => {
			assert(
				_.isEqual(partitionText('prepatternpost', pattern, 7), [
					'pre',
					'pattern',
					'post',
				])
			);
		});
	});

	describe('#getCombinedChildText', () => {
		it("should return '' if the passed in node has no children", () => {
			assert.equal(getCombinedChildText({}), '');
		});

		it("should return the node's `children` if it is a string", () => {
			const children = 'child';
			assert.equal(getCombinedChildText({ children }), 'child');
		});

		it('should recursively combine children', () => {
			const node = {
				children: [
					{ props: { children: '1' } },
					{
						props: {
							children: [
								{ props: { children: '2' } },
								{ props: { children: '3' } },
							],
						},
					},
				],
			};
			assert.equal(getCombinedChildText(node), '123');
		});
	});

	describe('#propsSearch', () => {
		it('should return true if the searchText is undefined', () => {
			assert(propsSearch());
		});

		it('should return true if the searchText is null', () => {
			assert(propsSearch(null));
		});

		it('should return true if the searchText is empty string', () => {
			assert(propsSearch(''));
		});

		it("should return true if the searchText matches the option's text", () => {
			assert(propsSearch('search', { children: 'search' }));
		});

		it("should return false if the searchText does not match the option's text", () => {
			assert(!propsSearch('search', { children: 'miss' }));
		});
	});
});
