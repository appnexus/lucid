export function partitionText(text, pattern, length) {
	const index = text.search(pattern);

	if (index === -1) {
		return ['', '', text];
	} else if (index === 0) {
		return ['', text.substr(0, length), text.substring(length)];
	} else {
		return [text.substring(0, index), text.substr(index, length), text.substring(index + length)];
	}
}
