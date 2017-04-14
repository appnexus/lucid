import _ from 'lodash';
import { markdown } from 'markdown';

export function toMarkdown(md) {
	return {
		__html: markdown.toHTML(md),
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
