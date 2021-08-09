import _ from 'lodash';
import * as d3TimeFormat from 'd3-time-format';
import * as d3Time from 'd3-time';

export type Collection = Array<{ [key: string]: any }>;
type Fields = string[] | string;

/**
 * stackByFields
 *
 * D3's `stack` groups each series' data together but we sometimes we want the
 * stacked groups to remain grouped as in the original normalized data. This
 * function helps achieve that.
 *
 * @param {object[]} collection - normalized data you want to operate on
 * @param {string[]} fields - fields to pluck off for the y data
 * @return {array[]} - array of arrays, one for row in the original `collection`
 */
export function stackByFields(
	collection: Collection,
	fields: Fields
): Array<Array<[number, number]>> {
	const fieldsArray = _.castArray(fields);

	return _.map(collection, (d) => {
		return _.reduce<Fields, Array<[number, number]>>(
			fieldsArray,
			(acc, field) => {
				const dataPoint: number = _.get(d, field, 0);

				if (_.isEmpty(acc)) {
					return acc.concat([[0, dataPoint]]);
				}

				const maybeLast = _.last(_.last(acc));
				const last = maybeLast === undefined ? 0 : maybeLast;

				return acc.concat([[last, last + dataPoint]]);
			},
			[]
		);
	});
}

/**
 * extractFields
 *
 * This will return the data in a similar format to stackByFields but without
 * the stacking.
 *
 * @param {object[]} collection - normalized data you want to operate on
 * @param {string[]} fields - fields to pluck off for the y data
 * @return {array[]} - array of arrays, one for each field
 */
export function extractFields(
	collection: Collection,
	fields: Fields,
	minDomainValue: number = 0
): Array<Array<[number, number]>> {
	const fieldsArray = _.castArray(fields);

	return _.map(collection, (d) => {
		return _.map(fieldsArray, (field) => [minDomainValue, _.get(d, field, 0)]);
	});
}

/**
 * groupByFields
 *
 * This will return the data in a similar format to d3Shape.stack
 * but without the stacking of the data.
 *
 * @param {object[]} collection - normalized data you want to operate on
 * @param {string[]} fields - fields to pluck off for the y data
 * @return {array[]} - array of arrays, one for each field
 */
export function groupByFields(collection: Collection, fields: Fields) {
	const fieldsArray = _.castArray(fields);

	return _.map(fieldsArray, (field) => {
		return _.map(collection, field);
	});
}

/**
 * byFields
 *
 * Takes a collection of data and returns an array of all the fields off that
 * collection.
 *
 * @param {object[]} collection
 * @param {string[]} fields
 * @return {array}
 */
export function byFields(collection: Collection, fields: Fields) {
	const fieldArray = _.castArray(fields);

	return _.reduce(
		fieldArray,
		(acc: object[], field) => {
			return acc.concat(_.map(collection, field));
		},
		[]
	);
}

/**
 * nearest
 *
 * Divide and conquer algorithm that helps find the nearest element to `value`
 * in `nums`
 *
 * @param {number[]} nums - sorted array of numbers to search through
 * @param {number} value - value you're trying to locate the nearest array element for
 * @return {number} - the nearest array element to the value
 */
export function nearest(nums: number[], value: number): number | undefined {
	if (nums.length < 2) {
		return _.first(nums);
	}

	if (nums.length === 2) {
		return value > (nums[0] + nums[1]) / 2 ? nums[1] : nums[0];
	}

	const mid = nums.length >>> 1;

	return nums[mid] > value
		? nearest(nums.slice(0, mid + 1), value)
		: nearest(nums.slice(mid), value);
}

/**
 * minByFields
 *
 * Returns the minimum element from a collection by a set of fields.
 *
 * @param {object[]} collection
 * @param {string[]} fields
 * @return {any}
 */
export function minByFields(collection: Collection, fields: Fields) {
	return _.min(byFields(collection, fields));
}

/**
 * maxByFields
 *
 * Returns the maximum element from a collection by a set of fields.
 *
 * @param {object[]} collection
 * @param {string[]} fields
 * @return {any}
 */
export function maxByFields(collection: Collection, fields: Fields) {
	return _.max(byFields(collection, fields));
}

/**
 * maxByFieldsStacked
 *
 * Returns the max sum of a set of fields from a collection
 *
 * @param {object[]} collection
 * @param {string[]} fields
 * @return {any}
 */
export function maxByFieldsStacked(collection: Collection, fields: Fields) {
	const fieldArray = _.castArray(fields);

	const sums = _.reduce(
		collection,
		(acc: number[], item) => {
			return acc.concat(_.sum(_.toArray(_.pick(item, fieldArray))));
		},
		[]
	);

	return _.max(sums);
}

/**
 * discreteTicks
 *
 * Returns `count` evenly spaced, representative values from the `array`.
 *
 * @param {array} array
 * @param {number} size - should be greater than 1
 * @return {array}
 */
export function discreteTicks<T>(
	array: T[],
	count: number | undefined | null = null
) {
	if (!array || _.isNil(count) || array.length <= count) {
		return array;
	}

	const step = (array.length - 1) / Math.max(1, count - 1);

	return _.reduce(
		_.times(count),
		(acc: T[], n) => {
			return acc.concat(array[Math.round(n * step)]);
		},
		[]
	);
}

/**
 * transformFromCenter
 *
 * Scaling paths from their center is tricky. This function
 * helps do that be generating a translate/scale transform
 * string with the correct numbers.
 *
 * @param {number} x - the x data point where you want the path to be centered at
 * @param {number} y - the y data point where you want the path to be centered at
 * @param {number} xCenter - the x coordinate of the center of the path you're trying to transform
 * @param {number} yCenter - the x coordinate of the center of the path you're trying to transform
 * @param {number} scale - number to scale to, 2 would be 2x bigger
 * @return {string} - transform string
 */
export function transformFromCenter(
	x: number,
	y: number,
	xCenter: number,
	yCenter: number,
	scale: number
) {
	return `translate(${(1 - scale) * xCenter + (x - xCenter)}, ${
		(1 - scale) * yCenter + (y - yCenter)
	}) scale(${scale})`;
}

const FORMAT_MILLISECOND = d3TimeFormat.timeFormat('.%L');
const FORMAT_SECOND = d3TimeFormat.timeFormat(':%S');
const FORMAT_MINUTE = d3TimeFormat.timeFormat('%I:%M');
const FORMAT_HOUR = d3TimeFormat.timeFormat('%I %p');
const FORMAT_DAY = d3TimeFormat.timeFormat('%a %d');
const FORMAT_WEEK = d3TimeFormat.timeFormat('%b %d');
const FORMAT_MONTH = d3TimeFormat.timeFormat('%b');
const FORMAT_YEAR = d3TimeFormat.timeFormat('%Y');

/**
 * formatDate
 *
 * This function was written to be used for tick formatting with d3 time
 * scales.
 *
 * @param {date} date - input date
 * @return {string} - formatted date
 */
export function formatDate(date: Date): string {
	return (
		d3Time.timeSecond(date) < date
			? FORMAT_MILLISECOND
			: d3Time.timeMinute(date) < date
			? FORMAT_SECOND
			: d3Time.timeHour(date) < date
			? FORMAT_MINUTE
			: d3Time.timeDay(date) < date
			? FORMAT_HOUR
			: d3Time.timeMonth(date) < date
			? d3Time.timeWeek(date) < date
				? FORMAT_DAY
				: FORMAT_WEEK
			: d3Time.timeYear(date) < date
			? FORMAT_MONTH
			: FORMAT_YEAR
	)(date);
}
