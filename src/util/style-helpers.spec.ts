import assert from 'assert';
import _ from 'lodash';
import { bindClassNames, lucidClassNames, uniqueName } from './style-helpers';

describe('#bindClassNames', function () {
	it('should always return a function', () => {
		assert(_.isFunction(bindClassNames()));
		assert(_.isFunction(bindClassNames('lucid')));
		assert(_.isFunction(bindClassNames('lucid', '~')));
	});

	describe('the returned function `cx`', () => {
		it('should behave like classnames if no args passed', () => {
			const cx = bindClassNames();

			assert.equal(cx({ yolo: true, bar: false }), 'yolo');
			assert.equal(cx({ yolo: true, bar: true }), 'yolo bar');
			assert.equal(cx('one', ['two']), 'one two');
		});

		it('should replace the variable `&` with the value from the 1st arg', () => {
			const cx = bindClassNames('lucid');

			assert.equal(cx({ yolo: true, '&-bar': true }), 'yolo lucid-bar');
			assert.equal(cx({ 'yolo&': true, bar: true }), 'yololucid bar');
			assert.equal(cx('&-one', ['&-two']), 'lucid-one lucid-two');
		});

		it('should replace the variable from the 2nd arg with the value from the 1st arg', () => {
			const cx = bindClassNames('lucid', '~');

			assert.equal(cx({ '&-yolo': true, '~-bar': true }), '&-yolo lucid-bar');
			assert.equal(cx({ 'yolo~': true, bar: true }), 'yololucid bar');
			assert.equal(cx('~-one', ['~-two']), 'lucid-one lucid-two');
		});

		it('should be able to take a RegExp as the 2nd arg to be replaced', () => {
			const cx = bindClassNames('lucid', /~/g);

			assert.equal(cx({ '&-yolo': true, '~-bar': true }), '&-yolo lucid-bar');
			assert.equal(cx({ 'yolo~': true, bar: true }), 'yololucid bar');
			assert.equal(cx('~-one', ['~-two']), 'lucid-one lucid-two');
		});

		describe('.bind', () => {
			it('should always return a function', () => {
				const cx = bindClassNames('lucid');

				assert(_.isFunction(cx.bind()));
				assert(_.isFunction(cx.bind('&-Button')));
				assert(_.isFunction(cx.bind('&-Button', '~')));
			});

			it('should behave like the original function if no args passed', () => {
				const cx = bindClassNames('lucid');
				const boundBoundClassNames = cx.bind();

				assert.equal(cx({ yolo: true, '&-bar': true }), 'yolo lucid-bar');
				assert.equal(
					boundBoundClassNames({ yolo: true, '&-bar': true }),
					'yolo lucid-bar'
				);

				assert.equal(cx({ 'yolo&': true, bar: true }), 'yololucid bar');
				assert.equal(
					boundBoundClassNames({ 'yolo&': true, bar: true }),
					'yololucid bar'
				);

				assert.equal(cx('&-one', ['&-two']), 'lucid-one lucid-two');
				assert.equal(
					boundBoundClassNames('&-one', ['&-two']),
					'lucid-one lucid-two'
				);
			});

			it('should return a `cx` function witch a new value to replace the variable', () => {
				const cx = bindClassNames('lucid');
				const buttonClassNames = cx.bind('&-Button');

				assert.equal(cx({ yolo: true, '&-bar': true }), 'yolo lucid-bar');
				assert.equal(
					buttonClassNames({ yolo: true, '&-bar': true }),
					'yolo lucid-Button-bar'
				);

				assert.equal(cx({ 'yolo&': true, bar: true }), 'yololucid bar');
				assert.equal(
					buttonClassNames({ 'yolo&': true, bar: true }),
					'yololucid-Button bar'
				);

				assert.equal(cx('&-one', ['&-two']), 'lucid-one lucid-two');
				assert.equal(
					buttonClassNames('&-one', ['&-two']),
					'lucid-Button-one lucid-Button-two'
				);
			});
		});
	});
});

describe('#lucidClassNames', function () {
	it('should replace the variable `&` with `lucid`', () => {
		assert.equal(
			lucidClassNames('&-Button', '&-TextField'),
			'lucid-Button lucid-TextField'
		);
	});

	it('should be able to bind a more specific value for the variable `&`', () => {
		const cx = lucidClassNames.bind('&-Button');
		assert.equal(
			cx('&-active', '&-disabled'),
			'lucid-Button-active lucid-Button-disabled'
		);
	});

	it('should return the component base className when bound and passed only `&`', () => {
		const cx = lucidClassNames.bind('&-Button');
		assert.equal(cx('&'), 'lucid-Button');
	});

	it('should pass thru classNames which lack `&` without changing them', () => {
		const cx = lucidClassNames.bind('&-Button');
		const classNames = 'my-custom-class another-class';
		assert.equal(
			cx('&', classNames),
			'lucid-Button my-custom-class another-class'
		);
	});
});

describe('#uniqueName', () => {
	it('should increment by one every time it is called', () => {
		const first = _.parseInt(_.split(uniqueName('foo'), 'foo')[1]);
		const second = _.parseInt(_.split(uniqueName('foo'), 'foo')[1]);
		assert.equal(first + 1, second);
	});

	it(
		'should reuse random prefix. This will safeguard against unfortunate cases where two ' +
			'lucid instances are present.',
		() => {
			const first = _.split(uniqueName('foo'), 'foo')[0];
			const second = _.split(uniqueName('foo'), 'foo')[0];
			assert.equal(first, second);
		}
	);
});
