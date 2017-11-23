/*eslint no-console: 0*/
import _ from 'lodash';
import { isDevMode, isNode, logger, checkIsDev } from './logger';

describe('logger', () => {
	describe('isDevMode', () => {
		it('should be a boolean', () => {
			expect(_.isBoolean(isDevMode));
		});
	});

	describe('isNode', () => {
		it('should be a boolean', () => {
			expect(_.isBoolean(isNode));
		});
	});

	describe('checkIsDev', () => {
		it('should return a boolean', () => {
			expect(_.isBoolean(checkIsDev()));
		});
	});

	describe('logger', () => {
		/* eslint-disable no-console */
		let error, log, warn;

		beforeAll(() => {
			console.error = jest.fn();
			console.log = jest.fn();
			console.warn = jest.fn();
			error = console.error;
			log = console.log;
			warn = console.warn;
		});

		beforeEach(() => {
			console.error.mockReset();
			console.log.mockReset();
			console.warn.mockReset();
		});

		afterAll(() => {
			console.error = error;
			console.log = log;
			console.warn = warn;
		});

		it('should do stuff', () => {
			expect(_.has(logger, 'log'));
			expect(_.isFunction(logger.log));
			expect(_.has(logger, 'logOnce'));
			expect(_.isFunction(logger.logOnce));
			expect(_.has(logger, 'warn'));
			expect(_.isFunction(logger.warn));
			expect(_.has(logger, 'warnOnce'));
			expect(_.isFunction(logger.warnOnce));
			expect(_.has(logger, 'error'));
			expect(_.isFunction(logger.error));
			expect(_.has(logger, 'errorOnce'));
			expect(_.isFunction(logger.errorOnce));
		});

		describe('log', () => {
			const { log } = logger;

			it('should log a message', () => {
				log('Message Sent.');
				expect(console.log).toHaveBeenCalledTimes(1);
				expect(console.log).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple messages', () => {
				log('First Message.');
				log('Second Message.');
				expect(console.log).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = console.log.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});
		});

		describe('logOnce', () => {
			const { logOnce, resetOnce } = logger;
			const onceID1 = 'id-111';
			const onceID2 = 'id-222';

			afterEach(() => {
				resetOnce(onceID1);
				resetOnce(onceID2);
			});

			it('should log a message', () => {
				logOnce(onceID1, 'Message Sent.');
				expect(console.log).toHaveBeenCalledTimes(1);
				expect(console.log).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple messages with different keys', () => {
				logOnce(onceID1, 'First Message.');
				logOnce(onceID2, 'Second Message.');
				expect(console.log).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = console.log.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});

			it('should not log multiple messages with the same key', () => {
				logOnce(onceID1, 'First Message.');
				logOnce(onceID1, 'Second Message.');
				expect(console.log).toHaveBeenCalledTimes(1);
				expect(console.log).toHaveBeenCalledWith('First Message.');
			});
		});

		describe('warn', () => {
			const { warn } = logger;

			it('should log a warn message', () => {
				warn('Message Sent.');
				expect(console.warn).toHaveBeenCalledTimes(1);
				expect(console.warn).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple warn messages', () => {
				warn('First Message.');
				warn('Second Message.');
				expect(console.warn).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = console.warn.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});
		});

		describe('warnOnce', () => {
			const { warnOnce, resetOnce } = logger;

			const onceID1 = 'id-111';
			const onceID2 = 'id-222';

			afterEach(() => {
				resetOnce(onceID1);
				resetOnce(onceID2);
			});

			it('should log a message', () => {
				warnOnce(onceID1, 'Message Sent.');
				expect(console.warn).toHaveBeenCalledTimes(1);
				expect(console.warn).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple warn messages with different keys', () => {
				warnOnce(onceID1, 'First Message.');
				warnOnce(onceID2, 'Second Message.');
				expect(console.warn).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = console.warn.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});

			it('should not log multiple warn messages with the same key', () => {
				warnOnce(onceID1, 'First Message.');
				warnOnce(onceID1, 'Second Message.');
				expect(console.warn).toHaveBeenCalledTimes(1);
				expect(console.warn).toHaveBeenCalledWith('First Message.');
			});
		});

		describe('error', () => {
			const { error } = logger;

			it('should log an error message', () => {
				error('Message Sent.');
				expect(console.error).toHaveBeenCalledTimes(1);
				expect(console.error).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple error messages', () => {
				error('First Message.');
				error('Second Message.');
				const [firstCall, secondCall] = console.error.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});
		});

		describe('errorOnce', () => {
			const { errorOnce, resetOnce } = logger;

			const onceID1 = 'id-111';
			const onceID2 = 'id-222';

			afterEach(() => {
				resetOnce(onceID1);
				resetOnce(onceID2);
			});

			it('should log an error message', () => {
				errorOnce(onceID1, 'Message Sent.');
				expect(console.error).toHaveBeenCalledTimes(1);
				expect(console.error).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple warn messages with different keys', () => {
				errorOnce(onceID1, 'First Message.');
				errorOnce(onceID2, 'Second Message.');
				const [firstCall, secondCall] = console.error.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});

			it('should not log multiple warn messages with the same key', () => {
				errorOnce(onceID1, 'First Message.');
				errorOnce(onceID1, 'Second Message.');
				expect(console.error).toHaveBeenCalledTimes(1);
				expect(console.error).toHaveBeenCalledWith('First Message.');
			});
		});

		describe('resetOnce', () => {
			const { logOnce, resetOnce } = logger;
			const onceID1 = 'id-111';

			afterEach(() => {
				resetOnce(onceID1);
			});

			it('should not log multiple messages with the same key', () => {
				logOnce(onceID1, 'First Message.');
				logOnce(onceID1, 'Second Message.');
				expect(console.log).toHaveBeenCalledTimes(1);
				expect(console.log).toHaveBeenCalledWith('First Message.');
			});

			it('should allow logging multiple messages with the same key if resetOnce is called', () => {
				logOnce(onceID1, 'First Message.');
				resetOnce(onceID1);
				logOnce(onceID1, 'Second Message.');
				expect(console.log).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = console.log.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});
		});
	});
});
