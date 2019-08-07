export function onDragStart(state = {}, dragIndex) {
	return {
		...state,
		dragIndex,
	};
}
export function onDragEnd(state = {}) {
	return {
		...state,
		dragIndex: undefined,
		dragOverIndex: undefined,
	};
}
export function onDragOver(state = {}, dragOverIndex) {
	return {
		...state,
		dragOverIndex,
	};
}
