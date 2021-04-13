import React from 'react';
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
			const element = <div />;
			assert.equal(getCombinedChildText(element.props), '');
		});

		it("should return the node's `children` if it is a string", () => {
			const element = <div>child</div>;
			assert.equal(getCombinedChildText(element.props), 'child');
		});

		it('should recursively combine strings from children, ignoring other types', () => {
			const element = (
				<div>
					1
					<div>
						<div>2</div>
						<>
							<div>{'3'}</div>
						</>
						<></>
						<div></div>
						<div>{null}</div>
						<div>{true}</div>
						<div>{4}</div>
						{/* this value should be ignored since it is a number, not a string */}
					</div>
				</div>
			);
			assert.equal(getCombinedChildText(element.props), '123');
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
