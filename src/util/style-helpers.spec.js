import assert from 'assert';
import { bindClassNames } from './style-helpers';

describe('#bindClassNames', function() {
	it('should throw an error for bad component names', function() {
		assert.throws(function() { bindClassNames('what-up-bro') });
		assert.throws(function() { bindClassNames('yolo') });
		assert.throws(function() { bindClassNames('not_good') });
	});

	it('should accept the same arguments as classnames', function() {
		let bound = bindClassNames('Foo');

		assert.equal(bound({yolo: true, bar: false}), 'bert-Foo-yolo');
		assert.equal(bound('one', ['two']), 'bert-Foo-one bert-Foo-two');
	});

	it('should handle the special case for ~', function() {
		let bound = bindClassNames('Bar');

		assert.equal(bound('~', 'one'), 'bert-Bar bert-Bar-one');
	})
});

