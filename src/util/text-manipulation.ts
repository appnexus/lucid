import _ from 'lodash';
import React from 'react';

/**
 * Performs a regex search and returns a partitioning around the matching substring: [pre, match, post]
 *
 * @param text: string to search
 * @param pattern: RegExp patten
 * @param length (optional): provide a max length for the matching substring
 *
 * @return string[]
 */
export function partitionText(
	text: string,
	pattern: RegExp,
	length?: number
): string[] {
	let index: number;

	if (length) {
		index = text.search(pattern);
	} else {
		const result = pattern.exec(text);
		if (result) {
			length = result[0].length;
			index = result.index;
		} else {
			length = 0;
			index = -1;
		}
	}

	if (index === -1) {
		return ['', '', text];
	} else if (index === 0) {
		return ['', text.substr(0, length), text.substring(length)];
	} else {
		return [
			text.substring(0, index),
			text.substr(index, length),
			text.substring(index + length),
		];
	}
}

/**
 * Returns the combined text of all descendant strings
 *
 * @param node: a component props object
 *
 * @return string
 */
export function getCombinedChildText(node): string {
	if (!node || !node.children) {
		return '';
	}

	if (_.isString(node.children)) {
		return node.children;
	}

	return React.Children.toArray(node.children)
		.filter((child): child is React.ReactElement => _.has(child, 'props')) // filter out primitive types
		.map((child) => getCombinedChildText(child.props))
		.reduce(
			(combinedText, childText) => combinedText + childText,
			_.find(React.Children.toArray(node.children), _.isString) || ''
		);
}

/**
 * Perform a regex search on all text found in a component's descendants
 *
 * @param text
 * @param node
 *
 * @return boolean
 */
export function propsSearch(text: string | null = null, node = null) {
	if (!text) {
		return true;
	}

	return new RegExp(_.escapeRegExp(text), 'i').test(getCombinedChildText(node));
}
