import _ from 'lodash';
import assert from 'assert';
import {
	byFields,
	minByFields,
	maxByFields,
	maxByFieldsStacked,
	discreteTicks,
} from './chart-helpers';

describe('chart-helpers', () => {
	describe('#maxByFieldsStacked', () => {
		it('should return the max for a collection', () => {
			const data = [
				{a: 'one', b: 1, c: 3, d: 5},
				{a: 'two', b: 3, c: 4, d: 7},
				{a: 'two', b: 10, c: 10, d: 10},
			];

			assert.equal(maxByFieldsStacked(data, ['b', 'c', 'd']), 30);
		});
	});

	describe('#discreteTicks', () => {
		it('should work on a myriad of ranges', () => {
			assert.deepEqual(discreteTicks(_.times(100), 1), [0]);
			assert.deepEqual(discreteTicks(_.times(100), 2), [0, 99]);
			assert.deepEqual(discreteTicks(_.times(100), 3), [0, 50, 99]);
			assert.deepEqual(discreteTicks(_.times(100), 4), [0, 33, 66, 99]);
		});

		it('should return the plain array if count is too big', () => {
			assert.deepEqual(discreteTicks([1, 2, 3], 3), [1, 2, 3]);
			assert.deepEqual(discreteTicks([1, 2, 3], 4), [1, 2, 3]);
		});

		it('should handle empty arrays', () => {
			assert.deepEqual(discreteTicks([], 100), []);
		});
	});

	describe('#byFields', () => {
		it('should work with a single field', () => {
			const data = [
				{ rev: 1 },
				{ rev: 2 },
				{ rev: 'foo', extra: 2 },
			];

			assert.deepEqual(byFields(data, 'rev'), [1, 2, 'foo'], 'got the wrong value back byFields');
		});

		it('should work with a single field in an array', () => {
			const data = [
				{ rev: 1 },
				{ rev: 2 },
				{ rev: 'foo', extra: 2 },
			];

			assert.deepEqual(byFields(data, ['rev']), [1, 2, 'foo'], 'got the wrong value back byFields');
		});

		it('should work with multiple fields', () => {
			const data = [
				{ rev: 1, imps: 100},
				{ rev: 2, imps: 200},
				{ rev: 'foo', extra: 2, imps: 300 },
			];

			assert.deepEqual(
				byFields(data, ['rev', 'imps']),
				[1, 2, 'foo', 100, 200, 300],
				'got the wrong value back byFields'
			);
		});
	});

	describe('#minByFields', () => {
		it('should take a single field and return the minimum', () => {
			const data = [
				{ a: 1 },
				{ a: 3 },
				{ a: 10 },
				{ a: 3 },
				{ a: 2 },
				{ a: 1 },
			];

			assert.equal(minByFields(data, 'a'), 1, 'did not get the correct min back');
		});

		it('should take an array of fields and return the minimum', () => {
			const data = [
				{ a: 1, b: 10 },
				{ a: 3 },
				{ a: 10, b: 0 },
				{ a: 3, b: 1 },
				{ a: 2, b: 0 },
				{ a: 1, b: 10 },
			];

			assert.equal(minByFields(data, ['a', 'b']), 0, 'did not get the correct min back');
		});
	});

	describe('#maxByFields', () => {
		it('should take a single field and return the maximum', () => {
			const data = [
				{ foo: 1 },
				{ foo: 3 },
				{ foo: 10 },
				{ foo: 3 },
				{ foo: 2000 },
				{ foo: 1 },
			];

			assert.equal(maxByFields(data, 'foo'), 2000, 'did not get the correct max back');
		});

		it('should take a single field in an array and return the maximum', () => {
			const data = [
				{ foo: 1 },
				{ foo: 3 },
				{ foo: 10 },
				{ foo: 3 },
				{ foo: 3000 },
				{ foo: 1 },
			];

			assert.equal(maxByFields(data, ['foo']), 3000, 'did not get the correct max back');
		});

		it('should take an array of fields and return the maximum', () => {
			const data = [
				{ a: 1, b: 10 },
				{ a: 3, b: 20 },
				{ a: 10, b: 0 },
				{ a: 3, b: 1 },
				{ a: 2, b: 0 },
				{ a: 1},
			];

			assert.equal(maxByFields(data, ['a', 'b']), 20, 'did not get the correct max back');
		});
	});
});

