import _ from 'lodash';
import { markdown } from 'markdown';

export function toMarkdown(md) {
	return {
		__html: markdown.toHTML(md),
	};
}

export function handleHighlightCode() {
	if (window.hljs) { //eslint-disable-line
		_.each(document.querySelectorAll('pre code'), (block) => {
			hljs.highlightBlock(block); //eslint-disable-line
		});
	}
}
