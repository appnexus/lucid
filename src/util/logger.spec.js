/*eslint no-console: 0*/
import assert from 'assert';
import _ from 'lodash';
import sinon from 'sinon';
import { isDevMode, isNode, logger, checkIsDev } from './logger';

describe('logger', () => {
	describe('isDevMode', () => {
		it('should be a boolean', () => {
			assert(_.isBoolean(isDevMode), 'value must be a boolean');
		});
	});

	describe('isNode', () => {
		it('should be a boolean', () => {
			assert(_.isBoolean(isNode), 'value must be a boolean');
		});
	});

	describe('checkIsDev', () => {
		it('should return a boolean', () => {
			assert(_.isBoolean(checkIsDev()), 'result must be a boolean');
		});
	});

	describe('logger', () => {
		it('should do stuff', () => {
			assert(_.has(logger, 'log'), 'must have property `log`');
			assert(_.isFunction(logger.log), '`log` must be a function');
			assert(_.has(logger, 'logOnce'), 'must have property `logOnce`');
			assert(_.isFunction(logger.logOnce), '`logOnce` must be a function');
			assert(_.has(logger, 'warn'), 'must have property `warn`');
			assert(_.isFunction(logger.warn), '`warn` must be a function');
			assert(_.has(logger, 'warnOnce'), 'must have property `warnOnce`');
			assert(_.isFunction(logger.warnOnce), '`warnOnce` must be a function');
			assert(_.has(logger, 'error'), 'must have property `error`');
			assert(_.isFunction(logger.error), '`error` must be a function');
			assert(_.has(logger, 'errorOnce'), 'must have property `errorOnce`');
			assert(_.isFunction(logger.errorOnce), '`errorOnce` must be a function');
		});

		describe('log', () => {
			const { log } = logger;

			beforeEach(() => {
				sinon.spy(console, 'log');
			});

			afterEach(() => {
				console.log.restore();
			});

			it('should log a message', () => {
				log('Message Sent.');
				assert.equal(1, console.log.callCount, 'callCount must be `1`');
				assert.equal(
					'Message Sent.',
					console.log.firstCall.args[0],
					'must log the correct message'
				);
			});

			it('should log multiple messages', () => {
				log('First Message.');
				log('Second Message.');
				assert.equal(2, console.log.callCount, 'callCount must be `2`');
				assert.equal(
					'First Message.',
					console.log.firstCall.args[0],
					'must log the correct first message'
				);
				assert.equal(
					'Second Message.',
					console.log.secondCall.args[0],
					'must log the correct first message'
				);
			});
		});

		describe('logOnce', () => {
			const { logOnce, resetOnce } = logger;
			const onceID1 = 'id-111';
			const onceID2 = 'id-222';

			beforeEach(() => {
				sinon.spy(console, 'log');
			});

			afterEach(() => {
				console.log.restore();
				resetOnce(onceID1);
				resetOnce(onceID2);
			});

			it('should log a message', () => {
				logOnce(onceID1, 'Message Sent.');
				assert.equal(1, console.log.callCount, 'callCount must be `1`');
				assert.equal(
					'Message Sent.',
					console.log.firstCall.args[0],
					'must log the correct message'
				);
			});

			it('should log multiple messages with different keys', () => {
				logOnce(onceID1, 'First Message.');
				logOnce(onceID2, 'Second Message.');
				assert.equal(2, console.log.callCount, 'callCount must be `2`');
				assert.equal(
					'First Message.',
					console.log.firstCall.args[0],
					'must log the correct first message'
				);
				assert.equal(
					'Second Message.',
					console.log.secondCall.args[0],
					'must log the correct first message'
				);
			});

			it('should not log multiple messages with the same key', () => {
				logOnce(onceID1, 'First Message.');
				logOnce(onceID1, 'Second Message.');
				assert.equal(1, console.log.callCount, 'callCount must be `1`');
				assert.equal(
					'First Message.',
					console.log.firstCall.args[0],
					'must log the correct first message'
				);
			});
		});

		describe('warn', () => {
			const { warn } = logger;

			beforeEach(() => {
				sinon.spy(console, 'warn');
			});

			afterEach(() => {
				console.warn.restore();
			});

			it('should log a warn message', () => {
				warn('Message Sent.');
				assert.equal(1, console.warn.callCount, 'callCount must be `1`');
				assert.equal(
					'Message Sent.',
					console.warn.firstCall.args[0],
					'must log the correct message'
				);
			});

			it('should log multiple warn messages', () => {
				warn('First Message.');
				warn('Second Message.');
				assert.equal(2, console.warn.callCount, 'callCount must be `2`');
				assert.equal(
					'First Message.',
					console.warn.firstCall.args[0],
					'must log the correct first message'
				);
				assert.equal(
					'Second Message.',
					console.warn.secondCall.args[0],
					'must log the correct first message'
				);
			});
		});

		describe('warnOnce', () => {
			const { warnOnce, resetOnce } = logger;

			const onceID1 = 'id-111';
			const onceID2 = 'id-222';

			beforeEach(() => {
				sinon.spy(console, 'warn');
			});

			afterEach(() => {
				console.warn.restore();
				resetOnce(onceID1);
				resetOnce(onceID2);
			});

			it('should log a message', () => {
				warnOnce(onceID1, 'Message Sent.');
				assert.equal(1, console.warn.callCount, 'callCount must be `1`');
				assert.equal(
					'Message Sent.',
					console.warn.firstCall.args[0],
					'must log the correct warn message'
				);
			});

			it('should log multiple warn messages with different keys', () => {
				warnOnce(onceID1, 'First Message.');
				warnOnce(onceID2, 'Second Message.');
				assert.equal(2, console.warn.callCount, 'callCount must be `2`');
				assert.equal(
					'First Message.',
					console.warn.firstCall.args[0],
					'must log the correct first message'
				);
				assert.equal(
					'Second Message.',
					console.warn.secondCall.args[0],
					'must log the correct first message'
				);
			});

			it('should not log multiple warn messages with the same key', () => {
				warnOnce(onceID1, 'First Message.');
				warnOnce(onceID1, 'Second Message.');
				assert.equal(1, console.warn.callCount, 'callCount must be `1`');
				assert.equal(
					'First Message.',
					console.warn.firstCall.args[0],
					'must log the correct first message'
				);
			});
		});

		describe('error', () => {
			const { error } = logger;

			beforeEach(() => {
				sinon.spy(console, 'error');
			});

			afterEach(() => {
				console.error.restore();
			});

			it('should log an error message', () => {
				error('Message Sent.');
				assert.equal(1, console.error.callCount, 'callCount must be `1`');
				assert.equal(
					'Message Sent.',
					console.error.firstCall.args[0],
					'must log the correct message'
				);
			});

			it('should log multiple error messages', () => {
				error('First Message.');
				error('Second Message.');
				assert.equal(2, console.error.callCount, 'callCount must be `2`');
				assert.equal(
					'First Message.',
					console.error.firstCall.args[0],
					'must log the correct first message'
				);
				assert.equal(
					'Second Message.',
					console.error.secondCall.args[0],
					'must log the correct first message'
				);
			});
		});

		describe('errorOnce', () => {
			const { errorOnce, resetOnce } = logger;

			const onceID1 = 'id-111';
			const onceID2 = 'id-222';

			beforeEach(() => {
				sinon.spy(console, 'error');
			});

			afterEach(() => {
				console.error.restore();
				resetOnce(onceID1);
				resetOnce(onceID2);
			});

			it('should log an error message', () => {
				errorOnce(onceID1, 'Message Sent.');
				assert.equal(1, console.error.callCount, 'callCount must be `1`');
				assert.equal(
					'Message Sent.',
					console.error.firstCall.args[0],
					'must log the correct error message'
				);
			});

			it('should log multiple warn messages with different keys', () => {
				errorOnce(onceID1, 'First Message.');
				errorOnce(onceID2, 'Second Message.');
				assert.equal(2, console.error.callCount, 'callCount must be `2`');
				assert.equal(
					'First Message.',
					console.error.firstCall.args[0],
					'must log the correct first message'
				);
				assert.equal(
					'Second Message.',
					console.error.secondCall.args[0],
					'must log the correct first message'
				);
			});

			it('should not log multiple warn messages with the same key', () => {
				errorOnce(onceID1, 'First Message.');
				errorOnce(onceID1, 'Second Message.');
				assert.equal(1, console.error.callCount, 'callCount must be `1`');
				assert.equal(
					'First Message.',
					console.error.firstCall.args[0],
					'must log the correct first message'
				);
			});
		});

		describe('resetOnce', () => {
			const { logOnce, resetOnce } = logger;
			const onceID1 = 'id-111';

			beforeEach(() => {
				sinon.spy(console, 'log');
			});

			afterEach(() => {
				console.log.restore();
				resetOnce(onceID1);
			});

			it('should not log multiple messages with the same key', () => {
				logOnce(onceID1, 'First Message.');
				logOnce(onceID1, 'Second Message.');
				assert.equal(1, console.log.callCount, 'callCount must be `1`');
				assert.equal(
					'First Message.',
					console.log.firstCall.args[0],
					'must log the correct first message'
				);
			});

			it('should allow logging multiple messages with the same key if resetOnce is called', () => {
				logOnce(onceID1, 'First Message.');
				resetOnce(onceID1);
				logOnce(onceID1, 'Second Message.');
				assert.equal(2, console.log.callCount, 'callCount must be `2`');
				assert.equal(
					'First Message.',
					console.log.firstCall.args[0],
					'must log the correct first message'
				);
				assert.equal(
					'Second Message.',
					console.log.secondCall.args[0],
					'must log the correct first message'
				);
			});
		});
	});
});
