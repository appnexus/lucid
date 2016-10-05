import assert from 'assert';
import _ from 'lodash';

import {
	partitionText,
} from './text-manipulation';

describe('#partitionText', () => {
	const pattern = new RegExp('pattern', 'i');

	it('should return the passed in text as `post` if it does not match the pattern', () => {
		assert(_.isEqual(partitionText('text', pattern, 4), ['', '', 'text']));
	});

	it('should return the matched text as `match`, and the remaining text as `post`, if there is a match at the beginning of the string', () => {
		assert(_.isEqual(partitionText('patternpost', pattern, 7), ['', 'pattern', 'post']));
	});

	it('should return the prefix text as `pre`, the matched text as `match`, and the remaining text as `post`, if there is a match mid-string', () => {
		assert(_.isEqual(partitionText('prepatternpost', pattern, 7), ['pre', 'pattern', 'post']));
	});
});
