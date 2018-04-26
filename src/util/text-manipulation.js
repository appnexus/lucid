import _ from 'lodash';
import React from 'react';

export function partitionText(text, pattern, length) {
	let index;

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

export function getCombinedChildText(node) {
	if (!node.children) {
		return '';
	}

	if (_.isString(node.children)) {
		return node.children;
	}

	return React.Children.toArray(node.children)
		.filter(child => !_.isString(child))
		.map(child => getCombinedChildText(child.props))
		.reduce(
			(combinedText, childText) => combinedText + childText,
			_.find(node.children, _.isString) || ''
		);
}

export function propsSearch(text, node) {
	if (!text) {
		return true;
	}

	return new RegExp(_.escapeRegExp(text), 'i').test(getCombinedChildText(node));
}
