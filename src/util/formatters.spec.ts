/* eslint-disable comma-spacing */

import _ from 'lodash';
import assert from 'assert';
import { formatAbbreviatedNumber, formatThousands } from './formatters';

describe('formatters', () => {
	describe('formatAbbreviatedNumber', () => {
		const tests: Array<[string, number, string]> = [
			['negative tens', -10, '-10'],
			['tens', 10, '10'],
			['hundreds', 100, '100'],
			['thousands', 1000, '1.0k'],
			['ten thousands', 10000, '10k'],
			['hundred thousands', 100000, '100k'],
			['millions', 1000000, '1.0M'],
			['uneven millions', 1390000, '1.4M'],
			['ten millions', 10000000, '10M'],
			['hundred millions', 100000000, '100M'],
			['billions', 1000000000, '1.0B'],
			['ten billions', 10000000000, '10B'],
			['hundred billions', 100000000000, '100B'],
			['trillions', 1000000000000, '1.0T'],
			['ten trillions', 10000000000000, '10T'],
			['hundred trillions', 100000000000000, '100T'],
		];

		_.each(tests, ([name, value, expected]) => {
			it(`should abbreviate in the ${name}`, () => {
				assert.equal(formatAbbreviatedNumber(value), expected);
			});
		});
	});

	describe('formatNumberNoDecimal', () => {
		const tests: Array<[string, number, string]> = [
			['negative tens', -10, '-10'],
			['tens', 10, '10'],
			['hundreds', 100, '100'],
			['thousands', 1000, '1,000'],
			['decimal thousands', 1000.126, '1,000'],
			['ten thousands', 10000, '10,000'],
			['hundred thousands', 100000, '100,000'],
			['millions', 1000000, '1,000,000'],
			['ten millions', 10000000, '10,000,000'],
			['hundred millions', 100000000, '100,000,000'],
			['billions', 1000000000, '1,000,000,000'],
			['ten billions', 10000000000, '10,000,000,000'],
			['hundred billions', 100000000000, '100,000,000,000'],
			['trillions', 1000000000000, '1,000,000,000,000'],
			['decimal trillions', 1000000000000.855, '1,000,000,000,001'],
			['ten trillions', 10000000000000, '10,000,000,000,000'],
			['hundred trillions', 100000000000000, '100,000,000,000,000'],
		];

		_.each(tests, ([name, value, expected]) => {
			it(`should abbreviate in the ${name}`, () => {
				assert.equal(formatThousands(value), expected);
			});
		});
	});
});
