export function onResize(state={}, { top, left, minWidth, minHeight }) {
	return {
		top,
		left,
		minWidth,
		minHeight,
		...state
	};
}
