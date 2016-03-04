import assert from 'assert';
import _ from 'lodash';
import { bindClassNames, lucidClassNames } from './style-helpers';

describe('#bindClassNames', function() {
	it('should always return a function', () => {
		assert(_.isFunction(bindClassNames()));
		assert(_.isFunction(bindClassNames('lucid')));
		assert(_.isFunction(bindClassNames('lucid', '~')));
	});

	describe('the returned function `boundClassNames`', () => {
		it('should behave like classnames if no args passed', () => {
			const boundClassNames = bindClassNames();

			assert.equal(boundClassNames({yolo: true, bar: false}), 'yolo');
			assert.equal(boundClassNames({yolo: true, bar: true}), 'yolo bar');
			assert.equal(boundClassNames('one', ['two']), 'one two');
		});

		it('should replace the variable `&` with the value from the 1st arg', () => {
			const boundClassNames = bindClassNames('lucid');

			assert.equal(boundClassNames({'yolo': true, '&-bar': true}), 'yolo lucid-bar');
			assert.equal(boundClassNames({'yolo&': true, 'bar': true}), 'yololucid bar');
			assert.equal(boundClassNames('&-one', ['&-two']), 'lucid-one lucid-two');
		});

		it('should replace the variable from the 2nd arg with the value from the 1st arg', () => {
			const boundClassNames = bindClassNames('lucid', '~');

			assert.equal(boundClassNames({'&-yolo': true, '~-bar': true}), '&-yolo lucid-bar');
			assert.equal(boundClassNames({'yolo~': true, 'bar': true}), 'yololucid bar');
			assert.equal(boundClassNames('~-one', ['~-two']), 'lucid-one lucid-two');
		});

		describe('.bind', () => {
			it('should always return a function', () => {
				const boundClassNames = bindClassNames('lucid');

				assert(_.isFunction(boundClassNames.bind()));
				assert(_.isFunction(boundClassNames.bind('&-Button')));
				assert(_.isFunction(boundClassNames.bind('&-Button', '~')));
			});

			it('should behave like the original function if no args passed', () => {
				const boundClassNames = bindClassNames('lucid');
				const boundBoundClassNames = boundClassNames.bind();

				assert.equal(boundClassNames({'yolo': true, '&-bar': true}), 'yolo lucid-bar');
				assert.equal(boundBoundClassNames({'yolo': true, '&-bar': true}), 'yolo lucid-bar');

				assert.equal(boundClassNames({'yolo&': true, 'bar': true}), 'yololucid bar');
				assert.equal(boundBoundClassNames({'yolo&': true, 'bar': true}), 'yololucid bar');

				assert.equal(boundClassNames('&-one', ['&-two']), 'lucid-one lucid-two');
				assert.equal(boundBoundClassNames('&-one', ['&-two']), 'lucid-one lucid-two');
			});

			it('should return a `boundClassNames` function witch a new value to replace the variable', () => {
				const boundClassNames = bindClassNames('lucid');
				const buttonClassNames = boundClassNames.bind('&-Button');

				assert.equal(boundClassNames({'yolo': true, '&-bar': true}), 'yolo lucid-bar');
				assert.equal(buttonClassNames({'yolo': true, '&-bar': true}), 'yolo lucid-Button-bar');

				assert.equal(boundClassNames({'yolo&': true, 'bar': true}), 'yololucid bar');
				assert.equal(buttonClassNames({'yolo&': true, 'bar': true}), 'yololucid-Button bar');

				assert.equal(boundClassNames('&-one', ['&-two']), 'lucid-one lucid-two');
				assert.equal(buttonClassNames('&-one', ['&-two']), 'lucid-Button-one lucid-Button-two');
			});
		});
	});
});

describe('#lucidClassNames', function() {
	it('should replace the variable `&` with `lucid`', () => {
		assert.equal(lucidClassNames('&-Button', '&-TextField'), 'lucid-Button lucid-TextField');
	});

	it('should be able to bind a more specific value for the variable `&`', () => {
		const boundClassNames = lucidClassNames.bind('&-Button');
		assert.equal(boundClassNames('&-active', '&-disabled'), 'lucid-Button-active lucid-Button-disabled');
	});

	it('should return the component base className when bound and passed only `&`', () => {
		const boundClassNames = lucidClassNames.bind('&-Button');
		assert.equal(boundClassNames('&'), 'lucid-Button');
	});

	it('should pass thru classNames which lack `&` without changing them', () => {
		const boundClassNames = lucidClassNames.bind('&-Button');
		const classNames = 'my-custom-class another-class';
		assert.equal(boundClassNames('&', classNames), 'lucid-Button my-custom-class another-class');
	});
});
