import _ from 'lodash';

export function partitionText(text, pattern, length) {
	const index = text.search(pattern);

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

	return node.children
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
