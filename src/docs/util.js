import _ from 'lodash';
import { markdown } from 'markdown';

export function toMarkdown(md) {
	if (md) {
		return {
			__html: markdown.toHTML(md),
		};
	}

	return {
		__html: '',
	};
}

export function handleHighlightCode() {
	if (window.hljs) {
		//eslint-disable-line
		_.each(document.querySelectorAll('pre code'), block => {
			hljs.highlightBlock(block); //eslint-disable-line
		});
	}
}

export function sanitizeExamplePath(path) {
	return _.flow(
		x => _.split(x, '/'),
		x => _.compact(x),
		x => _.drop(x),
		x => _.join(x, '-'),
		x => _.split(x, '.'),
		x => _.join(x, '-')
	)(path);
}

export function stripIndent(text) {
	if (!text) {
		return '';
	}

	const sigLines = text.split(/\n/).filter(line => !/^\s*$/.test(line));
	const leadingWhitespaces = sigLines.map(line => /^(\s*)/g.exec(line)[1]);
	const minimumLeadingWhitespace = leadingWhitespaces.reduce(
		(min, line) => (line.length < min.length ? line : min),
		leadingWhitespaces[0]
	);
	return text
		.split(/\n/)
		.map(line => line.replace(minimumLeadingWhitespace, ''))
		.join('\n');
}
