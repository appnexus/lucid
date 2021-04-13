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
		let originalError: any;
		let originalLog: any;
		let originalWarn: any;
		let mockError: jest.Mock;
		let mockLog: jest.Mock;
		let mockWarn: jest.Mock;

		beforeAll(() => {
			mockError = jest.fn();
			mockLog = jest.fn();
			mockWarn = jest.fn();
			console.error = mockError;
			console.log = mockLog;
			console.warn = mockWarn;
			originalError = console.error;
			originalLog = console.log;
			originalWarn = console.warn;
		});

		beforeEach(() => {
			mockError.mockReset();
			mockLog.mockReset();
			mockWarn.mockReset();
		});

		afterAll(() => {
			console.error = originalError;
			console.log = originalLog;
			console.warn = originalWarn;
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
				expect(mockLog).toHaveBeenCalledTimes(1);
				expect(mockLog).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple messages', () => {
				log('First Message.');
				log('Second Message.');
				expect(mockLog).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = mockLog.mock.calls;
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
				expect(mockLog).toHaveBeenCalledTimes(1);
				expect(mockLog).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple messages with different keys', () => {
				logOnce(onceID1, 'First Message.');
				logOnce(onceID2, 'Second Message.');
				expect(mockLog).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = mockLog.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});

			it('should not log multiple messages with the same key', () => {
				logOnce(onceID1, 'First Message.');
				logOnce(onceID1, 'Second Message.');
				expect(mockLog).toHaveBeenCalledTimes(1);
				expect(mockLog).toHaveBeenCalledWith('First Message.');
			});
		});

		describe('warn', () => {
			const { warn } = logger;

			it('should log a warn message', () => {
				warn('Message Sent.');
				expect(mockWarn).toHaveBeenCalledTimes(1);
				expect(mockWarn).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple warn messages', () => {
				warn('First Message.');
				warn('Second Message.');
				expect(mockWarn).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = mockWarn.mock.calls;
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
				expect(mockWarn).toHaveBeenCalledTimes(1);
				expect(mockWarn).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple warn messages with different keys', () => {
				warnOnce(onceID1, 'First Message.');
				warnOnce(onceID2, 'Second Message.');
				expect(mockWarn).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = mockWarn.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});

			it('should not log multiple warn messages with the same key', () => {
				warnOnce(onceID1, 'First Message.');
				warnOnce(onceID1, 'Second Message.');
				expect(mockWarn).toHaveBeenCalledTimes(1);
				expect(mockWarn).toHaveBeenCalledWith('First Message.');
			});
		});

		describe('error', () => {
			const { error } = logger;

			it('should log an error message', () => {
				error('Message Sent.');
				expect(mockError).toHaveBeenCalledTimes(1);
				expect(mockError).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple error messages', () => {
				error('First Message.');
				error('Second Message.');
				const [firstCall, secondCall] = mockError.mock.calls;
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
				expect(mockError).toHaveBeenCalledTimes(1);
				expect(mockError).toHaveBeenCalledWith('Message Sent.');
			});

			it('should log multiple warn messages with different keys', () => {
				errorOnce(onceID1, 'First Message.');
				errorOnce(onceID2, 'Second Message.');
				const [firstCall, secondCall] = mockError.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});

			it('should not log multiple warn messages with the same key', () => {
				errorOnce(onceID1, 'First Message.');
				errorOnce(onceID1, 'Second Message.');
				expect(mockError).toHaveBeenCalledTimes(1);
				expect(mockError).toHaveBeenCalledWith('First Message.');
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
				expect(mockLog).toHaveBeenCalledTimes(1);
				expect(mockLog).toHaveBeenCalledWith('First Message.');
			});

			it('should allow logging multiple messages with the same key if resetOnce is called', () => {
				logOnce(onceID1, 'First Message.');
				resetOnce(onceID1);
				logOnce(onceID1, 'Second Message.');
				expect(mockLog).toHaveBeenCalledTimes(2);
				const [firstCall, secondCall] = mockLog.mock.calls;
				expect(firstCall[0]).toEqual('First Message.');
				expect(secondCall[0]).toEqual('Second Message.');
			});
		});
	});
});
